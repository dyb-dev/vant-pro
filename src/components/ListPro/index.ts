/*
 * @Author: dyb-dev
 * @Date: 2024-09-04 15:52:33
 * @LastEditors: dyb-dev
 * @LastEditTime: 2024-09-05 21:25:55
 * @FilePath: /vant-pro/src/components/ListPro/index.ts
 * @Description: 列表分页组件增强版(基于 vant 的 `PullRefresh`、`List`、`BackTop`、`Empty`、`Highlight` 组件)
 */

import { withInstall } from "#/utils"

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
