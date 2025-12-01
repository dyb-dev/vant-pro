/*
 * @FileDesc: 选择器增强版组件(基于 vant 的 `Popup`、`Picker`、`Search`、`Loading`、`Icon` 组件)
 */

import { withInstall } from "~/utils"

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
