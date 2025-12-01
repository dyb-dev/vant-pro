/*
 * @FileDesc: 列表分页组件增强版(基于 vant 的 `PullRefresh`、`List`、`BackTop`、`Empty`、`Highlight` 组件)
 */

import { withInstall } from "~/utils"

import _ListPro from "./index.vue"

const ListPro = withInstall(_ListPro)

export default ListPro
export { ListPro }
export type * from "./index.vue"

declare module "vue" {
    export interface GlobalComponents {
        ListPro: typeof ListPro
    }
}

export * from "./hooks"
