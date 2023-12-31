<template>
    <div v-show="isShowLockScreen">
        <div class="layout-lock-screen-mask" />
        <div class="layout-lock-screen-img" :class="{ 'layout-lock-screen-filter': isShowLockLogin }" />
        <div class="layout-lock-screen">
            <div ref="layoutLockScreenDateRef" class="layout-lock-screen-date" @mousedown.passive="onDown" @mousemove.passive="onMove"
                @mouseup.passive="onEnd" @touchstart.passive.stop="onDown" @touchmove.passive.stop="onMove" @touchend.passive.stop="onEnd">
                <div class="layout-lock-screen-date-box">
                    <div class="layout-lock-screen-date-box-time">
                        {{ time.hm }}<span class="layout-lock-screen-date-box-minutes">{{ time.s }}</span>
                    </div>
                    <div class="layout-lock-screen-date-box-info">
                        {{ time.mdq }}
                    </div>
                </div>
                <div class="layout-lock-screen-date-top" @click="slidingUnlock()">
                    <SvgIcon name="ele-Top" />
                    <div class="layout-lock-screen-date-top-text">
                        上滑解锁
                    </div>
                </div>
            </div>
            <transition name="el-zoom-in-center">
                <div v-show="isShowLockLogin" class="layout-lock-screen-login">
                    <div class="layout-lock-screen-login-box">
                        <div class="layout-lock-screen-login-box-img">
                            <img src="@/assets/images/face.jpeg">
                        </div>
                        <div class="layout-lock-screen-login-box-name">
                            Administrator
                        </div>
                        <div class="layout-lock-screen-login-box-value">
                            <el-input ref="layoutLockScreenInputRef" v-model="lockScreenPassword" placeholder="请输入密码"
                                @keyup.enter.stop="onLockScreenSubmit()">
                                <template #append>
                                    <el-button @click="onLockScreenSubmit">
                                        <el-icon class="el-input__icon">
                                            <ele-Right />
                                        </el-icon>
                                    </el-button>
                                </template>
                            </el-input>
                        </div>
                    </div>
                    <div class="layout-lock-screen-login-icon">
                        <SvgIcon name="ele-Microphone" :size="20" />
                        <SvgIcon name="ele-AlarmClock" :size="20" />
                        <SvgIcon name="ele-SwitchButton" :size="20" />
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { nextTick, onMounted, onUnmounted, reactive, ref, toRefs } from 'vue'
import { storeToRefs } from 'pinia'
import { formatDate } from '@/utils/common/formatTime'
import { Local } from '@/utils/storage'
import { useThemeConfig } from '@/stores/themeConfig'

// 定义接口来定义对象的类型
interface LockScreenState {
    transparency: number
    downClientY: number
    moveDifference: number
    isShowLockLogin: boolean
    isFlags: boolean
    querySelectorEl: HTMLDivElement
    time: {
        hm: string
        s: string
        mdq: string
    }
    setIntervalTime: number
    isShowLockScreen: boolean
    isShowLockScreenIntervalTime: number
    lockScreenPassword: string
}

const layoutLockScreenDateRef = ref<HTMLDivElement>()
const layoutLockScreenInputRef = ref<HTMLInputElement>()
const storesThemeConfig = useThemeConfig()
const { themeConfig } = storeToRefs(storesThemeConfig)
const state = reactive<LockScreenState>({
    transparency: 1,
    downClientY: 0,
    moveDifference: 0,
    isShowLockLogin: false,
    isFlags: false,
    querySelectorEl: layoutLockScreenDateRef.value as HTMLDivElement,
    time: {
        hm: '',
        s: '',
        mdq: '',
    },
    setIntervalTime: 0,
    isShowLockScreen: false,
    isShowLockScreenIntervalTime: 0,
    lockScreenPassword: '',
})
// 鼠标按下
const onDown = (down: any) => {
    state.isFlags = true
    state.downClientY = down.touches ? down.touches[0].clientY : down.clientY
}
// 鼠标移动
const onMove = (move: any) => {
    if (state.isFlags) {
        const el = state.querySelectorEl
        const opacity = (state.transparency -= 1 / 200)
        if (move.touches) {
            state.moveDifference = move.touches[0].clientY - state.downClientY
        } else {
            state.moveDifference = move.clientY - state.downClientY
        }
        if (state.moveDifference >= 0) return false
        el.setAttribute('style', `top:${state.moveDifference}px;cursor:pointer;opacity:${opacity};`)
        if (state.moveDifference < -400) {
            el.setAttribute('style', `top:${-el.clientHeight}px;cursor:pointer;transition:all 0.3s ease;`)
            state.moveDifference = -el.clientHeight
            setTimeout(() => {
                el && el.parentNode?.removeChild(el)
            }, 300)
        }
        if (state.moveDifference === -el.clientHeight) {
            state.isShowLockLogin = true
            layoutLockScreenInputRef.value?.focus()
        }
    }
}
// 鼠标松开
const onEnd = () => {
    state.isFlags = false
    state.transparency = 1
    if (state.moveDifference >= -400) {
        state.querySelectorEl.setAttribute('style', 'top:0px;opacity:1;transition:all 0.3s ease;')
    }
}
// 获取要拖拽的初始元素
const initGetElement = () => {
    nextTick(() => {
        state.querySelectorEl = layoutLockScreenDateRef.value as HTMLDivElement
    })
}
// 时间初始化
const initTime = () => {
    state.time.hm = formatDate(new Date(), 'HH:MM')
    state.time.s = formatDate(new Date(), 'SS')
    state.time.mdq = formatDate(new Date(), 'mm月dd日，WWW')
}
// 时间初始化定时器
const initSetTime = () => {
    initTime()
    state.setIntervalTime = window.setInterval(() => {
        initTime()
    }, 1000)
}
// 锁屏时间定时器
const initLockScreen = () => {
    if (themeConfig.value.isLockScreen) {
        state.isShowLockScreenIntervalTime = window.setInterval(() => {
            if (themeConfig.value.lockScreenTime <= 1) {
                state.isShowLockScreen = true
                setLocalThemeConfig()
                return false
            }
            themeConfig.value.lockScreenTime--
        }, 1000)
    } else {
        clearInterval(state.isShowLockScreenIntervalTime)
    }
}
// 存储布局配置
const setLocalThemeConfig = () => {
    themeConfig.value.isDrawer = false
    Local.set('themeConfig', themeConfig.value)
}
// 密码输入点击事件
const onLockScreenSubmit = () => {
    themeConfig.value.isLockScreen = false
    themeConfig.value.lockScreenTime = 30
    setLocalThemeConfig()
}
// 直接点击解锁上滑
const slidingUnlock = () => {
    state.isFlags = false
    state.transparency = 1
    state.isShowLockLogin = true
    layoutLockScreenInputRef.value?.focus()
    state.querySelectorEl.setAttribute('style', 'top:-100%;opacity:0;transition:all 0.3s ease;')
    // onEnd()
}

// 页面加载时
onMounted(() => {
    initGetElement()
    initSetTime()
    initLockScreen()
})
// 页面卸载时
onUnmounted(() => {
    window.clearInterval(state.setIntervalTime)
    window.clearInterval(state.isShowLockScreenIntervalTime)
})

const { isShowLockLogin, time, isShowLockScreen, lockScreenPassword } = toRefs(state)
</script>

<style scoped lang="scss">
.layout-lock-screen-fixed {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.layout-lock-screen-filter {
    filter: blur(1px);
}

.layout-lock-screen-mask {
    background: var(--el-color-white);
    @extend .layout-lock-screen-fixed;
    z-index: 9999990;
}

.layout-lock-screen-img {
    @extend .layout-lock-screen-fixed;
    // background-image: url('https://img-blog.csdnimg.cn/afa9c317667f47d5bea34b85af45979e.png#pic_center');
    background-image: url(@/assets/images/lock-background.jpg);
    background-size: 100% 100%;
    z-index: 9999991;
}

.layout-lock-screen {
    @extend .layout-lock-screen-fixed;
    z-index: 9999992;

    &-date {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        color: var(--el-color-white);
        z-index: 9999993;
        user-select: none;

        &-box {
            position: absolute;
            left: 30px;
            bottom: 50px;

            &-time {
                font-size: 100px;
                color: var(--el-color-white);
            }

            &-info {
                font-size: 40px;
                color: var(--el-color-white);
            }

            &-minutes {
                font-size: 16px;
            }
        }

        &-top {
            width: 40px;
            height: 40px;
            line-height: 40px;
            border-radius: 100%;
            border: 1px solid var(--el-border-color-light, #ebeef5);
            background: rgba(255, 255, 255, 0.1);
            color: var(--el-color-white);
            opacity: 0.8;
            position: absolute;
            right: 30px;
            bottom: 50px;
            text-align: center;
            overflow: hidden;
            transition: all 0.3s ease;

            i {
                transition: all 0.3s ease;
            }

            &-text {
                opacity: 0;
                position: absolute;
                top: 150%;
                font-size: 12px;
                color: var(--el-color-white);
                left: 50%;
                line-height: 1.2;
                transform: translate(-50%, -50%);
                transition: all 0.3s ease;
                width: 35px;
            }

            &:hover {
                border: 1px solid rgba(255, 255, 255, 0.5);
                background: rgba(255, 255, 255, 0.2);
                box-shadow: 0 0 12px 0 rgba(255, 255, 255, 0.5);
                color: var(--el-color-white);
                opacity: 1;
                transition: all 0.3s ease;

                i {
                    transform: translateY(-40px);
                    transition: all 0.3s ease;
                }

                .layout-lock-screen-date-top-text {
                    opacity: 1;
                    top: 50%;
                    transition: all 0.3s ease;
                }
            }
        }
    }

    &-login {
        position: relative;
        z-index: 9999994;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        color: var(--el-color-white);

        &-box {
            text-align: center;
            margin: auto;

            &-img {
                width: 180px;
                height: 180px;
                margin: auto;

                img {
                    width: 100%;
                    height: 100%;
                    border-radius: 100%;
                }
            }

            &-name {
                font-size: 26px;
                margin: 15px 0 30px;
            }
        }

        &-icon {
            position: absolute;
            right: 30px;
            bottom: 30px;

            i {
                font-size: 20px;
                margin-left: 15px;
                cursor: pointer;
                opacity: 0.8;

                &:hover {
                    opacity: 1;
                }
            }
        }
    }
}

::v-deep(.el-input-group__append) {
    background: var(--el-color-white);
    padding: 0px 15px;
}

::v-deep(.el-input__inner) {
    border-right-color: var(--el-border-color-extra-light);

    &:hover {
        border-color: var(--el-border-color-extra-light);
    }
}
</style>
