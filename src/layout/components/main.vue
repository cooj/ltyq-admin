<template>
    <el-main class="layout-main">
        <ElScrollbar ref="layoutScrollbarRef" native :class="{ 'layout-scrollbar':
            (!isClassicOrTransverse && !currentRouteMeta.isLink && !currentRouteMeta.isIframe)
            || (!isClassicOrTransverse && currentRouteMeta.isLink && !currentRouteMeta.isIframe) }">
            <LayoutParentView :style="{ padding: !isClassicOrTransverse || (currentRouteMeta.isLink && currentRouteMeta.isIframe) ? '0' : '15px',
                                        transition: 'padding 0.3s ease-in-out' }" />
            <Footers v-if="themeConfig.isFooter" />
        </ElScrollbar>
    </el-main>
</template>

<script lang="ts" setup>
import { computed, onMounted, reactive, ref, toRefs, watch } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { ElScrollbar } from 'element-plus'
import { useThemeConfig } from '@/stores/themeConfig'
import { NextLoading } from '@/utils/loading'
import LayoutParentView from '@/layout/routerView/parent.vue'
import Footers from '@/layout/footer/index.vue'

// 定义接口来定义对象的类型
interface MainState {
    headerHeight: string | number
    currentRouteMeta: any
}

const layoutScrollbarRef = ref<InstanceType<typeof ElScrollbar>>()
const storesThemeConfig = useThemeConfig()
const { themeConfig } = storeToRefs(storesThemeConfig)
const route = useRoute()
const state = reactive<MainState>({
    headerHeight: '',
    currentRouteMeta: {},
})
// 判断布局
const isClassicOrTransverse = computed(() => {
    const { layout } = themeConfig.value
    return layout === 'classic' || layout === 'transverse'
})
// 设置 main 的高度
const initHeaderHeight = () => {
    const bool = state.currentRouteMeta.isLink && state.currentRouteMeta.isIframe
    const { isTagsView } = themeConfig.value
    if (isTagsView) return (state.headerHeight = bool ? '86px' : '115px')
    else return (state.headerHeight = '80px')
}
// 初始化获取当前路由 meta，用于设置 iframe padding
const initGetMeta = () => {
    state.currentRouteMeta = route.meta
}
// 页面加载前
onMounted(async () => {
    await initGetMeta()
    initHeaderHeight()
    NextLoading.done()
})
// 监听路由变化
watch(
    () => route.path,
    () => {
        state.currentRouteMeta = route.meta
        const bool = state.currentRouteMeta.isLink && state.currentRouteMeta.isIframe
        state.headerHeight = bool ? '86px' : '115px'
        layoutScrollbarRef.value?.update()
    },
)
// 监听 themeConfig 配置文件的变化，更新菜单 el-scrollbar 的高度
watch(
    themeConfig,
    (val) => {
        state.currentRouteMeta = route.meta
        const bool = state.currentRouteMeta.isLink && state.currentRouteMeta.isIframe
        state.headerHeight = val.isTagsView ? (bool ? '86px' : '115px') : '51px'
        layoutScrollbarRef.value?.update()
    },
    {
        deep: true,
    },
)

const { currentRouteMeta } = toRefs(state)
</script>

<style lang="scss" scoped>
.layout-main {
    :deep(>.el-scrollbar>.el-scrollbar__wrap) {
        overflow: hidden;
    }
}
</style>
