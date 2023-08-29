<!-- 对公转帐 -->
<template>
    <el-form ref="formRef" class="px5px" :model="form.data" :rules="rules" label-width="160px">
        <el-row :gutter="10">
            <el-col :xs="24" :sm="20" :md="16" :lg="14" :xl="12" class="mb20px">
                <el-form-item label="支付名称：" prop="name">
                    <el-input v-model="form.data.name" placeholder="请输入支付名称" maxlength="20" clearable />
                </el-form-item>
            </el-col>
            <el-col :xs="0" :sm="0" :md="0" :lg="10" :xl="12" class="mb20px" />
            <el-col :xs="24" :sm="20" :md="18" :lg="16" :xl="14" class="mb20px">
                <el-form-item label="公司名称：" prop="company_name">
                    <el-input v-model="form.data.company_name" placeholder="" maxlength="30" clearable />
                </el-form-item>
            </el-col>
            <el-col :xs="0" :sm="2" :md="4" :lg="6" :xl="10" class="mb20px" />
            <el-col :xs="24" :sm="18" :md="14" :lg="12" :xl="12" class="mb20px">
                <el-form-item label="收款账号：" prop="bank_account">
                    <el-input v-model="form.data.bank_account" placeholder="" maxlength="30" clearable />
                </el-form-item>
            </el-col>
            <el-col :xs="0" :sm="2" :md="8" :lg="6" :xl="10" class="mb20px" />
            <el-col :xs="24" :sm="18" :md="14" :lg="12" :xl="12" class="mb20px">
                <el-form-item label="开户银行名称：" prop="bank_name">
                    <el-input v-model="form.data.bank_name" maxlength="30" clearable />
                </el-form-item>
            </el-col>
            <el-col :xs="0" :sm="0" :md="8" :lg="6" :xl="10" class="mb20px" />
            <el-col :xs="24" :sm="24" :md="24" :lg="22" :xl="20" class="mb20px">
                <el-form-item label="银联号：" prop="bank_cnaps">
                    <el-input v-model="form.data.bank_cnaps" maxlength="50" clearable />
                </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="22" :xl="20" class="mb20px">
                <el-form-item label="税号：" prop="duty">
                    <el-input v-model="form.data.duty" maxlength="50" clearable />
                </el-form-item>
            </el-col> <el-col :xs="24" :sm="24" :md="24" :lg="22" :xl="20" class="mb20px">
                <el-form-item label="电话：" prop="phone">
                    <el-input v-model="form.data.phone" maxlength="50" clearable />
                </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="22" :xl="20" class="mb20px">
                <el-form-item label="地址：" prop="address">
                    <el-input v-model="form.data.address" maxlength="150" clearable />
                </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="20" :md="20" :lg="20" :xl="20" class="mb20px">
                <el-form-item label="描述/备注：" prop="notes">
                    <el-input v-model="form.data.notes" type="textarea" placeholder="" maxlength="255" clearable />
                </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="22" :xl="20" class="mb20px">
                <el-form-item label="注意事项：" prop="item_notes">
                    <BaseTinymce v-model:value="form.data.item_notes" />
                </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb18px">
                <el-form-item>
                    <el-button type="primary" :loading="btnLoading" @click="onConfirm">
                        确定
                    </el-button>
                    <el-button @click="onReset">
                        重置
                    </el-button>
                </el-form-item>
            </el-col>
        </el-row>
    </el-form>
</template>

<script lang="ts" setup>
import { onBeforeMount, reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import { useThrottleFn } from '@vueuse/core'
import { useLoadingSubmit } from '@/hooks/useLoadingSubmit'
import { verifyFormData } from '@/utils/element/form'
import { ShopPayApi } from '@/api/shop/pay'
import BaseTinymce from '@/components/base/BaseTinymce.vue'

const props = defineProps<{
    type: 1 | 2 | 3
}>()

const formRef = ref<FormInstance>()

const defData = reactive({
    payData: {} as ShopPayApi_InfoTransResponse, // 支付信息
})

const form = reactive({
    data: {
        id: 0,
        name: '', // 支付方式名称      示例值:支付宝
        company_name: '', // 公司名称
        bank_account: '', // 银行账号
        bank_name: '', // 开户银行
        bank_cnaps: '', // 银联号(CNAPS)
        notes: '', // 备注
        duty: '', // 税号
        phone: '', // 电话
        address: '', // 地址
        item_notes: '', // 注意事项
    },
})

const rules = reactive<FormRules>({
    name: [{ required: true, whitespace: true, message: '必填项不能为空', trigger: 'blur' }],

    company_name: [{ required: true, whitespace: true, message: '必填项不能为空', trigger: 'blur' }],
    bank_account: [{ required: true, whitespace: true, message: '必填项不能为空', trigger: 'blur' }],
    bank_name: [{ required: true, whitespace: true, message: '必填项不能为空', trigger: 'blur' }],
    bank_cnaps: [{ required: true, whitespace: true, message: '必填项不能为空', trigger: 'blur' }],
    // notes: [{ required: true, whitespace: true, message: '必填项不能为空', trigger: 'blur' }],
    duty: [{ required: true, whitespace: true, message: '必填项不能为空', trigger: 'blur' }],
    phone: [
        { required: true, whitespace: true, message: '必填项不能为空', trigger: 'blur' },
        { required: true, pattern: /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/, message: '请输入正确的手机号码', trigger: 'blur' },
    ],
    address: [{ required: true, whitespace: true, message: '必填项不能为空', trigger: 'blur' }],
})

const getPayData = async () => {
    if (!props.type) return
    const res = await ShopPayApi.info({ id: props.type })
    if (res.code != 200) {
        ElMessage.error(res.msg)
        return {} as ShopPayApi_InfoTransResponse
    }

    defData.payData = res.data as ShopPayApi_InfoTransResponse
    // console.log('res.data :>> ', res.data);

    const propsData = defData.payData
    form.data.id = propsData.id
    form.data.name = propsData.name
    form.data.company_name = propsData.company_name

    form.data.bank_account = propsData.bank_account
    form.data.bank_name = propsData.bank_name
    form.data.bank_cnaps = propsData.bank_cnaps
    form.data.notes = propsData.notes
    form.data.duty = propsData.duty
    form.data.phone = propsData.phone
    form.data.address = propsData.address
    form.data.item_notes = propsData.item_notes
}

// 重置
const onReset = () => {
    // formRef.value?.resetFields()    //清空表单
    getPayData()
}

const [ApiFunc, btnLoading] = useLoadingSubmit()
// 确定
const onConfirm = useThrottleFn(async () => {
    const isRun = await verifyFormData(formRef.value)
    if (!isRun) return

    const param: ShopPayApi_EditTrans = {
        name: form.data.name,
        type: 3,
        id: form.data.id,

        company_name: form.data.company_name?.trim() ?? '',
        bank_account: form.data.bank_account?.trim() ?? '',
        bank_name: form.data.bank_name?.trim() ?? '',
        bank_cnaps: form.data.bank_cnaps?.trim() ?? '',
        notes: form.data.notes?.trim() ?? '',
        duty: form.data.duty?.trim() ?? '',
        phone: form.data.phone?.trim() ?? '',
        address: form.data.address?.trim() ?? '',
        item_notes: form.data.item_notes, 	// 注意事项
    }
    // 修改更新数据
    const res = await ApiFunc(ShopPayApi.edit(param))
    if (res.code != 200) return ElMessage.error(res.msg)
    ElMessage.success('修改成功')
}, 800)

onBeforeMount(() => {
    getPayData()
})
</script>

<style lang="scss" scoped></style>
