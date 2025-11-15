/*
 * @FileDesc: 时间选择器增强版组件(基于 vant 的 `Popup`、`TimePicker`、`Loading` 组件)
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
