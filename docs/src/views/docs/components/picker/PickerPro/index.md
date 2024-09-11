# PickerPro 自定义选择器

## 介绍

主要用于提供多个选项集合供用户选择，支持单列选择、多列选择和级联选择以及搜索功能，基于 [vant](https://vant-ui.github.io/vant/#/zh-CN/home) 的组件进行二次封装。使用了以下组件：

-   [Popup](https://vant-ui.github.io/vant/#/zh-CN/popup) 用于弹窗显示
-   [Picker](https://vant-ui.github.io/vant/#/zh-CN/picker) 用于选择器组件
-   [Search](https://vant-ui.github.io/vant/#/zh-CN/search) 用于搜索输入框
-   [Loading](https://vant-ui.github.io/vant/#/zh-CN/loading) 用于显示加载状态
-   [Icon](https://vant-ui.github.io/vant/#/zh-CN/icon) 用于展示图标

## 引入

全局注册:

```ts
import { createApp } from "vue"
import { PickerPro } from "vant-pro"

const app = createApp()
app.use(PickerPro)
```

## 代码演示

::: tip 提示
PickerPro 滑动选择只在移动端正常使用
:::

<preview path="./index.vue" title="源代码 ⬇️"></preview>

## API

vant-pro 中导出了 PickerPro 相关的辅助函数:

| 方法名          | 说明                 | 参数                              | 返回值                          |
| --------------- | -------------------- | --------------------------------- | ------------------------------- |
| `showPickerPro` | 显示选择器增强版弹窗 | `options?: TShowPickerProOptions` | `Promise<TPickerProBaseResult>` |

## TShowPickerProOptions

调用 `showPickerPro` 等方法时，支持传入以下选项：

| 参数                 | 说明                                                        | 类型                                                                            | 默认值                                                     |
| -------------------- | ----------------------------------------------------------- | ------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| pickerValue          | 当前选中项对应的值                                          | `(number \| string)[]`                                                          | `[]`                                                       |
| columns              | 对象数组，配置每一列显示的数据                              | `TPickerProData`                                                                | `[]`                                                       |
| columnsFieldNames    | 自定义 columns 结构中的字段                                 | `PickerFieldNames`                                                              | `{ text: 'text', values: 'values', children: 'children' }` |
| showSearch           | 是否显示搜索组件，使用搜索功能还需要传入 `fetchDataFn` 函数 | `boolean`                                                                       | `false`                                                    |
| title                | 顶部栏标题                                                  | `string`                                                                        | `"请选择"`                                                 |
| confirmButtonText    | 确认按钮文字，设置为空字符串可以隐藏按钮                    | `string`                                                                        | `"确认"`                                                   |
| cancelButtonText     | 取消按钮文字，设置为空字符串可以隐藏按钮                    | `string`                                                                        | `"取消"`                                                   |
| allowHtml            | 是否允许选项内容中渲染 HTML                                 | `boolean`                                                                       | `false`                                                    |
| fetchDataFailTipText | 请求数据失败提示文案                                        | `string`                                                                        | `"加载失败，点击重试"`                                     |
| visibleOptionNum     | 可见的选项个数                                              | `number`                                                                        | `6`                                                        |
| optionHeight         | 选项高度，支持 px, vw, vh, rem 单位，默认 px                | `number \| string`                                                              | `44`                                                       |
| swipeDuration        | 快速滑动时惯性滚动的时长，单位 ms                           | `number \| string`                                                              | `1000`                                                     |
| lockScroll           | 是否锁定背景滚动                                            | `boolean`                                                                       | `true`                                                     |
| teleport             | 指定挂载的节点，等同于 Teleport 组件的 to 属性              | `string \| Element`                                                             | -                                                          |
| fetchDataFn          | 获取 Picker 数据的函数                                      | `(param: TPickerProFetchDataFnParam) => TPickerProFetchDataFnReturn`            | -                                                          |
| beforeClose          | 关闭前的回调函数，返回 false 可阻止关闭，支持返回 Promise   | `(selectedResult: TPickerProBaseSelectedResult) => boolean \| Promise<boolean>` | -                                                          |

## Props

| 参数                 | 说明                                                                            | 类型                                                                            | 默认值                                                     |
| -------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| v-model:show         | 是否显示                                                                        | `boolean`                                                                       | -                                                          |
| v-model:pickerValue  | 当前选中项对应的值                                                              | `(number \| string)[]`                                                          | `[]`                                                       |
| columns              | 对象数组，配置每一列显示的数据                                                  | `TPickerProData`                                                                | `[]`                                                       |
| columnsFieldNames    | 自定义 columns 结构中的字段                                                     | `PickerFieldNames`                                                              | `{ text: 'text', values: 'values', children: 'children' }` |
| showSearch           | 是否显示搜索组件，使用搜索功能还需要传入 `fetchDataFn` 函数                     | `boolean`                                                                       | `false`                                                    |
| title                | 顶部栏标题                                                                      | `string`                                                                        | `"请选择"`                                                 |
| confirmButtonText    | 确认按钮文字，设置为空字符串可以隐藏按钮                                        | `string`                                                                        | `"确认"`                                                   |
| cancelButtonText     | 取消按钮文字，设置为空字符串可以隐藏按钮                                        | `string`                                                                        | `"取消"`                                                   |
| allowHtml            | 是否允许选项内容中渲染 HTML                                                     | `boolean`                                                                       | `false`                                                    |
| fetchDataFailTipText | 请求数据失败提示文案                                                            | `string`                                                                        | `"加载失败，点击重试"`                                     |
| visibleOptionNum     | 可见的选项个数                                                                  | `number`                                                                        | `6`                                                        |
| optionHeight         | 选项高度，支持 px, vw, vh, rem 单位，默认 px                                    | `number \| string`                                                              | `44`                                                       |
| swipeDuration        | 快速滑动时惯性滚动的时长，单位 ms                                               | `number \| string`                                                              | `1000`                                                     |
| lockScroll           | 是否锁定背景滚动                                                                | `boolean`                                                                       | `true`                                                     |
| teleport             | 指定挂载的节点，等同于 Teleport 组件的 to 属性                                  | `string \| Element`                                                             | -                                                          |
| fetchDataFn          | 获取 Picker 数据的函数，如果 `columns` 不存在时会在弹窗打开时调用该函数获取数据 | `(param: TPickerProFetchDataFnParam) => TPickerProFetchDataFnReturn`            | -                                                          |
| beforeClose          | 关闭前的回调函数，返回 false 可阻止关闭，支持返回 Promise                       | `(selectedResult: TPickerProBaseSelectedResult) => boolean \| Promise<boolean>` | -                                                          |

## Events

| 事件名             | 说明         | 回调参数                               |
| ------------------ | ------------ | -------------------------------------- |
| update:show        | 是否显示     | -                                      |
| update:pickerValue | 更新选中的值 | -                                      |
| confirm            | 确认按钮点击 | `params: TPickerProBaseSelectedResult` |
| cancel             | 取消按钮点击 | `params: TPickerProBaseSelectedResult` |

## 类型定义

组件导出以下类型定义：

```ts
import type {
    TPickerProBaseActionType,
    TPickerProBaseSelectedResult,
    TPickerProBaseUnmountParam,
    TShowPickerProBaseResult,
    TPickerProFetchDataFnParam,
    TPickerProData,
    TPickerProFetchDataFnReturn,
    IPickerProProps,
    TShowPickerProOptions
} from "vant-pro"
```

## 主题定制

请参考 [vant](https://vant-ui.github.io/vant/#/zh-CN/home) 中 [ConfigProvider](https://vant-ui.github.io/vant/#/zh-CN/config-provider) 的使用
