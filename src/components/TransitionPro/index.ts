/*
 * @FileDesc: 过渡动画组件增强版(基于 `Vue3` 的 `Transition`、`TransitionGroup` 组件)
 */

import { withInstall } from "~/utils"

import _TransitionPro from "./index.vue"

const TransitionPro = withInstall(_TransitionPro)

export default TransitionPro
export { TransitionPro }
export type * from "./index.vue"

declare module "vue" {
    export interface GlobalComponents {
        TransitionPro: typeof TransitionPro
    }
}
