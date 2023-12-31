// // 字体图标 url
// const cssCdnUrlList: Array<string> = [
//     '//at.alicdn.com/t/font_2298093_y6u00apwst.css',
//     '//netdna.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css',
// ];
// // 第三方 js url
// const jsCdnUrlList: Array<string> = [];

// 动态批量设置字体图标
export function setCssCdn(cssCdnUrlList: Array<string> = []) {
    if (cssCdnUrlList.length <= 0) return false
    cssCdnUrlList.map((v) => {
        const link = document.createElement('link')
        link.rel = 'stylesheet'
        link.href = v
        link.crossOrigin = 'anonymous'
        document.getElementsByTagName('head')[0].appendChild(link)
    })
}

// 动态批量设置第三方js
export function setJsCdn(jsCdnUrlList: Array<string> = []) {
    if (jsCdnUrlList.length <= 0) return false
    jsCdnUrlList.map((v) => {
        const link = document.createElement('script')
        link.src = v
        document.body.appendChild(link)
    })
}

/**
 * 批量设置字体图标、动态js
 * @method cssCdn 动态批量设置字体图标
 * @method jsCdn 动态批量设置第三方js
 */
const setIntroduction = {
    // 设置css
    cssCdn: (arr?: string[] | undefined) => setCssCdn(arr),
    // 设置js
    jsCdn: (arr: string[] = []) => setJsCdn(arr),
}

// 导出函数方法
export default setIntroduction
