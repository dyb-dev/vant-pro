/*
 * @Author: dyb-dev
 * @Date: 2024-09-06 23:15:42
 * @LastEditors: dyb-dev
 * @LastEditTime: 2024-09-10 23:54:50
 * @FilePath: /vant-pro/src/components/picker/AreaPickerPro/index.ts
 * @Description: 地区选择器增强版组件(基于 vant 的 `Popup`、`Area`、`Loading` 组件)
 */

import { withInstall } from "#/utils"

import _AreaPickerPro from "./index.vue"

const AreaPickerPro = withInstall(_AreaPickerPro)

export default AreaPickerPro
export { AreaPickerPro }
export type * from "./index.vue"
export * from "./functionCall"

declare module "vue" {
    export interface GlobalComponents {
        AreaPickerPro: typeof AreaPickerPro
    }
}
