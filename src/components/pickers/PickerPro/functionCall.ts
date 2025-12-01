/*
 * @FileDesc: 函数式调用模块
 */

import { mountComponent } from "~/utils"

import PickerPro from "./index.vue"

import type { IPickerProProps } from "./index.vue"
import type { TShowPickerProBaseResult } from "../type"
import type { TFilteredDefaultOptions } from "~/utils"

/** 显示选择器增强版的选项 */
export type TShowPickerProOptions = TFilteredDefaultOptions<IPickerProProps>

/**
 * FUN: 显示选择器增强版
 *
 * @author dyb-dev
 * @date 29/02/2024/  23:43:04
 * @export
 * @param {TShowPickerProOptions} [options] 弹窗参数
 * @returns {*}  {Promise<TPickerProResult>} 弹窗结果
 */
export const showPickerPro = (options: TShowPickerProOptions): Promise<TShowPickerProBaseResult> => {

    return mountComponent<TShowPickerProOptions, TShowPickerProBaseResult>(PickerPro, {
        ...options
    })

}
