/*
 * @FileDesc: 函数式调用模块
 */

import { mountComponent } from "~/utils"

import CalendarPro from "./index.vue"

import type { ICalendarProProps, TCalendarProUnmountParam } from "./index.vue"
import type { TFilteredDefaultOptions } from "~/utils"

/** 显示日历的选项 */
export type TShowCalendarProOptions = TFilteredDefaultOptions<Omit<ICalendarProProps, "poppable" | "selectDate">>

/**
 * 日历选择的结果
 */
export type TShowCalendarProResult = TCalendarProUnmountParam

/**
 * FUN: 显示日历
 *
 * @author dyb-dev
 * @date 29/02/2024/  23:43:04
 * @export
 * @param {TShowCalendarProOptions} [options] 弹窗参数
 * @returns {*}  {Promise<TCalendarProResult>} 弹窗结果
 */
export const showCalendarPro = (options?: TShowCalendarProOptions): Promise<TShowCalendarProResult> => {

    return mountComponent<ICalendarProProps, TShowCalendarProResult>(CalendarPro, {
        ...options,
        poppable: true
    })

}
