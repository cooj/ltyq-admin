/**
 * 客户、供应商去除资金来往大类别
 * @param row 数组对象
 * @param text 需要返回文字的字段
 * @returns
 */
export function filterCustomVendor<T extends object, K extends keyof T>(row: T[], text: 'custom' | 'vendor'): T[] {
    const id = 'id' as K
    let aid = 201
    if (text == 'custom') aid = 301
    const arr = row.filter(item => item[id] !== aid)
    return arr
}

/**
 * 设置商品名称
 * @param item goods_name:商品名，goods_code:商品型号，goods_spec:商品规格，title：标题,goods_brand:品牌
 * @returns
 * @example
    setGoodsName({
        goods_name: '商品',
        goods_code: 'HV-1000s',
        goods_spec: '编码器测量',
        title: '商品商品商品商品商品',
        goods_brand: '百度',
    })
 */
export function setGoodsName(item: {
    goods_name: string
    goods_code: string
    goods_spec: string
    title: string
    goods_brand: string
}, noJoin = false) {
    if (noJoin) return item.goods_name
    // '【' + item.goods_brand + '】'
    const textArr = [item.goods_brand, item.goods_name]
    if (item.goods_code) textArr.push(item.goods_code)
    if (item.goods_spec) textArr.push(item.goods_spec)
    if (item.title) textArr.push(item.title)
    return textArr.join(' ')
}

/**
 * 改变公司分组id
 * @param data 数据
 * @param str 需要追加的字符，默认使用字符'*'
 * @param key 需要改变字符的键名，默认为id
 * @param children 子类集合的键名，默认为children
 * @returns
 */
export function changCompanyGroup<T extends object, K extends keyof T>(data: T[], str = '*', key = 'id' as K, children = 'children' as keyof T): T[] {
    const result = data.map((item: any) => {
        item[key] = str + item[key]
        return item
    })
    return result
}

/**
 * 公司分组id 改成新的id或者改回原来id
 * @param val 需要改变的值
 * @param str 需要追加或者移除的字符，默认使用字符'*'
 * @returns
 */
export function changeCompanyGroupId(val: number | string, clear = true, str = '*') {
    if (!val) return ''
    val = val.toString()
    const index = val.indexOf(str)
    if (clear) {
        if (index === 0) return val.substring(1)
        return val
    } else {
        if (index === 0) return val
        return str + val
    }
}

/**
 * 前台跳转地址设置
 * @param {string} url  跳转的地址或页面名称
 * @returns
 */
export const setHomeUrl = (url: string) => {
    let host = import.meta.env.VITE_HOME_URL
    // 以/开头的URL处理，以/结尾的URL不做处理。
    const startReg = /^\//; const endReg = /\/$/

    host = endReg.test(host) ? host : `${host}/`

    const newUrl = startReg.test(url) ? url.substring(1) : url

    return host + newUrl
}
