# ListPro 列表

## 介绍

主要用于瀑布流滚动加载，用于展示长列表，当列表即将滚动到底部时，会触发事件并加载更多列表项，基于 [vant](https://vant-ui.github.io/vant/#/zh-CN/home) 的组件进行二次封装。使用了以下组件：

-   [PullRefresh](https://vant-ui.github.io/vant/#/zh-CN/pull-refresh) 用于下拉刷新
-   [List](https://vant-ui.github.io/vant/#/zh-CN/list) 用于滚动加载列表
-   [BackTop](https://vant-ui.github.io/vant/#/zh-CN/back-top) 用于返回顶部按钮
-   [Empty](https://vant-ui.github.io/vant/#/zh-CN/empty) 用于展示空数据占位符
-   [Highlight](https://vant-ui.github.io/vant/#/zh-CN/highlight) 用于高亮显示列表项

## 引入

全局注册:

```ts
import { createApp } from "vue"
import { ListPro } from "vant-pro"

const app = createApp()
app.use(ListPro)
```

使用Hook:

`usePagination`、`useListPagination` 是内部使用的分页逻辑 Hook，如果需要使用它，只需引入即可

```ts
import { usePagination, useListPagination } from "vant-pro"
```

同时，也可以引入与分页相关的类型：

```ts
import type {
    TPaginationLoadStatus,
    TPaginationDataItem,
    TPaginationDataMap,
    IPaginationFetchDataFnParam,
    IPaginationFetchDataFnResult,
    TPaginationFetchDataFnReturn,
    TPaginationRefreshParam,
    IUsePaginationOptions,
    IUsePaginationReturn,
    IUseListPaginationOptions,
    IUseListPaginationReturn
} from "vant-pro"
```

## 代码演示

::: tip 提示
ListPro 下拉刷新只在移动端正常使用
:::

<preview path="./index.vue" title="源代码 ⬇️"></preview>

## Props

| 参数                   | 说明                                                                                      | 类型                                                                                        | 默认值 |
| ---------------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | ------ |
| enableTopDesc          | 是否启用顶部描述                                                                          | `boolean`                                                                                   | `true` |
| enableEmptyPlaceholder | 是否启用数据为空时元素占位                                                                | `boolean`                                                                                   | `true` |
| enableBackTop          | 是否启用 back-top 按钮                                                                    | `boolean`                                                                                   | `true` |
| pullRefreshProps       | vant 的 [PullRefresh](https://vant-ui.github.io/vant/#/zh-CN/pull-refresh#props) 相关属性 | `TPullRefreshProps`                                                                         | -      |
| highlightProps         | vant 的 [Highlight](https://vant-ui.github.io/vant/#/zh-CN/highlight#props) 相关属性      | `THighlightProps`                                                                           | -      |
| emptyProps             | vant 的 [Empty](https://vant-ui.github.io/vant/#/zh-CN/empty#props) 相关属性              | `EmptyProps`                                                                                | -      |
| listProps              | vant 的 [List](https://vant-ui.github.io/vant/#/zh-CN/list#props) 相关属性                | `TListProps`                                                                                | -      |
| backTopProps           | vant 的 [BackTop](https://vant-ui.github.io/vant/#/zh-CN/back-top#props) 相关属性         | `Partial<BackTopProps>`                                                                     | -      |
| pageSize               | 每页数据大小                                                                              | `number`                                                                                    | `10`   |
| fetchDataFn            | 请求数据的方法                                                                            | `(param: IPaginationFetchDataFnParam) => TPaginationFetchDataFnReturn<TPaginationDataItem>` | -      |

## Slots

| 名称             | 说明                                         |
| ---------------- | -------------------------------------------- |
| default          | 列表项存放位置                               |
| top-desc         | 用于列表顶部提示描述                         |
| emptyImage       | 用于列表加载报错或者空数据时显示的占位图     |
| emptyDescription | 用于列表加载报错或者空数据时显示的描述       |
| emptyDefault     | 用于列表加载报错或者空数据时自定义显示的内容 |

## Ref

| 属性名              | 说明                             | 类型                                                |
| ------------------- | -------------------------------- | --------------------------------------------------- |
| currentLoadStatus   | 当前加载状态                     | `Ref<TPaginationLoadStatus>`                        |
| initialized         | 是否初始化成功                   | `Ref<boolean>`                                      |
| refreshing          | 是否正在刷新                     | `Ref<boolean>`                                      |
| currentPageData     | 当前页的数据（计算属性）         | `ComputedRef<T[]>`                                  |
| currentTotalData    | 当前已加载的总数据（计算属性）   | `ComputedRef<T[]>`                                  |
| currentTotalSize    | 当前已加载的总数据量（计算属性） | `ComputedRef<number>`                               |
| finished            | 是否所有数据已加载完成           | `ComputedRef<boolean>`                              |
| totalSize           | 数据总数量                       | `Ref<number>`                                       |
| currentTotalDataMap | 当前所有页的数据映射             | `Ref<TPaginationDataMap<T>>`                        |
| load                | 加载指定页码数据                 | `(page?: TPaginationRefreshParam) => Promise<void>` |
| next                | 下一页                           | `() => Promise<void>`                               |
| clearRefresh        | 清空所有数据并刷新首页           | `() => Promise<void>`                               |

## 类型定义

组件导出以下类型定义：

```ts
import type { TPullRefreshProps, TListProps, THighlightProps, IListProProps } from "vant-pro"
```

## 主题定制

请参考 [vant](https://vant-ui.github.io/vant/#/zh-CN/home) 中 [ConfigProvider](https://vant-ui.github.io/vant/#/zh-CN/config-provider) 的使用
