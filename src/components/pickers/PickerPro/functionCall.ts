/*
 * @Author: dyb-dev
 * @Date: 2024-09-02 15:13:31
 * @LastEditors: dyb-dev
 * @LastEditTime: 2024-09-11 01:02:31
 * @FilePath: /vant-pro/src/components/picker/PickerPro/functionCall.ts
 * @Description: 函数式调用模块
 */

import { mountComponent } from "#/utils"

import PickerPro from "./index.vue"

import type { TFilteredDefaultOptions } from "#/utils"
import type { IPickerProProps } from "./index.vue"
import type { TShowPickerProBaseResult } from "../type"

/** 显示选择器增强版的选项 */
type TShowPickerProOptions = TFilteredDefaultOptions<IPickerProProps>

/**
 * 显示选择器增强版
 *
 * @author dyb-dev
 * @date 29/02/2024/  23:43:04
 * @export
 * @param {TShowPickerProOptions} [options] 弹窗参数
 * @returns {*}  {Promise<TPickerProResult>} 弹窗结果
 */
const showPickerPro = (options: TShowPickerProOptions): Promise<TShowPickerProBaseResult> => {

    return mountComponent<TShowPickerProOptions, TShowPickerProBaseResult>(PickerPro, {
        ...options
    })

}

export type { TShowPickerProOptions }

export { showPickerPro }
