# LoadBox 加载盒子

## 介绍

主要用于表示加载中的过渡状态，以及处理加载错误需要重新加载的情况，基于 [vant](https://vant-ui.github.io/vant/#/zh-CN/home) 的组件进行二次封装。使用了以下组件：

-   [Loading](https://vant-ui.github.io/vant/#/zh-CN/loading) 用于加载指示器
-   [Icon](https://vant-ui.github.io/vant/#/zh-CN/icon) 用于显示图标

## 引入

全局注册:

```ts
import { createApp } from "vue"
import { LoadBox } from "@dyb-dev/vant-pro"

const app = createApp()
app.use(LoadBox)
```

## 代码演示

<preview path="./index.vue" title="源代码 ⬇️"></preview>

## Props

| 参数           | 说明                                            | 类型                               | 默认值                               |
| -------------- | ----------------------------------------------- | ---------------------------------- | ------------------------------------ |
| v-model:status | 状态，可选值为 'loading' \| 'success' \| 'fail' | `'loading' \| 'success' \| 'fail'` | `'loading'`                          |
| icon           | 自定义图标，优先级高于 loadingIcon、failIcon    | `LoadingType \| string`            | -                                    |
| text           | 自定义描述，优先级高于 loadingText、failText    | `string`                           | -                                    |
| loadingIcon    | 加载中的图标                                    | `LoadingType`                      | `'circular'`                         |
| loadingText    | 加载中的描述                                    | `string`                           | `"正在载入"`                         |
| failIcon       | 加载失败的图标                                  | `string`                           | `"replay"`                           |
| failText       | 加载失败的描述                                  | `string`                           | `"加载失败，请点击重试~"`            |
| color          | icon和文本颜色                                  | `string`                           | `"var(--van-loading-spinner-color)"` |
| retryLoadFn    | 重新加载函数                                    | `() => void`                       | -                                    |

## Events

| 事件名        | 说明     | 回调参数                |
| ------------- | -------- | ----------------------- |
| update:status | 更新状态 | `value: TLoadBoxStatus` |

## Slots

| 名称    | 说明                         |
| ------- | ---------------------------- |
| default | 用于存放加载成功后显示的内容 |

## 类型定义

组件导出以下类型定义：

```ts
import type { TLoadBoxStatus, ILoadBoxProps } from "@dyb-dev/vant-pro"
```

## 主题定制

请参考 [vant](https://vant-ui.github.io/vant/#/zh-CN/home) 中 [ConfigProvider](https://vant-ui.github.io/vant/#/zh-CN/config-provider) 的使用
