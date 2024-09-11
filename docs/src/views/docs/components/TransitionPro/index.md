# TransitionPro 过渡

## 介绍

主要用于元素显示、隐藏、切换等过渡效果，支持单个元素和多个元素过渡，基于 [vue3](https://cn.vuejs.org/) 的组件进行二次封装。使用了以下组件：

-   [Transition](https://cn.vuejs.org/guide/built-ins/transition.html#the-transition-component) 用于过渡单个元素
-   [TransitionGroup](https://cn.vuejs.org/guide/built-ins/transition-group.html) 用于过渡多个元素

## 引入

全局注册:

```ts
import { createApp } from "vue"
import { TransitionPro } from "vant-pro"

const app = createApp()
app.use(TransitionPro)
```

## 代码演示

<preview path="./index.vue" title="源代码 ⬇️"></preview>

## Props

::: tip 提示
下方展示的是新增的扩展选项，其他选项还请查看 vue3 的 [Transition](https://cn.vuejs.org/api/built-in-components.html#transition)、[TransitionGroup](https://cn.vuejs.org/api/built-in-components.html#transitiongroup) 组件
:::

| 参数                 | 说明              | 类型      | 默认值       |
| -------------------- | ----------------- | --------- | ------------ |
| time                 | 过渡时间，单位:秒 | `number`  | `0.3`        |
| easing               | 过渡曲线模式      | `TEasing` | `"ease-out"` |
| enableListTransition | 是否启用列表过渡  | `boolean` | `false`      |

## Slots

| 名称    | 说明                   |
| ------- | ---------------------- |
| default | 用于存放需要过渡的元素 |

## 类型定义

组件导出以下类型定义：

```ts
import type { TTransitionProEasing, ITransitionProProps } from "vant-pro"
```
