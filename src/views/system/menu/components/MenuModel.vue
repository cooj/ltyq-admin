<template>
    <co-drawer v-model="defData.visible" :title="comData.title" size="30%" @close="onClose" @cancel="onClose"
        @confirm="onConfirm">
        <el-form ref="formRef" :model="form.data" :rules="rules" label-width="90px">
            <el-tabs v-model="lang">
                <el-tab-pane label="中文" name="cn" />
                <el-tab-pane label="英文" name="en" />
            </el-tabs>

            <el-form-item label="上级菜单" prop="p_id">
                <my-cascader v-model="form.data.p_id" class="w100%" :options="defData.routeArr"
                    :props="{ checkStrictly: true, value: 'id', label: 'title', disabled: 'a_disable' }"
                    placeholder="请选择上级菜单" />
            </el-form-item>
            <el-form-item v-if="lang === 'cn'" label="菜单名称" prop="title">
                <el-input v-model="form.data.title" maxlength="20" placeholder="请输入菜单名称" clearable />
            </el-form-item>

            <el-form-item v-else label="英文菜单名称" prop="title_en">
                <el-input v-model="form.data.title_en" maxlength="30" placeholder="请输入英文菜单名称" clearable />
            </el-form-item>
            <el-form-item label="链接地址" prop="href">
                <el-input v-model="form.data.href" maxlength="200" placeholder="" clearable />
            </el-form-item>
            <el-form-item label="排序">
                <el-input-number v-model="form.data.sort" :min="0" :max="10000" controls-position="right" placeholder=""
                    class="w100%" />
            </el-form-item>
        </el-form>
    </co-drawer>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import { inject, onMounted, reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import IconSelector from '@/components/icon/IconSelect.vue'
import { MainPage } from '@/router/layout'
import { deepClone } from '@/utils/other'
import { getParentId } from '@/utils/common/tree'
import { formErrorMessage, verifyFormData } from '@/utils/element/form'
import { MenuApi } from '@/api/system/menu'
import { useLoadingSubmit } from '@/hooks/useLoadingSubmit'

const emits = defineEmits<{
    update: []
}>()

const reloadTable = inject<() => void>('reloadTable')
const lang = ref<LanguageType>('cn')
const defData = reactive({
    visible: false, // 弹窗显示
    menuData: [], // 上级菜单数据
    ready: false,
    routeArr: [] as MenuApi_MenuItem[],
    componentList: MainPage,
    type: 1,
})
const formRef = ref<FormInstance>()
// 参数请参考 `/src/router/route.ts` 中的 `dynamicRoutes` 路由菜单格式
const formData = reactive({
    menuPidArr: [] as string[],
    menuType: 1, // 菜单类型
    name: '', // 路由名称
    component: '', // 组件路径
    sort: 0, // 菜单排序
    path: '', // 路由路径
    redirect: '', // 路由重定向，有子集 children 时
    title: '', // 菜单名称
    icon: '', // 菜单图标
    isHide: 0 as 0 | 1, // 是否隐藏
    isKeepAlive: 0 as 0 | 1, // 是否缓存
    isAffix: 0 as 0 | 1, // 是否固定
    isLink: 0 as 0 | 1, // 是否外链
    linkUrl: '', // 外链/内嵌时链接地址（http:xxx.com），开启外链条件，`1、isLink: 链接地址不为空`
    isIframe: 0 as 0 | 1, // 是否内嵌，开启条件，`1、isIframe:true 2、isLink：链接地址不为空`
    roles: '', // 权限标识，取角色管理
    btnPower: '', // 菜单类型为按钮时，权限标识
    api_path: '', // api接口地址
})

const form = reactive({
    data: {
        id: 0,
        p_id: '' as '' | number, //
        title: '', // 菜单名称
        title_en: '', // 菜单名称（英文）
        href: '', // 链接地址
        sort: 0, // 排序

    },
})

// 验证为空时
const validateEmpty = (rule: any, value: any, callback: any) => {
    if (value.trim() === '') {
        return callback(new Error('必填项不能为空'))
    }
    return callback() // *验证成功的地方必须callback()
}
const validatePath = (rule: any, value: any, callback: any) => {
    const defaultRoute = ['/404', '/401', '/login']
    if (defaultRoute.includes(value)) {
        // ElMessage.error(value + '为默认使用的路由,请换一个')
        return callback(new Error(`${value}为默认使用的路由,请换一个`))
    }
    return callback() // *验证成功的地方必须callback()
}
const rules = reactive<FormRules>({
    title: [ // 菜单名称
        { required: true, message: '必填项不能为空', trigger: 'blur' },
        { validator: validateEmpty, trigger: 'blur' },
    ],
    name: [
        { required: true, pattern: /^[0-9a-zA-Z]+$/, message: '只能输入数字和英文', trigger: 'blur' },
    ],
    path: [
        { pattern: /^(\/([A-Za-z0-9_-]+))+$/, message: '以/开头,后面为字母或数字,不能有空格', trigger: 'blur' },
        { validator: validatePath, trigger: 'blur' },
        // { required: true, pattern: /^\/[A-Za-z0-9_-]+$/, message: '以/开头，后面为字母或数字，/只能出现一次', trigger: 'blur' },
        // {
        //     validator: (rule: any, value: any, callback: any) => {
        //
        //         let len = value.match(/\//igm).length

        //         if (len > 1) {
        //             callback(new Error('/只能出现一次'))
        //         } else {
        //             if (formData.paths !== '') {
        //                 formRef.value?.validateField('paths', () => null)
        //             }
        //             callback()
        //         }
        //     }, trigger: 'blur'
        // },
    ],
    component: [ // 视图路径
        { required: true, message: '必填项不能为空', trigger: 'blur' },
        { validator: validateEmpty, trigger: 'blur' },
    ],
    redirect: [
        { pattern: /^(\/([A-Za-z0-9_-]+))+$/, message: '以/开头,后面为字母或数字,不能有空格', trigger: 'blur' },
    ],

})

const comData = computed(() => {
    if (defData.type === 1) return { title: '新增用户' }
    return { title: '修改用户' }
})

const initDefaultData = async () => {
    if (defData.ready) return

    defData.ready = true
}

// 组件选中时
const choseComponent = () => {
    if (formData.component === 'layout/routerView/parent') return
    const node = MainPage.find(item => item.value === formData.component)

    if (!formData.title) formData.title = node?.title || ''
    if (!formData.path) formData.path = node?.name ? `/${node?.name}` : ''
}

// 组件过滤
const filterComponent = (str: string) => {
    const query = str?.trim() ?? ''
    if (query) {
        defData.componentList = MainPage.filter((item) => {
            if (item.value.toLowerCase().includes(query)) {
                return true
            } else if (item.title.toLowerCase().includes(query)) {
                return true
            } else {
                return false
            }
        })
    } else {
        defData.componentList = MainPage
    }
}

// 打开弹窗
const openDialog = async (row?: MenuApi_MenuItem) => {
    // formData.menuPidArr = row?.id ? getParentId(props.data, row.id, 'id') as unknown as string[] : []

    // const arr = deepClone(props.data)
    // defData.routeArr = arr

    await initDefaultData()
    defData.visible = true
}
// 关闭弹窗
const closeDialog = () => {
    formRef.value?.resetFields()
    defData.visible = false
}
// 是否内嵌下拉改变
const onSelectIframeChange = () => {
    if (formData.isIframe) formData.isLink = 1
    else formData.isLink = 0
}
// 取消
const onCancel = () => {
    closeDialog()
}

const [ApiFunc, btnLoading] = useLoadingSubmit()
// 新增
const onSubmit = async () => {
    const isRun = await formRef.value?.validate((valid, fields) => valid ? true : formErrorMessage(fields))
    if (!isRun) return

    const data: MenuApi_Add = {
        menuType: formData.menuType, // 菜单类型'menu' or 'btn'
        menuPid: formData.menuPidArr.join(','),
        component: formData.component,
        sort: formData.sort,
        path: formData.path,
        redirect: formData.redirect,
        title: formData.title,
        icon: formData.icon,
        isHide: formData.isHide,
        isKeepAlive: formData.isKeepAlive,
        isAffix: formData.isAffix,
        isLink: formData.isLink,
        linkUrl: formData.linkUrl,
        isIframe: formData.isIframe,
        api_path: formData.api_path?.trim() ?? '',
    }
    const res = await ApiFunc(MenuApi.add(data))
    if (res.code !== 200) return ElMessage.error(res.msg)

    ElMessage.success('添加成功')

    closeDialog()
    reloadTable?.() // 刷新列表
}

const onReset = () => {
    formRef.value?.resetFields() // 清空表单
}

// 关闭弹窗
const onClose = () => {
    defData.visible = false
    onReset()
}

// 确定
const onConfirm = useThrottleFn(async () => {
    const isRun = await verifyFormData(formRef.value)
    if (!isRun) return

    // const data: UserApi_Add = {
    //     account: form.data.account.trim(),
    //     password: form.data.password.trim(),
    //     username: form.data.name.trim(),
    //     status: form.data.status,
    // }

    // if (defData.type === 1) {
    //     const res = await ApiFunc(UserApi.add(data))
    //     if (res.code !== 200) return ElMessage.error(res.msg)
    //     ElMessage.success('添加成功')
    // } else {
    //     const param: UserApi_Edit = {
    //         ...data,
    //         id: form.data.id,
    //     }
    //     // 是否填了密码
    //     if (form.data.new_password) {
    //         param.password = form.data.new_password
    //     }

    //     const res = await ApiFunc(UserApi.edit(param))
    //     if (res.code !== 200) return ElMessage.error(res.msg)
    //     ElMessage.success('修改成功')
    // }

    emits('update') // 重新加载列表
    onClose() // 关闭弹窗
}, 800)

// 页面加载时
onMounted(async () => {

})

defineExpose({
    openDialog,
})
</script>

<style lang="scss" scoped>
.comp-box {
    display: flex;
    justify-content: space-between;
    padding: 0 20px;

    em {
        color: var(--el-text-color-secondary);
        font-size: 13px;
    }
}
</style>
