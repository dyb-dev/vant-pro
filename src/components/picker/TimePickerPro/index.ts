/*
 * @Author: dyb-dev
 * @Date: 2024-09-06 23:15:42
 * @LastEditors: dyb-dev
 * @LastEditTime: 2024-09-09 16:11:45
 * @FilePath: /vant-pro/src/components/picker/TimePickerPro/index.ts
 * @Description: 时间选择器增强版组件(基于 vant 的 `Popup`、`TimePicker`、`Loading` 组件)
 */

import { withInstall } from "#/utils"

import _TimePickerPro from "./index.vue"

const TimePickerPro = withInstall(_TimePickerPro)

export default TimePickerPro
export { TimePickerPro }
export type * from "./index.vue"
export * from "./functionCall"

declare module "vue" {
    export interface GlobalComponents {
        TimePickerPro: typeof TimePickerPro
    }
}
