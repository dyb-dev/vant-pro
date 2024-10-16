/*
 * @Author: dyb-dev
 * @Date: 2024-09-02 15:13:31
 * @LastEditors: dyb-dev
 * @LastEditTime: 2024-09-11 11:39:37
 * @FilePath: /vant-pro/src/components/picker/DatePickerPro/functionCall.ts
 * @Description: 函数式调用模块
 */

import { mountComponent } from "#/utils"

import DatePickerPro from "./index.vue"

import type { TFilteredDefaultOptions } from "#/utils"
import type { IDatePickerProProps } from "./index.vue"
import type { TShowPickerProBaseResult } from "../type"

/** 显示日期选择器增强版的选项 */
type TShowDatePickerProOptions = TFilteredDefaultOptions<IDatePickerProProps>

/**
 * 显示日期选择器增强版
 *
 * @author dyb-dev
 * @date 29/02/2024/  23:43:04
 * @export
 * @param {TShowDatePickerProOptions} [options] 弹窗参数
 * @returns {*}  {Promise<TDatePickerProResult>} 弹窗结果
 */
const showDatePickerPro = (options: TShowDatePickerProOptions): Promise<TShowPickerProBaseResult> => {

    return mountComponent<TShowDatePickerProOptions, TShowPickerProBaseResult>(DatePickerPro, {
        ...options
    })

}

export type { TShowDatePickerProOptions }

export { showDatePickerPro }
