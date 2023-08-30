import { post } from '@/utils/http/request'

/**
 * 后端控制菜单,菜单api
 * @method getList 获取菜单列表
 * @method add 添加菜单
 * @method edit 修改菜单
 * @method del 修改菜单
 * @method getAdminMenu 取得权限菜单
 */

export const MenuApi = {
    // 获取菜单列表
    getList: (data?: MenuApi_List) => post<MenuApi_ListResponse>('/api/menu/get_list', data),

    // 添加菜单
    add: (data: MenuApi_Add) => post('/api/menu/add_menu', data),

    /**
     * 修改菜单
     * @param data
     * @returns
     */
    edit: (data: MenuApi_Edit) => post('/api/menu/edit_menu_submit', data),

    /**
     * 删除菜单
     * @param data menu_id
     * @returns
     */
    del: (data: { menu_id: number }) => post('/api/menu/delete_menu', data),

    // 取得权限菜单
    getAdminMenu: () => post<MenuApi_ListAdminResponse>('/api/admin/get_menu'),

}
