/*
 * @FileDesc: 函数式调用模块
 */

import { mountComponent } from "#/utils"

import DatePickerPro from "./index.vue"

import type { TFilteredDefaultOptions } from "#/utils"
import type { IDatePickerProProps } from "./index.vue"
import type { TShowPickerProBaseResult } from "../type"

/** 显示日期选择器增强版的选项 */
export type TShowDatePickerProOptions = TFilteredDefaultOptions<IDatePickerProProps>

/**
 * FUN: 显示日期选择器增强版
 *
 * @author dyb-dev
 * @date 29/02/2024/  23:43:04
 * @export
 * @param {TShowDatePickerProOptions} [options] 弹窗参数
 * @returns {*}  {Promise<TDatePickerProResult>} 弹窗结果
 */
export const showDatePickerPro = (options: TShowDatePickerProOptions): Promise<TShowPickerProBaseResult> => {

    return mountComponent<TShowDatePickerProOptions, TShowPickerProBaseResult>(DatePickerPro, {
        ...options
    })

}
