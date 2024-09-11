/*
 * @Author: dyb-dev
 * @Date: 2024-09-06 23:15:42
 * @LastEditors: dyb-dev
 * @LastEditTime: 2024-09-09 15:22:47
 * @FilePath: /vant-pro/src/components/picker/DatePickerPro/index.ts
 * @Description: 日期选择器增强版组件(基于 vant 的 `Popup`、`DatePicker`、`Loading` 组件)
 */

import { withInstall } from "#/utils"

import _DatePickerPro from "./index.vue"

const DatePickerPro = withInstall(_DatePickerPro)

export default DatePickerPro
export { DatePickerPro }
export type * from "./index.vue"
export * from "./functionCall"

declare module "vue" {
    export interface GlobalComponents {
        DatePickerPro: typeof DatePickerPro
    }
}
