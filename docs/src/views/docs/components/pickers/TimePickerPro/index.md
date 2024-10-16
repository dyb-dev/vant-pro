# TimePickerPro 时间选择器

## 介绍

主要用于时、分、秒选择，支持单独选择和联动选择，基于 [vant](https://vant-ui.github.io/vant/#/zh-CN/home) 的组件进行二次封装。使用了以下组件：

-   [Popup](https://vant-ui.github.io/vant/#/zh-CN/popup) 用于弹窗显示
-   [TimePicker](https://vant-ui.github.io/vant/#/zh-CN/time-picker) 用于日期和时间选择
-   [Loading](https://vant-ui.github.io/vant/#/zh-CN/loading) 用于显示加载状态

## 引入

全局注册:

```ts
import { createApp } from "vue"
import { TimePickerPro } from "@dyb-dev/vant-pro"

const app = createApp()
app.use(TimePickerPro)
```

## 代码演示

::: tip 提示
TimePickerPro 滑动选择只在移动端正常使用
:::

<preview path="./index.vue" title="源代码 ⬇️"></preview>

## API

vant-pro 中导出了 TimePickerPro 相关的辅助函数:

| 方法名              | 说明                     | 参数                                  | 返回值                          |
| ------------------- | ------------------------ | ------------------------------------- | ------------------------------- |
| `showTimePickerPro` | 显示时间选择器增强版弹窗 | `options?: TShowTimePickerProOptions` | `Promise<TTimePickerProResult>` |

## TShowTimePickerProOptions

调用 `showTimePickerPro` 等方法时，支持传入以下选项：

| 参数              | 说明                                                                                | 类型                                                                            | 默认值               |
| ----------------- | ----------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | -------------------- |
| pickerValue       | 时间选择器的值                                                                      | `string[]`                                                                      | -                    |
| columnsType       | 选项类型，由 hour、minute 和 second 组成的数组                                      | `TimePickerColumnType[]`                                                        | `['hour', 'minute']` |
| minHour           | 可选的最小小时                                                                      | `number \| string`                                                              | `0`                  |
| maxHour           | 可选的最大小时                                                                      | `number \| string`                                                              | `23`                 |
| minMinute         | 可选的最小分钟                                                                      | `number \| string`                                                              | `0`                  |
| maxMinute         | 可选的最大分钟                                                                      | `number \| string`                                                              | `59`                 |
| minSecond         | 可选的最小秒数                                                                      | `number \| string`                                                              | `0`                  |
| maxSecond         | 可选的最大秒数                                                                      | `number \| string`                                                              | `59`                 |
| minTime           | 可选的最小时间，格式参考 07:40:00，使用时 min-hour、min-minute、min-second 不会生效 | `string`                                                                        | -                    |
| maxTime           | 可选的最大时间，格式参考 10:20:00，使用时 max-hour、max-minute、max-second 不会生效 | `string`                                                                        | -                    |
| title             | 顶部栏标题                                                                          | `string`                                                                        | `"请选择时间"`       |
| confirmButtonText | 确认按钮文字，设置为空字符串可以隐藏按钮                                            | `string`                                                                        | `"确认"`             |
| cancelButtonText  | 取消按钮文字，设置为空字符串可以隐藏按钮                                            | `string`                                                                        | `"取消"`             |
| visibleOptionNum  | 可见的选项个数                                                                      | `number`                                                                        | `6`                  |
| optionHeight      | 选项高度，支持 px, vw, vh, rem 单位，默认 px                                        | `number \| string`                                                              | `44`                 |
| swipeDuration     | 快速滑动时惯性滚动的时长，单位 ms                                                   | `number \| string`                                                              | `1000`               |
| lockScroll        | 是否锁定背景滚动                                                                    | `boolean`                                                                       | `true`               |
| teleport          | 指定挂载的节点，等同于 Teleport 组件的 to 属性                                      | `string \| Element`                                                             | -                    |
| filter            | 选项过滤函数                                                                        | `(type: TimePickerColumnType, options: PickerOption[]) => PickerOption[]`       | -                    |
| formatter         | 选项格式化函数                                                                      | `(type: TimePickerColumnType, option: PickerOption) => PickerOption`            | -                    |
| beforeClose       | 关闭前的回调函数，返回 false 可阻止关闭，支持返回 Promise                           | `(selectedResult: TPickerProBaseSelectedResult) => boolean \| Promise<boolean>` | -                    |

## Props

| 参数                | 说明                                                                                | 类型                                                                            | 默认值               |
| ------------------- | ----------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | -------------------- |
| v-model:show        | 是否显示                                                                            | `boolean`                                                                       | -                    |
| v-model:pickerValue | 时间选择器的值                                                                      | `string[]`                                                                      | -                    |
| columnsType         | 选项类型，由 hour、minute 和 second 组成的数组                                      | `TimePickerColumnType[]`                                                        | `['hour', 'minute']` |
| minHour             | 可选的最小小时                                                                      | `number \| string`                                                              | `0`                  |
| maxHour             | 可选的最大小时                                                                      | `number \| string`                                                              | `23`                 |
| minMinute           | 可选的最小分钟                                                                      | `number \| string`                                                              | `0`                  |
| maxMinute           | 可选的最大分钟                                                                      | `number \| string`                                                              | `59`                 |
| minSecond           | 可选的最小秒数                                                                      | `number \| string`                                                              | `0`                  |
| maxSecond           | 可选的最大秒数                                                                      | `number \| string`                                                              | `59`                 |
| minTime             | 可选的最小时间，格式参考 07:40:00，使用时 min-hour、min-minute、min-second 不会生效 | `string`                                                                        | -                    |
| maxTime             | 可选的最大时间，格式参考 10:20:00，使用时 max-hour、max-minute、max-second 不会生效 | `string`                                                                        | -                    |
| title               | 顶部栏标题                                                                          | `string`                                                                        | `"请选择时间"`       |
| confirmButtonText   | 确认按钮文字，设置为空字符串可以隐藏按钮                                            | `string`                                                                        | `"确认"`             |
| cancelButtonText    | 取消按钮文字，设置为空字符串可以隐藏按钮                                            | `string`                                                                        | `"取消"`             |
| visibleOptionNum    | 可见的选项个数                                                                      | `number`                                                                        | `6`                  |
| optionHeight        | 选项高度，支持 px, vw, vh, rem 单位，默认 px                                        | `number \| string`                                                              | `44`                 |
| swipeDuration       | 快速滑动时惯性滚动的时长，单位 ms                                                   | `number \| string`                                                              | `1000`               |
| lockScroll          | 是否锁定背景滚动                                                                    | `boolean`                                                                       | `true`               |
| teleport            | 指定挂载的节点，等同于 Teleport 组件的 to 属性                                      | `string \| Element`                                                             | -                    |
| filter              | 选项过滤函数                                                                        | `(type: TimePickerColumnType, options: PickerOption[]) => PickerOption[]`       | -                    |
| formatter           | 选项格式化函数                                                                      | `(type: TimePickerColumnType, option: PickerOption) => PickerOption`            | -                    |
| beforeClose         | 关闭前的回调函数，返回 false 可阻止关闭，支持返回 Promise                           | `(selectedResult: TPickerProBaseSelectedResult) => boolean \| Promise<boolean>` | -                    |

## Events

| 事件名             | 说明         | 回调参数                                       |
| ------------------ | ------------ | ---------------------------------------------- |
| update:show        | 是否显示     | -                                              |
| update:pickerValue | 更新选中的值 | -                                              |
| confirm            | 确认按钮点击 | `selectedResult: TPickerProBaseSelectedResult` |
| cancel             | 取消按钮点击 | `selectedResult: TPickerProBaseSelectedResult` |

## 类型定义

组件导出以下类型定义：

```ts
import type { ITimePickerProProps, TShowTimePickerProOptions } from "@dyb-dev/vant-pro"
```

## 主题定制

请参考 [vant](https://vant-ui.github.io/vant/#/zh-CN/home) 中 [ConfigProvider](https://vant-ui.github.io/vant/#/zh-CN/config-provider) 的使用
