<template>
    <div class="h100%">
        <router-view v-slot="{ Component }">
            <transition :name="setTransitionName" mode="out-in">
                <keep-alive :include="getKeepAliveNames">
                    <component :is="Component" :key="state.refreshRouterViewKey" />
                </keep-alive>
            </transition>
        </router-view>
    </div>
</template>

<script lang="ts" setup>
import { computed, nextTick, onBeforeMount, onMounted, reactive, watch } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useEventBus } from '@vueuse/core'
import { useKeepALiveNames } from '@/stores/keepAliveNames'
import { useThemeConfig } from '@/stores/themeConfig'
import { Session } from '@/utils/storage'

// 定义接口来定义对象的类型
interface ParentViewState {
    refreshRouterViewKey: null | string
    keepAliveNameList: string[]
}

const reloadTagBus = useEventBus<string>('onTagsViewRefreshRouterView')

const route = useRoute()
const storesKeepAliveNames = useKeepALiveNames()
const storesThemeConfig = useThemeConfig()
const { keepAliveNames, cachedViews } = storeToRefs(storesKeepAliveNames)
const { themeConfig } = storeToRefs(storesThemeConfig)
const state = reactive<ParentViewState>({
    refreshRouterViewKey: null,
    keepAliveNameList: [],
})
// 设置主界面切换动画
const setTransitionName = computed(() => {
    return themeConfig.value.animation
})
// 获取组件缓存列表(name值)
const getKeepAliveNames = computed(() => {
    return themeConfig.value.isTagsView ? cachedViews.value : state.keepAliveNameList
})

// 页面加载前，处理缓存，页面刷新时路由缓存处理
onBeforeMount(() => {
    state.keepAliveNameList = keepAliveNames.value
    reloadTagBus.on((fullPath) => {
        state.keepAliveNameList = keepAliveNames.value.filter((name: string) => route.name !== name)
        state.refreshRouterViewKey = null
        nextTick(() => {
            state.refreshRouterViewKey = fullPath
            state.keepAliveNameList = keepAliveNames.value
        })
    })
})
// 页面加载时
onMounted(() => {
    // https://gitee.com/lyt-top/vue-next-admin/issues/I58U75
    // https://gitee.com/lyt-top/vue-next-admin/issues/I59RXK
    nextTick(() => {
        setTimeout(() => {
            if (themeConfig.value.isCacheTagsView) {
                const tagsViewArr: any[] = Session.get('tagsViewList') || []
                cachedViews.value = tagsViewArr.filter(item => item.meta.isKeepAlive).map(item => item.name)
            }
        }, 0)
    })
})

// 监听路由变化，防止 tagsView 多标签时，切换动画消失
watch(
    () => route.fullPath,
    () => {
        state.refreshRouterViewKey = decodeURI(route.fullPath)
    },
    {
        immediate: true,
    },
)
</script>
