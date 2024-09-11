# 快速上手

## 简介

通过本章节你可以了解到 vant-pro 的安装方法和基本使用。
::: tip 提示
目前仅支持浏览器环境
:::

## 安装

在安装 vant-pro 之前，需要具备以下前置条件:

```shell
# 安装 Vue3 最新版本
pnpm i vue

# 安装 vant 组件库 最新版本
pnpm i vant

# 安装 Vue 3 官方提供的组合式 API 和 工具函数 最新版本
pnpm i @vueuse/core
```

安装 **vant** 组件库之后，还需引入其提供的样式文件:

```ts
import { createApp } from "vue"
// 引入 vant 组件库样式
import "vant/lib/index.css"

const app = createApp()
```

::: warning 注意
如果 **vant** 的样式为按需加载的，那么会造成组件无法正常使用，这是由于当你在使用按需加载时，使用 **vant-pro** 的组件并不会去自动引入其内部 **vant** 组件的样式文件
:::

前置条件完成后，可以通过 pnpm 进行安装:

```shell
# 当然你也可以通过 npm、yarn 或 bun 进行安装
pnpm i vant-pro
```

## 组件用法

vant-pro 支持多种组件注册方式，下面是使用 vant-pro 组件的用法示例:

### 全局注册

全局注册后，你可以在 app 下的任意子组件中使用注册的 vant-pro 组件。

```ts
import { createApp } from "vue"
// 1. 引入 `ListPro` 组件
import { ListPro } from "vant-pro"
// 2. 引入 vant-pro 组件库样式
import "vant-pro/style.css"

const app = createApp()

// 3. 注册 `ListPro` 组件

// 方式一. 通过 app.use 注册
app.use(ListPro)

// 方式二. 通过 app.component 注册
app.component(ListPro.name, ListPro)
```

### 全量注册

你也可以在全局一次性注册所有 vant-pro 组件:

```ts
import { createApp } from "vue"
// 1. 引入全部组件
import VantPro from "vant-pro"
// 2. 引入 vant-pro 组件库样式
import "vant-pro/style.css"

const app = createApp()

// 3. 注册全部组件
app.use(VantPro)
```

::: warning 注意
注册所有组件会引入所有组件的代码，导致包体积增大。
:::

### 局部注册

局部注册后，你可以在当前组件中使用注册的 vant-pro 组件。

```ts
import { ListPro } from "vant-pro"

export default {
    components: {
        [ListPro.name]: ListPro
    }
}
```

### `<script setup>`

在 `<script setup>` 中可以直接使用 vant-pro 组件，不需要进行组件注册。

```vue
<script setup>
import { ListPro } from "vant-pro"
</script>

<template>
    <ListPro />
</template>
```

### JSX/TSX

在 JSX 和 TSX 中可以直接使用 vant-pro 组件，不需要进行组件注册。

```tsx
import { ListPro } from "vant-pro"

export default {
    render() {
        return <ListPro />
    }
}
```

## 浏览器适配

vant-pro 默认使用 px 作为样式单位，如果需要做其他处理，请参考 **vant** 的浏览器适配 [指南](https://vant-ui.github.io/vant/#/zh-CN/advanced-usage#liu-lan-qi-gua-pei)。

## API

vant-pro 还提供了实现函数式调用的基础方法:

| 方法名                      | 说明                       | 参数                                                               | 返回值            |
| --------------------------- | -------------------------- | ------------------------------------------------------------------ | ----------------- |
| `getMountComponentSelector` | 获取挂载组件的根节点选择器 | -                                                                  | `string`          |
| `setMountComponentSelector` | 设置挂载组件的根节点选择器 | `selector: string`                                                 | `void`            |
| `mountComponent`            | 挂载组件                   | `component: Component, options?: TFilteredDefaultOptions<Options>` | `Promise<Result>` |

::: tip 提示
`mountComponent` 方法将组件默认挂载在 `#app` 节点下，如果查找不到此节点则会使用 `body`，也可通过 `setMountComponentSelector` 方法设置指定挂载节点。
:::

导出以下相关类型定义:

```ts
import type { IDefaultOptions, TFilteredDefaultOptions } from "vant-pro"
```

::: code-group

```ts [代码示例]
import { mountComponent } from "vant-pro"

import Component from "./component.vue"

import type { TFilteredDefaultOptions } from "vant-pro"
import type { IComponentProps, IComponentResult } from "./component.vue"

/** 过滤掉 `show` 和 `unmount` Props  */
type TShowComponentOptions = TFilteredDefaultOptions<IComponentProps>

const showComponent = (options: TShowComponentOptions): Promise<IComponentResult> => {
    return mountComponent<TShowComponentOptions, IComponentResult>(Component, {
        ...options
    })
}
```

:::
