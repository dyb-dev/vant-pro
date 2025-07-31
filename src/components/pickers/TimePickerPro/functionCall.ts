/*
 * @Author: dyb-dev
 * @Date: 2024-09-02 15:13:31
 * @LastEditors: v_zhgtzhong
 * @LastEditTime: 2025-08-01 00:35:41
 * @FilePath: /vant-pro/src/components/pickers/TimePickerPro/functionCall.ts
 * @Description: 函数式调用模块
 */

import { mountComponent } from "#/utils"

import TimePickerPro from "./index.vue"

import type { TFilteredDefaultOptions } from "#/utils"
import type { ITimePickerProProps } from "./index.vue"
import type { TShowPickerProBaseResult } from "../type"

/** 显示地区选择器增强版的选项 */
export type TShowTimePickerProOptions = TFilteredDefaultOptions<ITimePickerProProps>

/**
 * FUN: 显示地区选择器增强版
 *
 * @author dyb-dev
 * @date 29/02/2024/  23:43:04
 * @export
 * @param {TShowTimePickerProOptions} [options] 弹窗参数
 * @returns {*}  {Promise<TTimePickerProResult>} 弹窗结果
 */
export const showTimePickerPro = (options: TShowTimePickerProOptions): Promise<TShowPickerProBaseResult> => {

    return mountComponent<TShowTimePickerProOptions, TShowPickerProBaseResult>(TimePickerPro, {
        ...options
    })

}
