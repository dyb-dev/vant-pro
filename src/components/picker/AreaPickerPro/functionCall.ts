/*
 * @Author: dyb-dev
 * @Date: 2024-09-02 15:13:31
 * @LastEditors: dyb-dev
 * @LastEditTime: 2024-09-10 23:55:55
 * @FilePath: /vant-pro/src/components/picker/AreaPickerPro/functionCall.ts
 * @Description: 函数式调用模块
 */

import { mountComponent } from "#/utils"

import AreaPickerPro from "./index.vue"

import type { TFilteredDefaultOptions } from "#/utils"
import type { IAreaPickerProProps, TAreaPickerProUnmountParam } from "./index.vue"

/** 显示地区选择器的选项 */
type TShowAreaPickerProOptions = TFilteredDefaultOptions<Omit<IAreaPickerProProps, "pickerValue">>

/**
 * 地区选择器选择的结果
 */
type TShowAreaPickerProResult = TAreaPickerProUnmountParam

/**
 * 显示地区选择器
 *
 * @author dyb-dev
 * @date 29/02/2024/  23:43:04
 * @export
 * @param {TShowAreaPickerProOptions} [options] 弹窗参数
 * @returns {*}  {Promise<TAreaPickerProResult>} 弹窗结果
 */
const showAreaPickerPro = (options: TShowAreaPickerProOptions): Promise<TShowAreaPickerProResult> => {

    return mountComponent<TShowAreaPickerProOptions, TShowAreaPickerProResult>(AreaPickerPro, {
        ...options
    })

}

export type { TShowAreaPickerProOptions, TShowAreaPickerProResult }

export { showAreaPickerPro }
