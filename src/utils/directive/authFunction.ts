import { useUserState } from '@/stores/user'
import { judgmentSameArr } from '@/utils/arrayOperation'

/**
 * 单个权限验证
 * @param value 权限值
 * @returns 有权限，返回 `true`，反之则反
 */
export function auth(value: string): boolean {
    const stores = useUserState()
    return stores.userInfo.authBtnList.includes(value)
}

/**
 * 多个权限验证，满足一个则为 true
 * @param value 权限值
 * @returns 有权限，返回 `true`，反之则反
 */
export function auths(value: Array<string>): boolean {
    let flag = false
    const stores = useUserState()
    stores.userInfo.authBtnList.map((val: string) => {
        value.map((v: string) => {
            if (val === v) flag = true
        })
    })
    return flag
}

/**
 * 多个权限验证，全部满足则为 true
 * @param value 权限值
 * @returns 有权限，返回 `true`，反之则反
 */
export function authAll(value: Array<string>): boolean {
    const stores = useUserState()
    return judgmentSameArr(value, stores.userInfo.authBtnList)
}
