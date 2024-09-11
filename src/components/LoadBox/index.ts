/*
 * @Author: dyb-dev
 * @Date: 2024-09-03 16:11:39
 * @LastEditors: dyb-dev
 * @LastEditTime: 2024-09-03 20:30:57
 * @FilePath: /vant-pro/src/components/LoadBox/index.ts
 * @Description: load盒子组件(基于 vant 的 `Loading`、`Icon` 组件)
 */

import { withInstall } from "#/utils"

import _LoadBox from "./index.vue"

const LoadBox = withInstall(_LoadBox)

export default LoadBox
export { LoadBox }
export type * from "./index.vue"

declare module "vue" {
    export interface GlobalComponents {
        LoadBox: typeof LoadBox
    }
}
