/*
 * @FileDesc: 日历组件增强版(基于 vant 的 `Calendar` 组件)
 */

import { withInstall } from "#/utils"

import _CalendarPro from "./index.vue"

const CalendarPro = withInstall(_CalendarPro)

export default CalendarPro
export { CalendarPro }
export type * from "./index.vue"
export * from "./functionCall"

declare module "vue" {
    export interface GlobalComponents {
        CalendarPro: typeof CalendarPro
    }
}
