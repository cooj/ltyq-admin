<template>
    <el-container class="layout-container flex-center-column layout-backtop">
        <Headers />
        <Mains />
        <el-backtop target=".layout-backtop .el-main .el-scrollbar__wrap" />
    </el-container>
</template>

<script lang="ts" setup>
import Headers from '@/layout/components/header.vue'
import Mains from '@/layout/components/main.vue'
</script>
