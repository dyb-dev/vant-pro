/*
 * @Author: dyb-dev
 * @Date: 2024-09-02 15:13:28
 * @LastEditors: dyb-dev
 * @LastEditTime: 2024-09-04 01:30:44
 * @FilePath: /vant-pro/src/components/CalendarPro/index.ts
 * @Description: 日历组件增强版(基于 vant 的 `Calendar` 组件)
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
