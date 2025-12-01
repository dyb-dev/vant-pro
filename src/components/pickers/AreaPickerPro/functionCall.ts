/*
 * @FileDesc: 函数式调用模块
 */

import { mountComponent } from "~/utils"

import AreaPickerPro from "./index.vue"

import type { IAreaPickerProProps, TAreaPickerProUnmountParam } from "./index.vue"
import type { TFilteredDefaultOptions } from "~/utils"

/** 显示地区选择器的选项 */
export type TShowAreaPickerProOptions = TFilteredDefaultOptions<Omit<IAreaPickerProProps, "pickerValue">>

/**
 * 地区选择器选择的结果
 */
export type TShowAreaPickerProResult = TAreaPickerProUnmountParam

/**
 * FUN: 显示地区选择器
 *
 * @author dyb-dev
 * @date 29/02/2024/  23:43:04
 * @export
 * @param {TShowAreaPickerProOptions} [options] 弹窗参数
 * @returns {*}  {Promise<TAreaPickerProResult>} 弹窗结果
 */
export const showAreaPickerPro = (options: TShowAreaPickerProOptions): Promise<TShowAreaPickerProResult> => {

    return mountComponent<TShowAreaPickerProOptions, TShowAreaPickerProResult>(AreaPickerPro, {
        ...options
    })

}
