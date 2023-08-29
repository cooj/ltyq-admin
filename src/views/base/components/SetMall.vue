<template>
    <el-form ref="formRef" :model="form" label-width="130px" :rules="rules" status-icon>
        <el-tabs v-model="defData.active" class="w100%">
            <el-tab-pane label="商城信息" name="1">
                <el-row>
                    <el-col :xs="24" :sm="20" :md="18" :lg="14" :xl="14" class="mb18px">
                        <el-form-item prop="shop_name" label="商城名称：">
                            <el-input v-model="form.shop_name" maxlength="80" clearable />
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="20" :md="18" :lg="14" :xl="14" class="mb18px">
                        <el-form-item prop="shop_title" label="商城标题：">
                            <el-input v-model="form.shop_title" maxlength="80" clearable />
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="20" :md="18" :lg="14" :xl="14" class="mb18px">
                        <el-form-item prop="seo_keywords" label="关键字：">
                            <el-input v-model="form.seo_keywords" maxlength="80" clearable />
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="20" :md="19" :lg="19" :xl="19" class="mb18px">
                        <el-form-item prop="shop_describe" label="商城描述：">
                            <el-input v-model="form.shop_describe" type="textarea" show-password maxlength="180"
                                clearable />
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="18" :md="14" :lg="12" :xl="12" class="mb18px">
                        <el-form-item prop="sale_tel" label="售后电话：">
                            <el-input v-model="form.sale_tel" maxlength="80" clearable />
                        </el-form-item>
                    </el-col>
                    <el-col :xs="0" :sm="0" :md="10" :lg="12" :xl="12" class="mb18px" />
                    <el-col :xs="24" :sm="20" :md="18" :lg="14" :xl="12" class="mb18px">
                        <el-form-item prop="filings" label="ICP备案证书号：">
                            <el-input v-model="form.filings" maxlength="60" clearable />
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="20" :md="18" :lg="14" :xl="14" class="mb18px">
                        <el-form-item prop="filings_url" label="备案地址：">
                            <el-input v-model="form.filings_url" maxlength="60" clearable />
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="20" :md="18" :lg="14" :xl="14" class="mb18px">
                        <el-form-item prop="copyright" label="版权所有：">
                            <el-input v-model="form.copyright" maxlength="60" clearable />
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="20" :md="18" :lg="14" :xl="14" class="mb18px">
                        <el-form-item prop="hot" label="热门搜索：">
                            <el-input v-model="form.hot" maxlength="80" placeholder="商城热门搜索关键字" clearable />
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="20" :md="6" :lg="10" :xl="10" class="mb18px">
                        <el-form-item label="" label-width="auto">
                            <span class="pl5px text-12px c-#888">多个请用英文逗号隔开</span>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="20" :md="18" :lg="14" :xl="14" class="mb18px">
                        <el-form-item prop="user_promulgate" label="用户中心公告：">
                            <el-input v-model="form.user_promulgate" placeholder="该信息将在用户中心欢迎页面显示" />
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="10" :md="10" :lg="12" :xl="12" class="mb18px">
                        <el-form-item prop="work_time" label="上班时间：">
                            <el-input v-model="form.work_time" maxlength="60" clearable />
                            <!-- <el-time-picker v-model="form.work_time" is-range arrow-control range-separator="To"
                                start-placeholder="开始时间" end-placeholder="结束时间" /> -->
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="20" :md="18" :lg="16" :xl="14" class="mb18px">
                        <el-form-item prop="shop_promulgate" label="商城公告：">
                            <el-input v-model="form.shop_promulgate" type="textarea"
                                placeholder="以上内容将显示在首页商店公告中注意控制内容长度不能超过公告显示区域大小。" />
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb18px">
                        <el-form-item prop="logon_status" label="是否关闭注册：">
                            <el-switch v-model="form.logon_status" inline-prompt active-text="是" inactive-text="否"
                                :active-value="1" :inactive-value="0" />
                            <span class="color-info ml10px">{{ form.logon_status ? '注册关闭中...' : '' }}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb18px">
                        <el-form-item prop="shop_status" label="暂时关闭网站：">
                            <el-switch v-model="form.shop_status" inline-prompt active-text="是" inactive-text="否"
                                :active-value="1" :inactive-value="0" />
                            <span class="color-info ml10px">{{ form.shop_status ? '网站关闭中...' : '' }}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="20" :md="20" :lg="16" :xl="16" class="mb18px">
                        <el-form-item prop="status_cause" label="关闭网站原因：">
                            <el-input v-model="form.status_cause" type="textarea" show-password maxlength="180" clearable />
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-tab-pane>
            <el-tab-pane label="底部内容" name="2">
                <el-form-item prop="footer_content" label="底部内容：">
                    <BaseTinymce v-model:value="form.footer_content" />
                </el-form-item>
            </el-tab-pane>
            <el-tab-pane label="logo图标" name="3">
                <el-form-item prop="shop_logo" label="商城logo：">
                    <UploadFile v-model="form.shop_logo" />
                </el-form-item>
                <el-form-item prop="small_logo" label="小图logo：">
                    <UploadFile v-model="form.small_logo" />
                </el-form-item>
                <el-form-item prop="wx_code" label="公众号二维码：">
                    <UploadFile v-model="form.wx_code" />
                </el-form-item>
                <el-form-item prop="ico_img" label="ico图标：">
                    <UploadFile v-model="form.ico_img" />
                </el-form-item>
            </el-tab-pane>
            <el-tab-pane label="网站服务协议" name="4">
                <el-form-item prop="agreement" label="网站服务协议">
                    <BaseTinymce v-model:value="form.agreement" />
                </el-form-item>
            </el-tab-pane>
            <el-tab-pane label="隐私政策" name="5">
                <el-form-item prop="policy" label="隐私政策">
                    <BaseTinymce v-model:value="form.policy" />
                </el-form-item>
            </el-tab-pane>
        </el-tabs>
        <el-form-item class="mt10px">
            <el-button type="primary" @click="submitForm()">
                确定
            </el-button>
            <el-button @click="resetForm">
                重置
            </el-button>
        </el-form-item>
    </el-form>
</template>

<script setup lang="ts">
import { inject, reactive, ref, watch } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import { ShopBaseApi } from '@/api/shop/base'
import { verifyFormData } from '@/utils/element/form'
import BaseTinymce from '@/components/base/BaseTinymce.vue'

const props = defineProps<{
    data: ShopBaseApi_getBaseResponse
}>()

const initData = inject<() => void>('initData')
const defData = reactive({
    active: '1',
})

const formRef = ref<FormInstance>()
const form = reactive({
    shop_name: '', // 商城名称
    shop_title: '', // 商城标题
    shop_describe: '', // 商城描述
    shop_status: 1, // 暂时关闭网站 0关闭 1开启
    status_cause: '', // 关闭网站原因
    user_promulgate: '', // 用户中心公告
    shop_promulgate: '', // 商城公告
    logon_status: 1, // 关闭注册 0关闭 1开启
    shop_logo: '', // 商城Logo
    small_logo: '', // 小图logo
    sale_tel: '', // 售后电话
    filings: '', // ICP备案证书号
    wx_code: '', // 公众号二维码
    filings_url: '', // 备案地址
    copyright: '', // 版权所有
    work_time: '', // 上班时间
    seo_keywords: '', // 关键字
    footer_content: '', // 底部内容
    ico_img: '', // 小图标
    policy: '', // 隐私政策
    agreement: '', // 网站服务协议
    hot: '', // 热门搜索
})

// 规则
const rules = reactive<FormRules>({
    shop_name: [{ required: true, message: '商城名称是必填项' }],
    shop_title: [{ required: true, message: '商城标题是必填项' }],
    // shop_describe: [{ required: true, message: '商城描述是必填项' },],
})

// 初始化数据
const initDefaultData = async () => {
    if (!props.data) return
    const propsData = props.data
    form.filings = propsData.filings
    form.shop_name = propsData.shop_name
    form.shop_title = propsData.shop_title
    form.seo_keywords = propsData.seo_keywords || ''
    form.shop_describe = propsData.shop_describe
    form.shop_status = Number(propsData.shop_status)
    form.status_cause = propsData.status_cause
    form.shop_promulgate = propsData.shop_promulgate
    form.user_promulgate = propsData.user_promulgate
    form.logon_status = Number(propsData.logon_status)
    form.shop_logo = propsData.shop_logo
    form.small_logo = propsData.small_logo
    form.sale_tel = propsData.sale_tel
    form.wx_code = propsData.wx_code
    form.filings_url = propsData.filings_url
    form.copyright = propsData.copyright
    form.work_time = propsData.work_time
    form.footer_content = propsData.footer_content
    form.ico_img = propsData.ico_img
    form.agreement = propsData.agreement
    form.policy = propsData.policy
    form.hot = propsData.hot
}

// 确定
const submitForm = async () => {
    const isRun = await verifyFormData(formRef.value)
    if (!isRun) return

    const data: ShopBaseApi_GetMallInf = {
        shop_name: form.shop_name,
        shop_title: form.shop_title,
        shop_describe: form.shop_describe,
        shop_status: form.shop_status as 0 | 1,
        status_cause: form.status_cause,
        shop_logo: form.shop_logo,
        user_promulgate: form.user_promulgate,
        shop_promulgate: form.shop_promulgate,
        logon_status: form.logon_status as 0 | 1,
        small_logo: form.small_logo,
        sale_tel: form.sale_tel,
        wx_code: form.wx_code,
        filings: form.filings,
        filings_url: form.filings_url,
        copyright: form.copyright,
        work_time: form.work_time,
        footer_content: form.footer_content,
        seo_keywords: form.seo_keywords,
        ico_img: form.ico_img,
        agreement: form.agreement,
        policy: form.policy,
        hot: form.hot,
    }
    const res = await ShopBaseApi.getMallInf(data)
    if (res.code != 200) return ElMessage.error(res.msg)
    ElMessage.success('提交成功')

    initData?.() // 更新数据
    defData.active = '1'
}

// 重置
const resetForm = async () => {
    // formRef.value?.resetFields();
    initDefaultData()
}

// 监听，
watch(() => props.data, (newVal) => {
    initDefaultData()
})
</script>

<style lang="scss" scoped></style>
