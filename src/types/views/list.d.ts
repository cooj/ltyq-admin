

/**
 * 轮播图列表 - 响应数据
 */
declare interface IBannerGetList extends ListPage {
    type: 1 | 2,   // 1:轮播图 2：友情链接
}


/**
 * 轮播图列表 - 响应数据
 */
declare interface IBannerGetListResponse extends ListTotal {
    list: {
        id: number,
        title: string,  // 标题
        title_en: string,  // 标题
        img: string; // 图片地址
        href: string; // 链接地址
        sort: number;    // 排序
        type: number;    // 类型 1:轮播图，2：友情链接
        isHide: boolean; //是否隐藏
    }[]
}

/**
 * 新增轮播图 - 请求参数
 */
declare interface IBannerAdd {

    title: string,  // 标题
    title_en: string,  // 标题
    img: string; // 图片地址
    href: string; // 链接地址
    sort: number;    // 排序
    isHide: boolean; //是否隐藏
    type: number;    // 类型 1:轮播图，2：友情链接
}


/**
 * 修改轮播图 - 请求参数
 */
declare interface IBannerEdit extends IBannerAdd {
    id: number;  // 轮播图ID
}



/**
 * 关于我们、联系我们 - 响应数据
 */
declare interface IOtherInfoResponse {

    id: number,
    title: string,  // 标题
    title_en: string,  // 标题
    img: string; // 图片地址

    content: string; // 内容
    content_en: string; // 内容

    type: number;    // 类型 1:关于我们，2：联系我们


}



/**
 * 修改关于我们、联系我们 - 响应数据
 */
declare interface IOtherInfoUpdate {

    // id?: number,
    title?: string,  // 标题
    title_en?: string,  // 标题
    img: string; // 图片地址

    content: string; // 内容
    content_en: string; // 内容

    type: number;    // 类型 1:关于我们，2：联系我们


}


