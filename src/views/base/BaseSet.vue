<template>
    <my-box class="b-none!">
        <!-- v-if="defData.ready" -->
        <div class="tab-box">
            <el-tabs v-model="activeName" tab-position="left" @tab-click="handleClick">
                <el-tab-pane label="基本设置" name="1">
                    <el-scrollbar>
                        <SetBasic :data="companyInfo" />
                    </el-scrollbar>
                </el-tab-pane>
                <el-tab-pane label="公司介绍" name="2" lazy>
                    <el-scrollbar>
                        <!-- <SetBasic :data="defData.data" /> -->
                    </el-scrollbar>
                </el-tab-pane>
            </el-tabs>
        </div>
    </my-box>
</template>

<script lang="ts" setup>
import type { TabsPaneContext } from 'element-plus'
import { ElMessage } from 'element-plus'
import SetBasic from '@/views/base/components/SetBasic.vue'
import { SystemCompanyApi } from '@/api/system/company'

const activeName = ref('1')

const defData = reactive({
    ready: false,

})

const companyInfo = ref<SystemCompanyApi_GetInfoResponse>()

// 初始化数据
const initDefaultData = async () => {
    const res = await SystemCompanyApi.getSystem()
    if (res.code !== 200) return ElMessage.error(res.msg)

    companyInfo.value = res.data

    defData.ready = true
}

const handleClick = (tab: TabsPaneContext, event: Event) => {

}

provide('initData', initDefaultData)

onBeforeMount(() => {
    initDefaultData()
})
</script>

<style lang="scss" scoped>
.tab-box {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    overflow: auto;

    :deep(.el-tabs) {
        height: 100%;
        --el-tabs-header-height: 48px;

        .el-tabs__header.is-left {
            // width: 160px;
            border-right: 1px solid #eee;

            .el-tabs__item {
                text-align: center;
                min-width: 120px;

                &.is-active {
                    background-color: var(--el-color-primary-light-9);
                }
            }
        }

        .el-tabs__content {
            height: 100%;

            .el-tab-pane {
                height: 100%;
                // .el-scrollbar{
                //     padding: 20px 0;
                // }
            }
        }
    }
}
</style>
