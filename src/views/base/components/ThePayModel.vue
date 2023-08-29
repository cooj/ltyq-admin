<template>
    <el-form ref="formRef" class="px5px" :model="form.data" :rules="rules" label-width="160px">
        <el-row :gutter="10">
            <el-col :xs="24" :sm="20" :md="18" :lg="16" :xl="14" class="mb20px">
                <el-form-item label="支付名称：" prop="name">
                    <el-input v-model="form.data.name" class="w100%" placeholder="请输入支付名称" maxlength="20"
                        clearable />
                </el-form-item>
            </el-col>
            <!-- <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20px">
                <el-form-item label="支付类型" prop="type">
                    <el-radio-group v-model="form.data.type">
                        <el-radio :label="1">微信</el-radio>
                        <el-radio :label="2">支付宝</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-col> -->
            <el-col :xs="24" :sm="20" :md="18" :lg="16" :xl="16" class="mb20px">
                <el-form-item label="AppId：" prop="appid">
                    <el-input v-model="form.data.appid" class="w100%" placeholder="" maxlength="255" clearable />
                </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="20" :md="18" :lg="16" :xl="16" class="mb20px">
                <el-form-item label="异步通知地址：" prop="notify_url">
                    <el-input v-model="form.data.notify_url" class="w100%" placeholder="" maxlength="255"
                        clearable />
                </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="22" :xl="20" class="mb20px">
                <el-form-item label="公钥：" prop="public_key">
                    <el-input v-model="form.data.public_key" type="textarea" class="w100%" show-word-limit maxlength="2000"
                        clearable />
                </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="22" :xl="20" class="mb20px">
                <el-form-item label="秘钥：" prop="private_key">
                    <el-input v-model="form.data.private_key" class="w100%" type="textarea" show-word-limit maxlength="2000"
                        clearable />
                </el-form-item>
            </el-col>
            <template v-if="form.data.type == 1">
                <el-col :xs="24" :sm="20" :md="20" :lg="20" :xl="20" class="mb20px">
                    <el-form-item label="AppSecret：" prop="appsecret">
                        <el-input v-model="form.data.appsecret" class="w100%" placeholder="" maxlength="255" clearable />
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="20" :md="20" :lg="20" :xl="20" class="mb20px">
                    <el-form-item label="V3秘钥：" prop="apiv3key">
                        <el-input v-model="form.data.apiv3key" class="w100%" placeholder="" maxlength="255" clearable />
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="20" :md="20" :lg="20" :xl="20" class="mb20px">
                    <el-form-item label="商户号：" prop="merchantid">
                        <el-input v-model="form.data.merchantid" class="w100%" placeholder="" maxlength="255" clearable />
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="20" :md="20" :lg="20" :xl="20" class="mb20px">
                    <el-form-item label="商户API证书序列号：" prop="merchantSerialNumber">
                        <el-input v-model="form.data.merchantSerialNumber" class="w100%" placeholder="" maxlength="255"
                            clearable />
                    </el-form-item>
                </el-col>
            </template>
            <el-col v-if="form.data.type == 2" :xs="24" :sm="20" :md="20" :lg="20" :xl="20" class="mb20px">
                <el-form-item label="同步通知地址：" prop="return_url">
                    <el-input v-model="form.data.return_url" class="w100%" placeholder="" maxlength="255" clearable />
                </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="20" :md="20" :lg="20" :xl="20" class="mb20px">
                <el-form-item label="描述：" prop="mome">
                    <el-input v-model="form.data.mome" type="textarea" placeholder="" maxlength="255" clearable />
                </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20px">
                <el-form-item label="状态：" prop="status">
                    <el-switch v-model="form.data.status" inline-prompt active-text="启" inactive-text="禁" :active-value="1"
                        :inactive-value="0" />
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

const props = defineProps<{
    type: 1 | 2
}>()

const formRef = ref<FormInstance>()

const defData = reactive({
    payData: {} as ShopPayApi_InfoResponse, // 支付信息
})

const form = reactive({
    data: {
        id: 0,

        name: '', // 支付方式名称      示例值:支付宝
        type: props.type, // 类型 1微信 2支付宝      示例值:2
        appid: '', // appid      示例值:2016092400586201
        notify_url: '', // 异步通知地址      示例值:http://goyojo.com
        public_key: '', // 公钥      示例值:MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuTVg7++9vWF9aZHEJAyvOcDmXcb8lC2GtmEUhA72GMefSac1jApos6jq0JJNBmL1MjYpdbBGUDGWeBy5L7f0VpefhCAcgqXe4hR491M3KFOjZevNjzfnJ586SrWh5XsNtoZbNwRO/CVjrEpqVcFFjX4PNwnQ/lCMcPk5rQWZI7rvsCZKUgB8nPs/3gsLJHyey8MmLGigMj7KrrPOXctO0jJFZ078GBIbuel4ffWRn1bcda7zRFBXC4vTJuu0/Kapq2YOi4B2GuRnlZ35zYUoXIk45f3OKGrTmPTDdlwZpzv27xEi6PCZlfILTw0RQJK17zDj3eBRvBM1y28naQg86QIDAQAB
        private_key: '', // 秘钥      示例值:MIIEpQIBAAKCAQEAtXzHLDvC0yqKvFOoNOo+7uvgIkl47B5QijkFLo8Zb4ypte+Y2SYuzRYTN3ihFY7ciSQIgOyzawA6uwAa6p9o5E2/1ie4lkeT5ccTQREfzmdYG6xWMYeQVBu3j4hbxQkZFFEXoAsvfw8SgCPvpZVtglDQ+uwKNOf81mzyLtl90BfAuRI3d5Zn6goE0/xPsR/D4qXK7xyJwa51m6Gx7uia7dnEewa6UiGa955hxXzMx16ZUQpOJwYuyztLwXKUi8Xk2+4NXTJIUjN+etLNwtXMcwyLwoovGdkPa1IqAF7bYDDVXZZoYOWxBhSMLwOSWPQ469jVzyWP72EAi6XPyHAdiwIDAQABAoIBAQCSM6nT1XS2XjATVKVNs2LtX/FYTa3vMOCa6SJmhnrsJPnWieStEhhjuKPUbQX/cu3wQKnlCknjKfUmDgig97gtKwEeiTMnRRQ85+l34k6oHRKagHOTRO0dBJMUOroK+bBNcKJCmKAzkDXMKqb00nK8p1Qiv6HdSwGgz3UuDqFOz2XZjtEg6QXSq4vdU05RYJKP4WbLt5HaT0/NxTJfjWZQ92vkB3B+dHaIMmWZMdNgr9TAX8+6N3H/gYtAK2OxSqm1OGQlP8nHsmjRhjl7+R6FNa02Jyg2ZHt4U4pivLjBELxio+4eUhSIYyqsmVmPZ5O1+BDNDkOCbZGfy1St6mNhAoGBAPOmJIVUSm5FY/lJNXjHnaaqVU/45UXU/psfNWuT/k+ivkuZxsckEpJIxwnsvrCCk+/Hi8HsnIywc5kRkD+fO+ImopNifNH+090LoHqKan0bagsK16yTcQq+opmQZJ9K9FtCJyA4N4MEQFoy6yMh6hpaBzTGaInsrHlmRm338sZRAoGBAL6v9VRhSPIksWEbcHURHDCLsTBxUHKu+nzkLQFOsS8TWv08BnkM0cW9d0geYFHCgR2+8kRvQDAxhhpIAcXgd+ZXqUcMOnf2Vz6JHmuNKoVS8yJEDFbx5PO0RP2cK5R8Lon3W2XD7ZXQ4BqdLWBR+sbb+FHjmtctFabqHSXnjkMbAoGAWJI9FHrf09ZF0YlbdtyZ4sxo1vmT3x7er2VY9hKGkEyJANKWAC6M0cDDGkiFyYSuYqwXkheBkWNTooFP/tDT5BJHZ2yWE4CfY+umGuXWcERW+EyouoOexFkoospqyb1ltwcFUiEdjPMusZtw/wSFJa80j2rQ9dKjoD4dvDw2dQECgYEAtUrNUB/+HllMWyqfTG2sA2uMVqYk+iPp+ntlXmzWgA9C3qgG72eEuR9dHK/km1b1Mrar1ux+dlNfT/VN2jeDRvfo9Kdnn04RvF7ZER/xYThv+BACO1dXeWvWe9fShyVZicomlyYj59/icOsmjQDkD9RqzlA6koFGqJ7Ef5ka5CkCgYEAsyCUQjgxLB4R0WHrNQwq/b0MJ5iVuskDnbdxXeNT9R/ya+/YoWOFyvhVraFXpvSVIz+43LBcVwS1hHA7f12d1YXXktNRCQIJ+kZqStz7sJxHbfVSFwaztBcJjLyZnRIv0LBDLccfBYEFhBWq6GPJBhDSO2kuoPn7dWagosK7Mio=
        appsecret: '', // appsecret  （type=1传）      示例值:
        return_url: '', // 同步通知地址 （type=2传）      示例值:http://goyojo.com
        apiv3key: '', // V3秘钥 （type=1传）      示例值:
        merchantid: '', // 商户号 （type=1传）      示例值:
        merchantSerialNumber: '', // 商户API证书序列号 （type=1传）      示例值:
        mome: '', // 描述      示例值:支付宝
        status: 1,
    },
})

const rules = reactive<FormRules>({
    name: [{ required: true, whitespace: true, message: '必填项不能为空', trigger: 'blur' }],
    appid: [{ required: true, whitespace: true, message: '必填项不能为空', trigger: 'blur' }],
    notify_url: [{ required: true, whitespace: true, message: '必填项不能为空', trigger: 'blur' }],
    public_key: [{ required: true, whitespace: true, message: '必填项不能为空', trigger: 'blur' }],
    private_key: [{ required: true, whitespace: true, message: '必填项不能为空', trigger: 'blur' }],
    appsecret: [{ required: true, whitespace: true, message: '必填项不能为空', trigger: 'blur' }],
    return_url: [{ required: true, whitespace: true, message: '必填项不能为空', trigger: 'blur' }],
    apiv3key: [{ required: true, whitespace: true, message: '必填项不能为空', trigger: 'blur' }],
    merchantid: [{ required: true, whitespace: true, message: '必填项不能为空', trigger: 'blur' }],
    merchantSerialNumber: [{ required: true, whitespace: true, message: '必填项不能为空', trigger: 'blur' }],
    // link_url: [
    //     // { required: true, message: '必填项不能为空', trigger: 'blur' },
    //     { pattern: /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/, message: '链接地址格式不正确，请输入完整的链接地址', trigger: 'blur' }
    // ],
})

const getPayData = async () => {
    const res = await ShopPayApi.info({ id: props.type })
    if (res.code != 200) {
        ElMessage.error(res.msg)
        return {} as ShopPayApi_InfoResponse
    }

    defData.payData = res.data as ShopPayApi_InfoResponse

    const propsData = defData.payData
    form.data.id = propsData.id
    form.data.name = propsData.name
    form.data.type = Number(propsData.type) as 1 | 2
    form.data.appid = propsData.appid
    form.data.appsecret = propsData.appsecret
    form.data.notify_url = propsData.notify_url
    form.data.return_url = propsData.return_url
    form.data.public_key = propsData.public_key
    form.data.private_key = propsData.private_key
    form.data.apiv3key = propsData.apiv3key
    form.data.merchantid = propsData.merchantid
    form.data.merchantSerialNumber = propsData.merchantSerialNumber
    form.data.mome = propsData.mome
    form.data.status = propsData.status
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

    const param: ShopPayApi_Edit = {
        name: form.data.name,
        type: form.data.type,
        appid: form.data.appid,
        notify_url: form.data.notify_url,
        public_key: form.data.public_key,
        private_key: form.data.private_key,
        appsecret: form.data.appsecret,
        return_url: form.data.return_url,
        apiv3key: form.data.apiv3key,
        merchantid: form.data.merchantid,
        merchantSerialNumber: form.data.merchantSerialNumber,
        mome: form.data.mome,
        status: form.data.status ? 1 : 0,
        id: form.data.id,
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
