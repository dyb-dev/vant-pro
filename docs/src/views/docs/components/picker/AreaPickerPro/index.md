# AreaPickerPro 省市区选择器

## 介绍

主要用于省、市、区选择，支持单独选择和联动选择，基于 [vant](https://vant-ui.github.io/vant/#/zh-CN/home) 的组件进行二次封装。使用了以下组件：

-   [Popup](https://vant-ui.github.io/vant/#/zh-CN/popup) 用于弹窗显示
-   [Area](https://vant-ui.github.io/vant/#/zh-CN/area) 用于省市区选择
-   [Loading](https://vant-ui.github.io/vant/#/zh-CN/loading) 用于显示加载状态

## 引入

全局注册:

```ts
import { createApp } from "vue"
import { AreaPickerPro } from "vant-pro"

const app = createApp()
app.use(AreaPickerPro)
```

::: tip 提示
省市区数据来源可参考 vant 的 [Area](https://vant-ui.github.io/vant/#/zh-CN/area#zhong-guo-sheng-shi-qu-shu-ju) 组件，请使用 vant 官方提供的 [@vant/area-data](https://github.com/youzan/vant/tree/main/packages/vant-area-data) 这个库，所以还需安装:

```shell
pnpm i @vant/area-data
```

:::

## 代码演示

::: tip 提示
AreaPickerPro 滑动选择只在移动端正常使用
:::

<preview path="./index.vue" title="源代码 ⬇️"></preview>

## API

vant-pro 中导出了 AreaPickerPro 相关的辅助函数:

| 方法名              | 说明               | 参数                                  | 返回值                              |
| ------------------- | ------------------ | ------------------------------------- | ----------------------------------- |
| `showAreaPickerPro` | 显示地区选择器弹窗 | `options?: TShowAreaPickerProOptions` | `Promise<TShowAreaPickerProResult>` |

## TShowAreaPickerProOptions

调用 `showAreaPickerPro` 等方法时，支持传入以下选项：

| 参数               | 说明                                                                     | 类型                                                                            | 默认值       |
| ------------------ | ------------------------------------------------------------------------ | ------------------------------------------------------------------------------- | ------------ |
| areaCode           | 选择的地区编码                                                           | `string`                                                                        | -            |
| areaList           | 地区数据对象                                                             | `TAreaPickerProData`                                                            | -            |
| title              | 顶部栏标题                                                               | `string`                                                                        | `"请选择"`   |
| confirmButtonText  | 确认按钮文字，设置为空字符串可以隐藏按钮                                 | `string`                                                                        | `"确认"`     |
| cancelButtonText   | 取消按钮文字，设置为空字符串可以隐藏按钮                                 | `string`                                                                        | `"取消"`     |
| visibleOptionNum   | 可见的选项个数                                                           | `number`                                                                        | `6`          |
| areaType           | 选择的地区等级，如果没有传递 `areaType` 时会根据 `areaList` 的长度来决定 | `TAreaPickerProType`                                                            | `"district"` |
| columnsPlaceholder | 列占位提示文字                                                           | `string[]`                                                                      | `[]`         |
| optionHeight       | 选项高度，支持 px, vw, vh, rem 单位，默认 px                             | `number \| string`                                                              | `44`         |
| swipeDuration      | 快速滑动时惯性滚动的时长，单位 ms                                        | `number \| string`                                                              | `1000`       |
| lockScroll         | 是否锁定背景滚动                                                         | `boolean`                                                                       | `true`       |
| teleport           | 指定挂载的节点，等同于 Teleport 组件的 to 属性                           | `string \| Element`                                                             | -            |
| beforeClose        | 关闭前的回调函数，返回 false 可阻止关闭，支持返回 Promise                | `(selectedResult: TAreaPickerProSelectedResult) => boolean \| Promise<boolean>` | -            |

## Props

| 参数                | 说明                                                                     | 类型                                                                            | 默认值       |
| ------------------- | ------------------------------------------------------------------------ | ------------------------------------------------------------------------------- | ------------ |
| v-model:show        | 是否显示                                                                 | `boolean`                                                                       | -            |
| v-model:areaCode    | 选择的地区编码                                                           | `string`                                                                        | -            |
| v-model:pickerValue | 地区选择器的值                                                           | `(number \| string)[]`                                                          | -            |
| areaList            | 地区数据对象                                                             | `TAreaPickerProData`                                                            | -            |
| title               | 顶部栏标题                                                               | `string`                                                                        | `"请选择"`   |
| confirmButtonText   | 确认按钮文字，设置为空字符串可以隐藏按钮                                 | `string`                                                                        | `"确认"`     |
| cancelButtonText    | 取消按钮文字，设置为空字符串可以隐藏按钮                                 | `string`                                                                        | `"取消"`     |
| visibleOptionNum    | 可见的选项个数                                                           | `number`                                                                        | `6`          |
| areaType            | 选择的地区等级，如果没有传递 `areaType` 时会根据 `areaList` 的长度来决定 | `TAreaPickerProType`                                                            | `"district"` |
| columnsPlaceholder  | 列占位提示文字                                                           | `string[]`                                                                      | `[]`         |
| optionHeight        | 选项高度，支持 px, vw, vh, rem 单位，默认 px                             | `number \| string`                                                              | `44`         |
| swipeDuration       | 快速滑动时惯性滚动的时长，单位 ms                                        | `number \| string`                                                              | `1000`       |
| lockScroll          | 是否锁定背景滚动                                                         | `boolean`                                                                       | `true`       |
| teleport            | 指定挂载的节点，等同于 Teleport 组件的 to 属性                           | `string \| Element`                                                             | -            |
| beforeClose         | 关闭前的回调函数，返回 false 可阻止关闭，支持返回 Promise                | `(selectedResult: TAreaPickerProSelectedResult) => boolean \| Promise<boolean>` | -            |

## Events

| 事件名             | 说明               | 回调参数                                       |
| ------------------ | ------------------ | ---------------------------------------------- |
| update:show        | 是否显示           | -                                              |
| update:areaCode    | 更新选中的地区编码 | -                                              |
| update:pickerValue | 更新选中的值       | -                                              |
| confirm            | 确认按钮点击       | `selectedResult: TAreaPickerProSelectedResult` |
| cancel             | 取消按钮点击       | `selectedResult: TAreaPickerProSelectedResult` |

## 类型定义

组件导出以下类型定义：

```ts
import type {
    TAreaPickerProType,
    TAreaPickerProData,
    TAreaPickerProFetchDataFnReturn,
    TAreaPickerProSelectedResult,
    TAreaPickerProUnmountParam,
    IAreaPickerProProps,
    TShowAreaPickerProOptions,
    TShowAreaPickerProResult
} from "vant-pro"
```

## 主题定制

请参考 [vant](https://vant-ui.github.io/vant/#/zh-CN/home) 中 [ConfigProvider](https://vant-ui.github.io/vant/#/zh-CN/config-provider) 的使用
