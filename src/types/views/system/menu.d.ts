// import { RouteRecordRaw } from "vue-router";

// api接口  //////////////////////////
/**
 * 菜单列表 - 请求参数
 */
declare interface MenuApi_List extends ListPage {
    keyword?: string;     // 关键词搜索      示例值:
}

/**
 * 菜单列表 - 响应数据
 */
declare interface MenuApi_ListResponse {
    "menu_list": MenuApi_MenuItem[]
}
declare interface MenuApi_MenuItem {
    "id": number,    // 菜单id           1
    "pid": number,   // 上级id           0
    "pid_arr": "",
    "title": string,    // 菜单名称     订单管理
    "level": number,     // 层级        1
    "page_path": string,    // 视图路径   
    "route_path": string,    // 路由路径        /order 
    "route_name": string,      // 路由name      orderIndex
    "redirect": string,     // 重定向       /order/list
    "is_link": 0 | 1;        // 是否外链      示例值:0
    "link_url": string,           // 外链地址      示例值:
    "is_hide": 0 | 1;   // 是否隐藏      示例值:0
    "is_affix": 0 | 1;      // 是否固定      示例值:0
    "is_iframe": 0 | 1;     // 是否内嵌      示例值:0
    "icon": string,        // 菜单图标      fa fa-file-text
    "sort": number,        // 排序      1
    "menu_type": number,      // 菜单类型       1
    "created_at": number,      // 创建时间      1655950359
    is_keep_alive: 0 | 1;     // 是否缓存 0不缓存  1缓存      示例值:0
    api_path?: string;   // api接口地址
    "children": MenuApi_MenuItem[]
}

/**
 * 新增（修改）菜单 - 请求参数
 */
declare interface MenuApi_Add {
    menuType: number;     // 菜单类型 1菜单， 2按钮      示例值:1
    menuPid: string;     // 上级ID      示例值:3
    component: string;     // 视图路径      示例值:/test/index
    sort: number;     // 菜单排序 （倒序）      示例值:1
    path: string;     // 路由路径      示例值:/test/index2
    redirect: string;     // 路由重定向，一级菜单默认定位页面      示例值:/test/index
    title: string;     // 菜单名称      示例值:测试菜单2
    icon: string;     // 菜单图标      示例值:fa fa-file-text
    isHide: 0 | 1;     // 是否隐藏      示例值:0
    isAffix: 0 | 1;     // 是否固定      示例值:0
    isLink: 0 | 1;     // 是否外链      示例值:0
    linkUrl: string;     // 外链地址      示例值:
    isIframe: 0 | 1;     // 是否内嵌      示例值:0
    isKeepAlive: 0 | 1;     // 是否缓存 0不缓存  1缓存      示例值:0
    api_path: string;         // 接口地址       示例值:/test/index3 - 必须保持一致！！！ （可选
}

/**
 * 修改菜单 - 请求参数
 */
declare interface MenuApi_Edit extends MenuApi_Add {
    id: number;    // 当前菜单id
}

/**
 * 权限菜单列表 - 响应数据
 */
declare interface MenuApi_ListAdminResponse {
    "menu": MenuApi_MenuItem[]
}

/**
 * 获取菜单显示数量 - 响应数据
 */
declare interface MenuApi_MenuNumberResponse {
    "id": number, //菜单id      41
    "num": number //数量        20
}












// 页面 ///////////////////////////////////////////////


declare interface MenuVueRouteItem {
    path: string,  // 菜单路径，用于跳转        /home
    name: string,    // 菜单 name，用于界面 keep-alive 路由缓存。此 name 需要与 component 组件中的 name 值相同（唯一）          home
    component: any,    // 组件路径          () => import('/@/views/home/index.vue')
    redirect: string,   //重定向        /HomeIndex
    meta: {// 附加自定义数据
        title: string,// 菜单标题
        isLink: string,             //菜单外链链接 开启外链条件，`1、isLink: true 2、链接地址不为空（meta.isLink） 3、isIframe: false`
        linkUrl: string,  //外链地址
        isHide: 0 | 1,// 菜单是否隐藏（菜单不显示在界面，但可以进行跳转）
        isKeepAlive: 0 | 1,// 菜单是否缓存
        isAffix: 0 | 1,// 菜单是否固定（固定在 tagsView 中，不可进行关闭），右键菜单无 `关闭` 项
        isIframe: 0 | 1,//是否内嵌 开启条件，`1、isIframe: true 2、链接地址不为空（meta.isLink）`
        // 当前路由权限标识，取角色管理。控制路由显示、隐藏。超级管理员：admin 普通角色：common
        // 之前 auth 取用户（角色下有多个用户）
        roles: ['admin', 'common'],
        icon: string,   //菜单图标              iconfont icon-home
        id: number,  //菜单id（唯一标识）
    },
    children: MenuVueRouteItem[]
}