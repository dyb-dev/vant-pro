/*
 * @Author: dyb-dev
 * @Date: 2024-09-02 15:13:31
 * @LastEditors: dyb-dev
 * @LastEditTime: 2024-09-11 11:38:30
 * @FilePath: /vant-pro/src/components/picker/TimePickerPro/functionCall.ts
 * @Description: 函数式调用模块
 */

import { mountComponent } from "#/utils"

import TimePickerPro from "./index.vue"

import type { TFilteredDefaultOptions } from "#/utils"
import type { ITimePickerProProps } from "./index.vue"
import type { TShowPickerProBaseResult } from "../types"

/** 显示地区选择器增强版的选项 */
type TShowTimePickerProOptions = TFilteredDefaultOptions<ITimePickerProProps>

/**
 * 显示地区选择器增强版
 *
 * @author dyb-dev
 * @date 29/02/2024/  23:43:04
 * @export
 * @param {TShowTimePickerProOptions} [options] 弹窗参数
 * @returns {*}  {Promise<TTimePickerProResult>} 弹窗结果
 */
const showTimePickerPro = (options: TShowTimePickerProOptions): Promise<TShowPickerProBaseResult> => {

    return mountComponent<TShowTimePickerProOptions, TShowPickerProBaseResult>(TimePickerPro, {
        ...options
    })

}

export type { TShowTimePickerProOptions }

export { showTimePickerPro }
