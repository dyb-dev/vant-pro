/*
 * @Author: dyb-dev
 * @Date: 2024-09-09 00:07:29
 * @LastEditors: v_zhgtzhong
 * @LastEditTime: 2025-08-01 00:34:34
 * @FilePath: /vant-pro/src/utils/tool.ts
 * @Description: 常用工具函数
 */

/** 任意函数类型声明 */
type TFuncType = (...args: any[]) => void

/**
 * FUN: 创建防抖函数
 *
 * @author dyb-dev
 * @date 18/08/2024/  17:04:51
 * @param {TFuncType} fn - 需要防抖的函数
 * @param {number} wait - 防抖时间
 * @param {boolean} [immediate=false] - 是否立即执行
 * @returns {*}  {TFuncType} - 防抖函数
 */
export const debounce = (fn: TFuncType, wait: number, immediate = false): TFuncType => {

    let _timeout: ReturnType<typeof setTimeout> | undefined

    return (...args: any[]) => {

        const _this = <any>this

        // 延迟执行函数
        const later = function() {

            _timeout = undefined
            if (!immediate) {

                fn.apply(_this, args)

            }

        }

        if (immediate) {

            fn.apply(_this, args)

        }
        else {

            clearTimeout(_timeout)
            _timeout = setTimeout(later, wait)

        }

    }

}
