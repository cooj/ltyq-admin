<template>
    <el-form ref="formRef" :model="form" :rules="rules" label-width="140px" class="pt25px">
        <el-row>
            <el-col :xs="24" :sm="20" :md="18" :lg="12" :xl="8" class="mb18px">
                <el-form-item prop="mail_username" label="发送人邮箱：">
                    <el-input v-model="form.mail_username" maxlength="60" type="email" clearable />
                </el-form-item>
            </el-col>
            <el-col :xs="0" :sm="4" :md="4" :lg="10" :xl="10" class="mb18px" />
            <el-col :xs="24" :sm="20" :md="18" :lg="12" :xl="8" class="mb18px">
                <el-form-item prop="mail_password" label="SMTP邮箱授权码：">
                    <el-input v-model="form.mail_password" maxlength="60" clearable />
                </el-form-item>
            </el-col>
            <el-col :xs="0" :sm="4" :md="4" :lg="10" :xl="10" class="mb18px" />
            <el-col :xs="20" :sm="20" :md="18" :lg="12" :xl="8" class="mb18px">
                <el-form-item prop="address" label="测试邮箱：">
                    <el-input v-model="form.address" maxlength="60" type="email" clearable />
                </el-form-item>
            </el-col>
            <el-col :xs="0" :sm="4" :md="4" :lg="10" :xl="10" class="mb18px" />
            <el-col :xs="20" :sm="20" :md="18" :lg="12" :xl="8" class="mb18px">
                <el-form-item prop="title" label="测试标题：">
                    <el-input v-model="form.title" maxlength="60" clearable />
                </el-form-item>
            </el-col>
            <el-col :xs="20" :sm="20" :md="18" :lg="12" :xl="8" class="mb18px">
                <el-form-item prop="content" label="测试内容：" label-width="auto" class="pl10px">
                    <el-input v-model="form.content" maxlength="100" clearable />
                </el-form-item>
            </el-col>
            <el-col :xs="4" :sm="4" :md="6" :lg="10" :xl="8" class="mb18px">
                <el-button class="ml10px" @click="onTestEmail">
                    发送测试邮件
                </el-button>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb18px">
                <el-form-item label="是否启用：" prop="status">
                    <el-switch v-model="form.status" inline-prompt active-text="启" inactive-text="禁" :active-value="1"
                        :inactive-value="0" />
                </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb18px">
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">
                        确定
                    </el-button>
                    <el-button @click="resetForm">
                        重置
                    </el-button>
                </el-form-item>
            </el-col>
        </el-row>
    </el-form>
</template>

<script setup lang="ts">
import { onBeforeMount, reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import { ShopBaseApi } from '@/api/shop/base'
import { verifyFormData } from '@/utils/element/form'

const formRef = ref<FormInstance>()
const form = reactive({
    status: 1, // 是否开启mail 0否 1是
    mail_username: '', // 发送人邮箱
    mail_password: '', // 邮箱授权码
    address: '', // 测试邮箱 收件人地址
    title: '', // 发送标题
    content: '', // 发送内容
})

const rules = reactive<FormRules>({
    mail_username: [{ whitespace: true, type: 'email', message: '请输入正确的邮箱' }],
    mail_password: [{ whitespace: true, message: '请输入正确的邮箱授权码' }],
    address: [{ whitespace: true, type: 'email', message: '请输入正确的邮箱' }],
    title: [{ whitespace: true, message: '请输入标题' }],
    content: [{ whitespace: true, message: '请输入内容' }],
})

// 初始化数据
const initDefaultData = async () => {
    const res = await ShopBaseApi.getEmail()
    if (res.code != 200) return ElMessage.error(res.msg)
    form.mail_username = res.data.mail_username
    form.mail_password = res.data.mail_password
    form.address = res.data.address
    form.status = Number(res.data.status)
}

// 发送测试邮件
const onTestEmail = async () => {
    const run = await formRef.value?.validateField(['mail_username', 'address', 'title', 'content'])
    if (!run) return
    if (form.mail_username.trim() == '') return ElMessage.error('请输入发送人邮箱')
    if (form.address.trim() == '') return ElMessage.error('请输入测试邮箱')
    if (form.title.trim() == '') return ElMessage.error('请输入标题')
    if (form.content.trim() == '') return ElMessage.error('请输入内容')

    const data: ShopBaseApi_TestEmail = {
        mail_username: form.mail_username.trim(),
        address: form.address.trim(),
        title: form.title.trim(),
        content: form.content.trim(),
    }

    const res = await ShopBaseApi.testEmail(data)
    if (res.code != 200) return ElMessage.error(res.msg)
    ElMessage.success('发送成功')
}

// 确定
const onSubmit = async () => {
    const isRun = await verifyFormData(formRef.value)
    if (!isRun) return

    const data: ShopBaseApi_EditEmail = {
        status: form.status as 0 | 1,
        mail_username: form.mail_username.trim(),
        mail_password: form.mail_password.trim(),
        address: form.address.trim(),
    }

    const res = await ShopBaseApi.editEmail(data)
    if (res.code != 200) return ElMessage.error(res.msg)
    ElMessage.success('提交成功')
    initDefaultData()
}
// 重置
const resetForm = async () => {
    // formRef.value?.resetFields();
    initDefaultData()
}

// 页面加载时
onBeforeMount(() => {
    initDefaultData()
})
</script>

<style lang="scss" scoped></style>
