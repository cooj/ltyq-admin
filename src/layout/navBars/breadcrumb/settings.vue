<template>
    <div class="layout-breadcrumb-setting">
        <el-drawer v-model="getThemeConfig.isDrawer" title="布局配置" direction="rtl" destroy-on-close size="260px"
            @close="onDrawerClose">
            <el-scrollbar class="layout-breadcrumb-setting-bar">
                <!-- 全局主题 -->
                <el-divider content-position="left">
                    全局主题
                </el-divider>
                <div class="layout-breadcrumb-setting-bar-flex">
                    <div class="layout-breadcrumb-setting-bar-flex-label">
                        primary
                    </div>
                    <div class="layout-breadcrumb-setting-bar-flex-value">
                        <el-color-picker v-model="getThemeConfig.primary" size="default" @change="onColorPickerChange" />
                    </div>
                </div>
                <div class="layout-breadcrumb-setting-bar-flex mt15px">
                    <div class="layout-breadcrumb-setting-bar-flex-label">
                        深色模式
                    </div>
                    <div class="layout-breadcrumb-setting-bar-flex-value">
                        <el-switch v-model="getThemeConfig.isIsDark" size="small" @change="onAddDarkChange" />
                    </div>
                </div>

                <!-- 顶栏设置 -->
                <el-divider content-position="left">
                    顶栏设置
                </el-divider>
                <div class="layout-breadcrumb-setting-bar-flex">
                    <div class="layout-breadcrumb-setting-bar-flex-label">
                        顶栏背景
                    </div>
                    <div class="layout-breadcrumb-setting-bar-flex-value">
                        <el-color-picker v-model="getThemeConfig.topBar" size="default"
                            @change="onBgColorPickerChange('topBar')" />
                    </div>
                </div>
                <div class="layout-breadcrumb-setting-bar-flex">
                    <div class="layout-breadcrumb-setting-bar-flex-label">
                        顶栏默认字体颜色
                    </div>
                    <div class="layout-breadcrumb-setting-bar-flex-value">
                        <el-color-picker v-model="getThemeConfig.topBarColor" size="default"
                            @change="onBgColorPickerChange('topBarColor')" />
                    </div>
                </div>
                <div class="layout-breadcrumb-setting-bar-flex mt10px">
                    <div class="layout-breadcrumb-setting-bar-flex-label">
                        顶栏背景渐变
                    </div>
                    <div class="layout-breadcrumb-setting-bar-flex-value">
                        <el-switch v-model="getThemeConfig.isTopBarColorGradual" size="small"
                            @change="onTopBarGradualChange" />
                    </div>
                </div>

                <!-- 菜单设置 -->
                <el-divider content-position="left">
                    菜单设置
                </el-divider>
                <div class="layout-breadcrumb-setting-bar-flex">
                    <div class="layout-breadcrumb-setting-bar-flex-label">
                        菜单背景
                    </div>
                    <div class="layout-breadcrumb-setting-bar-flex-value">
                        <el-color-picker v-model="getThemeConfig.menuBar" size="default"
                            @change="onBgColorPickerChange('menuBar')" />
                    </div>
                </div>
                <div class="layout-breadcrumb-setting-bar-flex">
                    <div class="layout-breadcrumb-setting-bar-flex-label">
                        菜单默认字体颜色
                    </div>
                    <div class="layout-breadcrumb-setting-bar-flex-value">
                        <el-color-picker v-model="getThemeConfig.menuBarColor" size="default"
                            @change="onBgColorPickerChange('menuBarColor')" />
                    </div>
                </div>
                <div class="layout-breadcrumb-setting-bar-flex mt14px">
                    <div class="layout-breadcrumb-setting-bar-flex-label">
                        菜单背景渐变
                    </div>
                    <div class="layout-breadcrumb-setting-bar-flex-value">
                        <el-switch v-model="getThemeConfig.isMenuBarColorGradual" size="small"
                            @change="onMenuBarGradualChange" />
                    </div>
                </div>

                <!-- 分栏设置 -->
                <el-divider content-position="left" :style="{ opacity: getThemeConfig.layout !== 'columns' ? 0.5 : 1 }">
                    分栏设置
                </el-divider>
                <div class="layout-breadcrumb-setting-bar-flex"
                    :style="{ opacity: getThemeConfig.layout !== 'columns' ? 0.5 : 1 }">
                    <div class="layout-breadcrumb-setting-bar-flex-label">
                        分栏菜单背景
                    </div>
                    <div class="layout-breadcrumb-setting-bar-flex-value">
                        <el-color-picker v-model="getThemeConfig.columnsMenuBar" size="default"
                            :disabled="getThemeConfig.layout !== 'columns'"
                            @change="onBgColorPickerChange('columnsMenuBar')" />
                    </div>
                </div>
                <div class="layout-breadcrumb-setting-bar-flex"
                    :style="{ opacity: getThemeConfig.layout !== 'columns' ? 0.5 : 1 }">
                    <div class="layout-breadcrumb-setting-bar-flex-label">
                        分栏菜单默认字体颜色
                    </div>
                    <div class="layout-breadcrumb-setting-bar-flex-value">
                        <el-color-picker v-model="getThemeConfig.columnsMenuBarColor" size="default"
                            :disabled="getThemeConfig.layout !== 'columns'"
                            @change="onBgColorPickerChange('columnsMenuBarColor')" />
                    </div>
                </div>
                <div class="layout-breadcrumb-setting-bar-flex mt14px"
                    :style="{ opacity: getThemeConfig.layout !== 'columns' ? 0.5 : 1 }">
                    <div class="layout-breadcrumb-setting-bar-flex-label">
                        分栏菜单背景渐变
                    </div>
                    <div class="layout-breadcrumb-setting-bar-flex-value">
                        <el-switch v-model="getThemeConfig.isColumnsMenuBarColorGradual" size="small"
                            :disabled="getThemeConfig.layout !== 'columns'" @change="onColumnsMenuBarGradualChange" />
                    </div>
                </div>

                <!-- 界面设置 -->
                <el-divider content-position="left">
                    界面设置
                </el-divider>
                <div class="layout-breadcrumb-setting-bar-flex"
                    :style="{ opacity: getThemeConfig.layout === 'transverse' ? 0.5 : 1 }">
                    <div class="layout-breadcrumb-setting-bar-flex-label">
                        菜单水平折叠
                    </div>
                    <div class="layout-breadcrumb-setting-bar-flex-value">
                        <el-switch v-model="getThemeConfig.isCollapse" :disabled="getThemeConfig.layout === 'transverse'"
                            size="small" @change="onThemeConfigChange" />
                    </div>
                </div>
                <div class="layout-breadcrumb-setting-bar-flex mt15px"
                    :style="{ opacity: getThemeConfig.layout === 'transverse' ? 0.5 : 1 }">
                    <div class="layout-breadcrumb-setting-bar-flex-label">
                        菜单手风琴
                    </div>
                    <div class="layout-breadcrumb-setting-bar-flex-value">
                        <el-switch v-model="getThemeConfig.isUniqueOpened"
                            :disabled="getThemeConfig.layout === 'transverse'" size="small"
                            @change="setLocalThemeConfig" />
                    </div>
                </div>
                <div class="layout-breadcrumb-setting-bar-flex mt15px">
                    <div class="layout-breadcrumb-setting-bar-flex-label">
                        固定 Header
                    </div>
                    <div class="layout-breadcrumb-setting-bar-flex-value">
                        <el-switch v-model="getThemeConfig.isFixedHeader" size="small" @change="onIsFixedHeaderChange" />
                    </div>
                </div>
                <div class="layout-breadcrumb-setting-bar-flex mt15px"
                    :style="{ opacity: getThemeConfig.layout !== 'classic' ? 0.5 : 1 }">
                    <div class="layout-breadcrumb-setting-bar-flex-label">
                        经典布局分割菜单
                    </div>
                    <div class="layout-breadcrumb-setting-bar-flex-value">
                        <el-switch v-model="getThemeConfig.isClassicSplitMenu"
                            :disabled="getThemeConfig.layout !== 'classic'" size="small" @change="onClassicSplitMenuChange" />
                    </div>
                </div>
                <div class="layout-breadcrumb-setting-bar-flex mt15px">
                    <div class="layout-breadcrumb-setting-bar-flex-label">
                        开启锁屏
                    </div>
                    <div class="layout-breadcrumb-setting-bar-flex-value">
                        <el-switch v-model="getThemeConfig.isLockScreen" size="small" @change="setLocalThemeConfig" />
                    </div>
                </div>
                <div class="layout-breadcrumb-setting-bar-flex mt11px">
                    <div class="layout-breadcrumb-setting-bar-flex-label">
                        自动锁屏(s/秒)
                    </div>
                    <div class="layout-breadcrumb-setting-bar-flex-value">
                        <el-input-number v-model="getThemeConfig.lockScreenTime" controls-position="right" :min="1"
                            :max="9999" size="default" style="width: 90px" @change="setLocalThemeConfig" />
                    </div>
                </div>

                <!-- 界面显示 -->
                <el-divider content-position="left">
                    界面显示
                </el-divider>
                <div class="layout-breadcrumb-setting-bar-flex mt15px">
                    <div class="layout-breadcrumb-setting-bar-flex-label">
                        侧边栏 Logo
                    </div>
                    <div class="layout-breadcrumb-setting-bar-flex-value">
                        <el-switch v-model="getThemeConfig.isShowLogo" size="small" @change="onIsShowLogoChange" />
                    </div>
                </div>
                <div class="layout-breadcrumb-setting-bar-flex mt15px"
                    :style="{ opacity: getThemeConfig.layout === 'classic' || getThemeConfig.layout === 'transverse' ? 0.5 : 1 }">
                    <div class="layout-breadcrumb-setting-bar-flex-label">
                        开启 Breadcrumb
                    </div>
                    <div class="layout-breadcrumb-setting-bar-flex-value">
                        <el-switch v-model="getThemeConfig.isBreadcrumb"
                            :disabled="getThemeConfig.layout === 'classic' || getThemeConfig.layout === 'transverse'"
                            size="small" @change="onIsBreadcrumbChange" />
                    </div>
                </div>
                <div class="layout-breadcrumb-setting-bar-flex mt15px">
                    <div class="layout-breadcrumb-setting-bar-flex-label">
                        开启 Breadcrumb 图标
                    </div>
                    <div class="layout-breadcrumb-setting-bar-flex-value">
                        <el-switch v-model="getThemeConfig.isBreadcrumbIcon" size="small" @change="setLocalThemeConfig" />
                    </div>
                </div>
                <div class="layout-breadcrumb-setting-bar-flex mt15px">
                    <div class="layout-breadcrumb-setting-bar-flex-label">
                        开启 TagsView
                    </div>
                    <div class="layout-breadcrumb-setting-bar-flex-value">
                        <el-switch v-model="getThemeConfig.isTagsView" size="small" @change="setLocalThemeConfig" />
                    </div>
                </div>
                <div class="layout-breadcrumb-setting-bar-flex mt15px">
                    <div class="layout-breadcrumb-setting-bar-flex-label">
                        开启 TagsView 图标
                    </div>
                    <div class="layout-breadcrumb-setting-bar-flex-value">
                        <el-switch v-model="getThemeConfig.isTagsViewIcon" size="small" @change="setLocalThemeConfig" />
                    </div>
                </div>
                <div class="layout-breadcrumb-setting-bar-flex mt15px">
                    <div class="layout-breadcrumb-setting-bar-flex-label">
                        开启 TagsView 缓存
                    </div>
                    <div class="layout-breadcrumb-setting-bar-flex-value">
                        <el-switch v-model="getThemeConfig.isCacheTagsView" size="small" @change="setLocalThemeConfig" />
                    </div>
                </div>
                <div class="layout-breadcrumb-setting-bar-flex mt15px" :style="{ opacity: state.isMobile ? 0.5 : 1 }">
                    <div class="layout-breadcrumb-setting-bar-flex-label">
                        开启 TagsView 拖拽
                    </div>
                    <div class="layout-breadcrumb-setting-bar-flex-value">
                        <el-switch v-model="getThemeConfig.isSortableTagsView" :disabled="state.isMobile ? true : false"
                            size="small" @change="onSortableTagsViewChange" />
                    </div>
                </div>
                <div class="layout-breadcrumb-setting-bar-flex mt15px">
                    <div class="layout-breadcrumb-setting-bar-flex-label">
                        开启 TagsView 共用
                    </div>
                    <div class="layout-breadcrumb-setting-bar-flex-value">
                        <el-switch v-model="getThemeConfig.isShareTagsView" size="small"
                            @change="onShareTagsViewChange" />
                    </div>
                </div>
                <div class="layout-breadcrumb-setting-bar-flex mt15px">
                    <div class="layout-breadcrumb-setting-bar-flex-label">
                        开启 Footer
                    </div>
                    <div class="layout-breadcrumb-setting-bar-flex-value">
                        <el-switch v-model="getThemeConfig.isFooter" size="small" @change="setLocalThemeConfig" />
                    </div>
                </div>
                <div class="layout-breadcrumb-setting-bar-flex mt15px">
                    <div class="layout-breadcrumb-setting-bar-flex-label">
                        灰色模式
                    </div>
                    <div class="layout-breadcrumb-setting-bar-flex-value">
                        <el-switch v-model="getThemeConfig.isGrayscale" size="small"
                            @change="onAddFilterChange('grayscale')" />
                    </div>
                </div>
                <div class="layout-breadcrumb-setting-bar-flex mt15px">
                    <div class="layout-breadcrumb-setting-bar-flex-label">
                        色弱模式
                    </div>
                    <div class="layout-breadcrumb-setting-bar-flex-value">
                        <el-switch v-model="getThemeConfig.isInvert" size="small" @change="onAddFilterChange('invert')" />
                    </div>
                </div>
                <div class="layout-breadcrumb-setting-bar-flex mt15px">
                    <div class="layout-breadcrumb-setting-bar-flex-label">
                        开启水印
                    </div>
                    <div class="layout-breadcrumb-setting-bar-flex-value">
                        <el-switch v-model="getThemeConfig.isWaterMark" size="small" @change="onWaterMarkChange" />
                    </div>
                </div>
                <div class="layout-breadcrumb-setting-bar-flex mt14px">
                    <div class="layout-breadcrumb-setting-bar-flex-label">
                        水印文案
                    </div>
                    <div class="layout-breadcrumb-setting-bar-flex-value">
                        <el-input v-model="getThemeConfig.WaterMarkText" size="default" style="width: 90px"
                            @input="onWaterMarkTextInput($event)" />
                    </div>
                </div>

                <!-- 其它设置 -->
                <el-divider content-position="left">
                    其它设置
                </el-divider>
                <div class="layout-breadcrumb-setting-bar-flex mt15px">
                    <div class="layout-breadcrumb-setting-bar-flex-label">
                        TagsView 风格
                    </div>
                    <div class="layout-breadcrumb-setting-bar-flex-value">
                        <el-select v-model="getThemeConfig.tagsStyle" placeholder="请选择" size="default" style="width: 90px"
                            @change="setLocalThemeConfig">
                            <el-option label="风格1" value="tags-style-one" />
                            <el-option label="风格4" value="tags-style-four" />
                            <el-option label="风格5" value="tags-style-five" />
                        </el-select>
                    </div>
                </div>
                <div class="layout-breadcrumb-setting-bar-flex mt15px">
                    <div class="layout-breadcrumb-setting-bar-flex-label">
                        主页面切换动画
                    </div>
                    <div class="layout-breadcrumb-setting-bar-flex-value">
                        <el-select v-model="getThemeConfig.animation" placeholder="请选择" size="default" style="width: 90px"
                            @change="setLocalThemeConfig">
                            <el-option label="slide-right" value="slide-right" />
                            <el-option label="slide-left" value="slide-left" />
                            <el-option label="opacity" value="opacity" />
                        </el-select>
                    </div>
                </div>
                <div class="layout-breadcrumb-setting-bar-flex mt15px"
                    :style="{ opacity: getThemeConfig.layout !== 'columns' ? 0.5 : 1 }">
                    <div class="layout-breadcrumb-setting-bar-flex-label">
                        分栏高亮风格
                    </div>
                    <div class="layout-breadcrumb-setting-bar-flex-value">
                        <el-select v-model="getThemeConfig.columnsAsideStyle" placeholder="请选择" size="default"
                            style="width: 90px" :disabled="getThemeConfig.layout !== 'columns' ? true : false"
                            @change="setLocalThemeConfig">
                            <el-option label="圆角" value="columns-round" />
                            <el-option label="卡片" value="columns-card" />
                        </el-select>
                    </div>
                </div>
                <div class="layout-breadcrumb-setting-bar-flex mb27px mt15px"
                    :style="{ opacity: getThemeConfig.layout !== 'columns' ? 0.5 : 1 }">
                    <div class="layout-breadcrumb-setting-bar-flex-label">
                        分栏布局风格
                    </div>
                    <div class="layout-breadcrumb-setting-bar-flex-value">
                        <el-select v-model="getThemeConfig.columnsAsideLayout" placeholder="请选择" size="default"
                            style="width: 90px" :disabled="getThemeConfig.layout !== 'columns' ? true : false"
                            @change="setLocalThemeConfig">
                            <el-option label="水平" value="columns-horizontal" />
                            <el-option label="垂直" value="columns-vertical" />
                        </el-select>
                    </div>
                </div>

                <!-- 布局切换 -->
                <el-divider content-position="left">
                    布局切换
                </el-divider>
                <div class="layout-drawer-content-flex">
                    <!-- defaults 布局 -->
                    <div class="layout-drawer-content-item" @click="onSetLayout('defaults')">
                        <section class="el-container el-circular"
                            :class="{ 'drawer-layout-active': getThemeConfig.layout === 'defaults' }">
                            <aside class="el-aside" style="width: 20px" />
                            <section class="el-container is-vertical">
                                <header class="el-header" style="height: 10px" />
                                <main class="el-main" />
                            </section>
                        </section>
                        <div class="layout-tips-warp"
                            :class="{ 'layout-tips-warp-active': getThemeConfig.layout === 'defaults' }">
                            <div class="layout-tips-box">
                                <p class="layout-tips-txt">
                                    默认
                                </p>
                            </div>
                        </div>
                    </div>
                    <!-- classic 布局 -->
                    <div class="layout-drawer-content-item" @click="onSetLayout('classic')">
                        <section class="el-container is-vertical el-circular"
                            :class="{ 'drawer-layout-active': getThemeConfig.layout === 'classic' }">
                            <header class="el-header" style="height: 10px" />
                            <section class="el-container">
                                <aside class="el-aside" style="width: 20px" />
                                <section class="el-container is-vertical">
                                    <main class="el-main" />
                                </section>
                            </section>
                        </section>
                        <div class="layout-tips-warp"
                            :class="{ 'layout-tips-warp-active': getThemeConfig.layout === 'classic' }">
                            <div class="layout-tips-box">
                                <p class="layout-tips-txt">
                                    经典
                                </p>
                            </div>
                        </div>
                    </div>
                    <!-- transverse 布局 -->
                    <div class="layout-drawer-content-item" @click="onSetLayout('transverse')">
                        <section class="el-container is-vertical el-circular"
                            :class="{ 'drawer-layout-active': getThemeConfig.layout === 'transverse' }">
                            <header class="el-header" style="height: 10px" />
                            <section class="el-container">
                                <section class="el-container is-vertical">
                                    <main class="el-main" />
                                </section>
                            </section>
                        </section>
                        <div class="layout-tips-warp"
                            :class="{ 'layout-tips-warp-active': getThemeConfig.layout === 'transverse' }">
                            <div class="layout-tips-box">
                                <p class="layout-tips-txt">
                                    横向
                                </p>
                            </div>
                        </div>
                    </div>
                    <!-- columns 布局 -->
                    <div class="layout-drawer-content-item" @click="onSetLayout('columns')">
                        <section class="el-container el-circular"
                            :class="{ 'drawer-layout-active': getThemeConfig.layout === 'columns' }">
                            <aside class="el-aside-dark" style="width: 10px" />
                            <aside class="el-aside" style="width: 20px" />
                            <section class="el-container is-vertical">
                                <header class="el-header" style="height: 10px" />
                                <main class="el-main" />
                            </section>
                        </section>
                        <div class="layout-tips-warp"
                            :class="{ 'layout-tips-warp-active': getThemeConfig.layout === 'columns' }">
                            <div class="layout-tips-box">
                                <p class="layout-tips-txt">
                                    分栏
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="copy-config">
                    <el-alert title="点击下方按钮，复制布局配置去 `src/stores/modules/themeConfig.ts` 中修改。" type="warning"
                        :closable="false" />
                    <el-button ref="copyConfigBtnRef" size="default" class="copy-config-btn" type="primary" plain
                        @click="onCopyConfigClick">
                        <el-icon class="mr5px">
                            <ele-CopyDocument />
                        </el-icon>
                        一键复制配置
                    </el-button>
                    <el-button size="default" class="copy-config-btn-reset" type="info" @click="onResetConfigClick">
                        <el-icon class="mr5px">
                            <ele-RefreshRight />
                        </el-icon>
                        一键恢复默认
                    </el-button>
                </div>
            </el-scrollbar>
        </el-drawer>
    </div>
</template>

<script lang="ts" setup>
import { computed, nextTick, onMounted, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { storeToRefs } from 'pinia'
import { useEventBus } from '@vueuse/core'
import { useThemeConfig } from '@/stores/themeConfig'
import { getDarkColor, getLightColor } from '@/utils/theme'
import { verifyAndSpace } from '@/utils/toolsValidate'
import { Local } from '@/utils/storage'
import Watermark from '@/utils/wartermark'
import commonFunction from '@/utils/commonFunction'
import { isMobile } from '@/utils/other'

const storesThemeConfig = useThemeConfig()
const { themeConfig } = storeToRefs(storesThemeConfig)
const { copyText } = commonFunction()

const layoutResizeBus = useEventBus<{ clientWidth: number; layout: MainLayoutType }>('layoutMobileResize')
const setFilterRouteBus = useEventBus('getBreadcrumbIndexSetFilterRoutes')
const openShareTagsViewBus = useEventBus('openShareTagsView')
const openOrCloseSortableBus = useEventBus('openOrCloseSortable')

const state = reactive({
    isMobile: false,
})
// 获取布局配置信息
const getThemeConfig = computed(() => {
    return themeConfig.value
})
// 1、全局主题
const onColorPickerChange = () => {
    if (!getThemeConfig.value.primary) return ElMessage.warning('全局主题 primary 颜色值不能为空')
    // 颜色加深
    document.documentElement.style.setProperty('--el-color-primary-dark-2', `${getDarkColor(getThemeConfig.value.primary, 0.1)}`)
    document.documentElement.style.setProperty('--el-color-primary', getThemeConfig.value.primary)
    // 颜色变浅
    for (let i = 1; i <= 9; i++) {
        document.documentElement.style.setProperty(`--el-color-primary-light-${i}`, `${getLightColor(getThemeConfig.value.primary, i / 10)}`)
    }
    setDispatchThemeConfig()
}
// 2、菜单 / 顶栏
const onBgColorPickerChange = (bg: keyof typeof getThemeConfig.value) => {
    document.documentElement.style.setProperty(`--next-bg-${bg}`, getThemeConfig.value[bg] as string)
    if (bg === 'menuBar') {
        document.documentElement.style.setProperty('--next-bg-menuBar-light-1', getLightColor(getThemeConfig.value.menuBar, 0.05) as string)
    }
    onTopBarGradualChange()
    onMenuBarGradualChange()
    onColumnsMenuBarGradualChange()
    setDispatchThemeConfig()
}
// 2、菜单 / 顶栏 --> 顶栏背景渐变
const onTopBarGradualChange = () => {
    setGradualFun('.layout-navbars-breadcrumb-index', getThemeConfig.value.isTopBarColorGradual, getThemeConfig.value.topBar)
}
// 2、菜单 / 顶栏 --> 菜单背景渐变
const onMenuBarGradualChange = () => {
    setGradualFun('.layout-container .el-aside', getThemeConfig.value.isMenuBarColorGradual, getThemeConfig.value.menuBar)
}
// 2、菜单 / 顶栏 --> 分栏菜单背景渐变
const onColumnsMenuBarGradualChange = () => {
    setGradualFun('.layout-container .layout-columns-aside', getThemeConfig.value.isColumnsMenuBarColorGradual, getThemeConfig.value.columnsMenuBar)
}
// 2、菜单 / 顶栏 --> 背景渐变函数
const setGradualFun = (el: string, bool: boolean, color: string) => {
    setTimeout(() => {
        const els = document.querySelector(el)
        if (!els) return false
        document.documentElement.style.setProperty('--el-menu-bg-color', document.documentElement.style.getPropertyValue('--next-bg-menuBar'))
        if (bool) els.setAttribute('style', `background:linear-gradient(to bottom left , ${color}, ${getLightColor(color, 0.6)}) !important;`)
        else els.setAttribute('style', '')
        setLocalThemeConfig()
    }, 200)
}
// 3、界面设置 --> 菜单水平折叠
const onThemeConfigChange = () => {
    setDispatchThemeConfig()
}
// 3、界面设置 --> 固定 Header
const onIsFixedHeaderChange = () => {
    getThemeConfig.value.isFixedHeaderChange = !getThemeConfig.value.isFixedHeader
    setLocalThemeConfig()
}
// 3、界面设置 --> 经典布局分割菜单
const onClassicSplitMenuChange = () => {
    getThemeConfig.value.isBreadcrumb = false
    setLocalThemeConfig()
    setFilterRouteBus.emit()
}
// 4、界面显示 --> 侧边栏 Logo
const onIsShowLogoChange = () => {
    getThemeConfig.value.isShowLogoChange = !getThemeConfig.value.isShowLogo
    setLocalThemeConfig()
}
// 4、界面显示 --> 面包屑 Breadcrumb
const onIsBreadcrumbChange = () => {
    if (getThemeConfig.value.layout === 'classic') {
        getThemeConfig.value.isClassicSplitMenu = false
    }
    setLocalThemeConfig()
}
// 4、界面显示 --> 开启 TagsView 拖拽
const onSortableTagsViewChange = () => {
    openOrCloseSortableBus.emit()
    setLocalThemeConfig()
}
// 4、界面显示 --> 开启 TagsView 共用
const onShareTagsViewChange = () => {
    openShareTagsViewBus.emit()
    setLocalThemeConfig()
}
// 4、界面显示 --> 灰色模式/色弱模式
const onAddFilterChange = (attr: string) => {
    if (attr === 'grayscale') {
        if (getThemeConfig.value.isGrayscale) getThemeConfig.value.isInvert = false
    } else {
        if (getThemeConfig.value.isInvert) getThemeConfig.value.isGrayscale = false
    }
    const cssAttr
        = attr === 'grayscale' ? `grayscale(${getThemeConfig.value.isGrayscale ? 1 : 0})` : `invert(${getThemeConfig.value.isInvert ? '80%' : '0%'})`
    const appEle: any = document.body
    appEle.setAttribute('style', `filter: ${cssAttr}`)
    setLocalThemeConfig()
}
// 4、界面显示 --> 深色模式
const onAddDarkChange = () => {
    const body = document.documentElement as HTMLElement
    if (getThemeConfig.value.isIsDark) body.setAttribute('data-theme', 'dark')
    else body.setAttribute('data-theme', '')
}
// 4、界面显示 --> 开启水印
const onWaterMarkChange = () => {
    getThemeConfig.value.isWaterMark ? Watermark.set(getThemeConfig.value.WaterMarkText) : Watermark.del()
    setLocalThemeConfig()
}
// 4、界面显示 --> 水印文案
const onWaterMarkTextInput = (val: any) => {
    getThemeConfig.value.WaterMarkText = verifyAndSpace(val)
    if (getThemeConfig.value.WaterMarkText === '') return false
    if (getThemeConfig.value.isWaterMark) Watermark.set(getThemeConfig.value.WaterMarkText)
    setLocalThemeConfig()
}
// 5、布局切换
const onSetLayout = (layout: MainLayoutType) => {
    Local.set('oldLayout', layout)
    if (getThemeConfig.value.layout === layout) return false
    if (layout === 'transverse') getThemeConfig.value.isCollapse = false
    getThemeConfig.value.layout = layout
    getThemeConfig.value.isDrawer = false
    initLayoutChangeFun()
}
// 设置布局切换函数
const initLayoutChangeFun = () => {
    onBgColorPickerChange('menuBar')
    onBgColorPickerChange('menuBarColor')
    onBgColorPickerChange('topBar')
    onBgColorPickerChange('topBarColor')
    onBgColorPickerChange('columnsMenuBar')
    onBgColorPickerChange('columnsMenuBarColor')
}
// 关闭弹窗时，初始化变量。变量用于处理 proxy.$refs.layoutScrollbarRef.update()
const onDrawerClose = () => {
    getThemeConfig.value.isFixedHeaderChange = false
    getThemeConfig.value.isShowLogoChange = false
    getThemeConfig.value.isDrawer = false
    setLocalThemeConfig()
}
// 布局配置弹窗打开
const openDrawer = () => {
    getThemeConfig.value.isDrawer = true
}
// 触发 store 布局配置更新
const setDispatchThemeConfig = () => {
    setLocalThemeConfig()
    setLocalThemeConfigStyle()
}
// 存储布局配置
const setLocalThemeConfig = () => {
    Local.remove('themeConfig')
    Local.set('themeConfig', getThemeConfig.value)
}
// 存储布局配置全局主题样式（html根标签）
const setLocalThemeConfigStyle = () => {
    Local.set('themeConfigStyle', document.documentElement.style.cssText)
}
// 一键复制配置
const onCopyConfigClick = () => {
    const copyThemeConfig = Local.get('themeConfig')
    copyThemeConfig.isDrawer = false
    copyText(JSON.stringify(copyThemeConfig)).then(() => {
        getThemeConfig.value.isDrawer = false
    })
}
// 一键恢复默认
const onResetConfigClick = () => {
    Local.clear()
    window.location.reload()
}
// 初始化菜单样式等
const initSetStyle = () => {
    // 2、菜单 / 顶栏 --> 顶栏背景渐变
    onTopBarGradualChange()
    // 2、菜单 / 顶栏 --> 菜单背景渐变
    onMenuBarGradualChange()
    // 2、菜单 / 顶栏 --> 分栏菜单背景渐变
    onColumnsMenuBarGradualChange()
}
onMounted(() => {
    nextTick(() => {
        // 判断当前布局是否不相同，不相同则初始化当前布局的样式，防止监听窗口大小改变时，布局配置logo、菜单背景等部分布局失效问题
        if (!Local.get('frequency')) initLayoutChangeFun()
        Local.set('frequency', 1)
        // 监听窗口大小改变，非默认布局，设置成默认布局（适配移动端）
        layoutResizeBus.on((res) => {
            getThemeConfig.value.layout = res.layout
            getThemeConfig.value.isDrawer = false
            initLayoutChangeFun()
            state.isMobile = isMobile()
        })
        setTimeout(() => {
            // 默认样式
            onColorPickerChange()
            // 灰色模式
            if (getThemeConfig.value.isGrayscale) onAddFilterChange('grayscale')
            // 色弱模式
            if (getThemeConfig.value.isInvert) onAddFilterChange('invert')
            // 深色模式
            if (getThemeConfig.value.isIsDark) onAddDarkChange()
            // 开启水印
            onWaterMarkChange()
            // 初始化菜单样式等
            initSetStyle()
        }, 100)
    })
})

defineExpose({
    openDrawer,
})
</script>

<style scoped lang="scss">
.layout-breadcrumb-setting-bar {
    height: calc(100vh - 50px);
    padding: 0 15px;

    ::v-deep(.el-scrollbar__view) {
        overflow-x: hidden !important;
    }

    .layout-breadcrumb-setting-bar-flex {
        display: flex;
        align-items: center;
        margin-bottom: 5px;

        &-label {
            flex: 1;
            color: var(--el-text-color-primary);
        }
    }

    .layout-drawer-content-flex {
        overflow: hidden;
        display: flex;
        flex-wrap: wrap;
        align-content: flex-start;
        margin: 0 -5px;

        .layout-drawer-content-item {
            width: 50%;
            height: 70px;
            cursor: pointer;
            border: 1px solid transparent;
            position: relative;
            padding: 5px;

            .el-container {
                height: 100%;

                .el-aside-dark {
                    background-color: var(--next-color-setting-header);
                }

                .el-aside {
                    background-color: var(--next-color-setting-aside);
                }

                .el-header {
                    background-color: var(--next-color-setting-header);
                }

                .el-main {
                    background-color: var(--next-color-setting-main);
                }
            }

            .el-circular {
                border-radius: 2px;
                overflow: hidden;
                border: 1px solid transparent;
                transition: all 0.3s ease-in-out;
            }

            .drawer-layout-active {
                border: 1px solid;
                border-color: var(--el-color-primary);
            }

            .layout-tips-warp,
            .layout-tips-warp-active {
                transition: all 0.3s ease-in-out;
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                border: 1px solid;
                border-color: var(--el-color-primary-light-5);
                border-radius: 100%;
                padding: 4px;

                .layout-tips-box {
                    transition: inherit;
                    width: 30px;
                    height: 30px;
                    z-index: 9;
                    border: 1px solid;
                    border-color: var(--el-color-primary-light-5);
                    border-radius: 100%;

                    .layout-tips-txt {
                        transition: inherit;
                        position: relative;
                        top: 5px;
                        font-size: 12px;
                        line-height: 1;
                        letter-spacing: 2px;
                        white-space: nowrap;
                        color: var(--el-color-primary-light-5);
                        text-align: center;
                        transform: rotate(30deg);
                        left: -1px;
                        background-color: var(--next-color-setting-main);
                        width: 32px;
                        height: 17px;
                        line-height: 17px;
                    }
                }
            }

            .layout-tips-warp-active {
                border: 1px solid;
                border-color: var(--el-color-primary);

                .layout-tips-box {
                    border: 1px solid;
                    border-color: var(--el-color-primary);

                    .layout-tips-txt {
                        color: var(--el-color-primary) !important;
                        background-color: var(--next-color-setting-main) !important;
                    }
                }
            }

            &:hover {
                .el-circular {
                    transition: all 0.3s ease-in-out;
                    border: 1px solid;
                    border-color: var(--el-color-primary);
                }

                .layout-tips-warp {
                    transition: all 0.3s ease-in-out;
                    border-color: var(--el-color-primary);

                    .layout-tips-box {
                        transition: inherit;
                        border-color: var(--el-color-primary);

                        .layout-tips-txt {
                            transition: inherit;
                            color: var(--el-color-primary) !important;
                            background-color: var(--next-color-setting-main) !important;
                        }
                    }
                }
            }
        }
    }

    .copy-config {
        margin: 10px 0;

        .copy-config-btn {
            width: 100%;
            margin-top: 15px;
        }

        .copy-config-btn-reset {
            width: 100%;
            margin: 10px 0 0;
        }
    }
}
</style>
