<template>
    <div class="el-menu-horizontal-warp">
        <ElScrollbar ref="elMenuHorizontalScrollRef" @wheel.passive.prevent="onElMenuHorizontalScroll">
            <el-menu router :default-active="state.defaultActive" :ellipsis="false" background-color="transparent"
                mode="horizontal">
                <template v-for="val in menuLists">
                    <el-sub-menu v-if="val.children && val.children.length > 0" :key="val.path" :index="val.path">
                        <template #title>
                            <SvgIcon :name="val.meta.icon" />
                            <span>{{ val.meta.title }}</span>
                        </template>
                        <SubItem :child="val.children" />
                    </el-sub-menu>
                    <template v-else>
                        <el-menu-item :key="val.path" :index="val.path">
                            <template v-if="!val.meta.isLink || (val.meta.isLink && val.meta.isIframe)" #title>
                                <SvgIcon :name="val.meta.icon" />
                                {{ val.meta.title }}
                            </template>
                            <template v-else #title>
                                <a :href="val.meta.isLink" target="_blank" rel="opener" class="w100%">
                                    <SvgIcon :name="val.meta.icon" />
                                    {{ val.meta.title }}
                                </a>
                            </template>
                        </el-menu-item>
                    </template>
                </template>
            </el-menu>
        </ElScrollbar>
    </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import { computed, nextTick, onBeforeMount, onMounted, reactive, ref } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useEventBus } from '@vueuse/core'
import { ElScrollbar } from 'element-plus'
import { useRoutesList } from '@/stores/routesList'
import { useThemeConfig } from '@/stores/themeConfig'
import SubItem from '@/layout/navMenu/subItem.vue'

const props = defineProps({
    menuList: {
        type: Array as PropType<any[]>,
        default: () => [],
    },
})

const elMenuHorizontalScrollRef = ref<InstanceType<typeof ElScrollbar>>()
const stores = useRoutesList()
const storesThemeConfig = useThemeConfig()
const { routesList } = storeToRefs(stores)
const { themeConfig } = storeToRefs(storesThemeConfig)
const route = useRoute()

const setSendClassicChildBus = useEventBus<any>('setSendClassicChild')

const state = reactive({
    defaultActive: '',
})
// 获取父级菜单数据
const menuLists = computed(() => {
    return props.menuList
})
// 设置横向滚动条可以鼠标滚轮滚动
const onElMenuHorizontalScroll = (e: any) => {
    const eventDelta = e.wheelDelta || -e.deltaY * 40
    elMenuHorizontalScrollRef.value!.wrapRef!.scrollLeft = elMenuHorizontalScrollRef.value!.wrapRef!.scrollLeft + eventDelta / 4
}
// 初始化数据，页面刷新时，滚动条滚动到对应位置
const initElMenuOffsetLeft = () => {
    nextTick(() => {
        const els = document.querySelector<HTMLLIElement>('.el-menu.el-menu--horizontal li.is-active')
        if (!els) return false
        elMenuHorizontalScrollRef.value!.wrapRef!.scrollLeft = els.offsetLeft
    })
}
// 路由过滤递归函数
const filterRoutesFun = (arr: Array<RouteRecordRaw>) => {
    return arr
        .filter((item: any) => !item.meta.isHide)
        .map((item: any) => {
            item = Object.assign({}, item)
            if (item.children) item.children = filterRoutesFun(item.children)
            return item
        })
}
// 传送当前子级数据到菜单中
const setSendClassicChildren = (path: string) => {
    const currentPathSplit = path.split('/')
    const currentData: any = {}
    filterRoutesFun(routesList.value).map((v, k) => {
        if (v.path === `/${currentPathSplit[1]}`) {
            v.k = k
            currentData.item = [{ ...v }]
            currentData.children = [{ ...v }]
            if (v.children) currentData.children = v.children
        }
    })
    return currentData
}
// 设置页面当前路由高亮
const setCurrentRouterHighlight = (currentRoute: any) => {
    const { path, meta } = currentRoute
    if (themeConfig.value.layout === 'classic') {
        state.defaultActive = `/${path.split('/')[1]}`
    } else {
        const pathSplit = meta.isDynamic ? meta.isDynamicPath.split('/') : path.split('/')
        if (pathSplit.length >= 4 && meta.isHide) state.defaultActive = pathSplit.splice(0, 3).join('/')
        else state.defaultActive = path
    }
}
// 页面加载前
onBeforeMount(() => {
    setCurrentRouterHighlight(route)
})
// 页面加载时
onMounted(() => {
    initElMenuOffsetLeft()
})
// 路由更新时
onBeforeRouteUpdate((to) => {
    // 修复：https://gitee.com/lyt-top/vue-next-admin/issues/I3YX6G
    setCurrentRouterHighlight(to)
    // 修复经典布局开启切割菜单时，点击tagsView后左侧导航菜单数据不变的问题
    const { layout, isClassicSplitMenu } = themeConfig.value
    if (layout === 'classic' && isClassicSplitMenu) {
        setSendClassicChildBus.emit(setSendClassicChildren(to.path))
    }
})
</script>

<style scoped lang="scss">
.el-menu-horizontal-warp {
    flex: 1;
    overflow: hidden;
    margin-right: 30px;

    ::v-deep(.el-scrollbar__bar.is-vertical) {
        display: none;
    }

    ::v-deep(a) {
        width: 100%;
    }

    .el-menu.el-menu--horizontal {
        display: flex;
        height: 100%;
        width: 100%;
        box-sizing: border-box;
    }
}
</style>
