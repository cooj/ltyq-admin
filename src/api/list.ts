import { post } from '@/utils/http/request'

// 获取轮播图列表
export const getBannerList = (data?: IBannerGetList) => post<IBannerGetListResponse>('/api/banner/get_list', data)
// 添加轮播图
export const setBannerAdd = (data: IBannerAdd) => post('/api/banner/add', data)
// 修改轮播图
export const setBannerUpdate = (data: IBannerEdit) => post('/api/banner/edit', data)
// 删除轮播图
export const setBannerDelete = (data: { id: number }) => post('/api/banner/delete', data)

// 、、、   ///
// 获取商品列表
export const getGoodsList = (data?: IBannerGetList) => post<IBannerGetListResponse>('/api/goods/get_list', data)
// 添加商品
export const setGoodsAdd = (data: IBannerAdd) => post('/api/goods/add', data)
// 修改商品
export const setGoodsUpdate = (data: IBannerEdit) => post('/api/goods/edit', data)
// 删除商品
export const setGoodsDelete = (data: { id: number }) => post('/api/goods/delete', data)

// 获取关于我们、联系我们信息
export const getOtherInfo = (data: { type: number }) => post<IOtherInfoResponse | null>('/api/other/info', data)
// 更新关于我们、联系我们信息
export const setOtherInfoUpdate = (data: IOtherInfoUpdate) => post('/api/other/edit', data)
