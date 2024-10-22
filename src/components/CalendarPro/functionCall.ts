/*
 * @Author: dyb-dev
 * @Date: 2024-09-02 15:13:31
 * @LastEditors: dyb-dev
 * @LastEditTime: 2024-10-22 15:41:34
 * @FilePath: /vant-pro/src/components/CalendarPro/functionCall.ts
 * @Description: 函数式调用模块
 */

import { mountComponent } from "#/utils"

import CalendarPro from "./index.vue"

import type { TFilteredDefaultOptions } from "#/utils"
import type { ICalendarProProps, TCalendarProUnmountParam } from "./index.vue"

/** 显示日历的选项 */
type TShowCalendarProOptions = TFilteredDefaultOptions<Omit<ICalendarProProps, "poppable" | "selectDate">>

/**
 * 日历选择的结果
 */
type TShowCalendarProResult = TCalendarProUnmountParam

/**
 * 显示日历
 *
 * @author dyb-dev
 * @date 29/02/2024/  23:43:04
 * @export
 * @param {TShowCalendarProOptions} [options] 弹窗参数
 * @returns {*}  {Promise<TCalendarProResult>} 弹窗结果
 */
const showCalendarPro = (options?: TShowCalendarProOptions): Promise<TShowCalendarProResult> => {

    return mountComponent<ICalendarProProps, TShowCalendarProResult>(CalendarPro, {
        ...options,
        poppable: true
    })

}

export type { TShowCalendarProOptions, TShowCalendarProResult }

export { showCalendarPro }
