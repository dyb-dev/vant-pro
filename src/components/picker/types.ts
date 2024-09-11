/*
 * @Author: dyb-dev
 * @Date: 2024-09-07 21:30:34
 * @LastEditors: dyb-dev
 * @LastEditTime: 2024-09-11 01:40:37
 * @FilePath: /vant-pro/src/components/picker/types.ts
 * @Description: 选择器组件公共类型
 */

import type { PickerConfirmEventParams } from "vant"

/** 选择器增强版组件 基础操作类型 */
type TPickerProBaseActionType = "confirm" | "cancel"

/** 选择器增强版组件 基础选择结果类型 */
type TPickerProBaseSelectedResult = PickerConfirmEventParams & {
    /** 动作类型 */
    actionType: TPickerProBaseActionType
}

/** 选择器增强版组件 函数式调用时组件卸载回调参数 基础类型 */
type TPickerProBaseUnmountParam = [TPickerProBaseSelectedResult]

/** 选择器增强版组件 函数式调用时基础结果类型 */
type TShowPickerProBaseResult = TPickerProBaseUnmountParam

export type { TPickerProBaseActionType, TPickerProBaseSelectedResult, TPickerProBaseUnmountParam, TShowPickerProBaseResult }
