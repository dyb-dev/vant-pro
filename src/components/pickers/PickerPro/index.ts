/*
 * @Author: dyb-dev
 * @Date: 2024-09-06 23:15:42
 * @LastEditors: dyb-dev
 * @LastEditTime: 2024-09-08 21:16:53
 * @FilePath: /vant-pro/src/components/picker/PickerPro/index.ts
 * @Description: 选择器增强版组件(基于 vant 的 `Popup`、`Picker`、`Search`、`Loading`、`Icon` 组件)
 */

import { withInstall } from "#/utils"

import _PickerPro from "./index.vue"

const PickerPro = withInstall(_PickerPro)

export default PickerPro
export { PickerPro }
export type * from "./index.vue"
export * from "./functionCall"

declare module "vue" {
    export interface GlobalComponents {
        PickerPro: typeof PickerPro
    }
}
