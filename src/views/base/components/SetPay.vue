<template>
    <div class="pl15px pr30px">
        <el-tabs v-model="defData.active">
            <el-tab-pane label="微信" name="1" lazy>
                <ThePayModel :type="1" />
            </el-tab-pane>
            <el-tab-pane label="支付宝" name="2" lazy>
                <ThePayModel :type="2" />
            </el-tab-pane>
            <el-tab-pane label="对公转帐" name="3" lazy>
                <ThePayModel2 :type="3" />
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import ThePayModel from './ThePayModel.vue'
import ThePayModel2 from './ThePayModel2.vue'

const defData = reactive({
    active: '1',
})
</script>

<style lang="scss" scoped></style>
