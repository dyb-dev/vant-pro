# CalendarPro 日历

## 介绍

主要用于选择日期或日期区间，基于 [vant](https://vant-ui.github.io/vant/#/zh-CN/home) 的组件进行二次封装。使用了以下组件：

-   [Popup](https://vant-ui.github.io/vant/#/zh-CN/popup) 用于弹窗显示
-   [Calendar](https://vant-ui.github.io/vant/#/zh-CN/calendar) 用于展示日历

## 引入

全局注册:

```ts
import { createApp } from "vue"
import { CalendarPro } from "@dyb-dev/vant-pro"

const app = createApp()
app.use(CalendarPro)
```

::: tip 提示
由于内部使用了 **dayjs** 和 **lunar-javascript** 这2个库，所以还需安装:

```shell
# 处理日期和时间的库
pnpm i dayjs

# 公历、农历数据来源
pnpm i lunar-javascript
```

:::

## 代码演示

<preview path="./index.vue" title="源代码 ⬇️"></preview>

## API

vant-pro 中导出了 CalendarPro 相关的辅助函数:

| 方法名            | 说明                           | 参数                                | 返回值                            |
| ----------------- | ------------------------------ | ----------------------------------- | --------------------------------- |
| `showCalendarPro` | 显示日历弹窗，用户可以选择日期 | `options?: TShowCalendarProOptions` | `Promise<TShowCalendarProResult>` |

## TShowCalendarProOptions

调用 `showCalendarPro` 等方法时，支持传入以下选项：

| 参数                | 说明                                                                         | 类型                                        | 默认值             |
| ------------------- | ---------------------------------------------------------------------------- | ------------------------------------------- | ------------------ |
| type                | 选择类型：'single' 表示单选，'multiple' 表示多选，'range' 表示范围选择       | `CalendarType`                              | `"single"`         |
| switchMode          | 切换模式：'none'、'month'、'year-month'                                      | `CalendarProps["switchMode"]`               | `"year-month"`     |
| title               | 日历标题                                                                     | `string`                                    | `"日期选择"`       |
| minDate             | 可选择的最小日期                                                             | `Date`                                      | `2000/1/1`         |
| maxDate             | 可选择的最大日期                                                             | `Date`                                      | `10年后`           |
| defaultDate         | 默认选中的日期                                                               | `Date \| Date[] \| null`                    | `今天`             |
| rowHeight           | 日期行高                                                                     | `number \| string`                          | `64`               |
| formatter           | 日期格式化函数                                                               | `(day: CalendarDayItem) => CalendarDayItem` | -                  |
| lazyRender          | 是否只渲染可视区域的内容                                                     | `boolean`                                   | `true`             |
| showMark            | 是否显示月份背景水印                                                         | `boolean`                                   | `true`             |
| showTitle           | 是否展示日历标题                                                             | `boolean`                                   | `true`             |
| showSubtitle        | 是否展示日历副标题（年月）                                                   | `boolean`                                   | `true`             |
| showConfirm         | 是否展示确认按钮                                                             | `boolean`                                   | `false`            |
| readonly            | 是否为只读状态，只读状态下不能选择日期                                       | `boolean`                                   | `false`            |
| confirmText         | 确认按钮的文字                                                               | `string`                                    | `"确定"`           |
| confirmDisabledText | 确认按钮处于禁用状态时的文字                                                 | `string`                                    | `"确定"`           |
| firstDayOfWeek      | 设置周起始日，0 表示周日，1 表示周一                                         | `TNumberRange<0, 6>`                        | `1`                |
| maxRange            | 日期区间最多可选天数（当 type 为 range、multiple 时有效）                    | `number \| string`                          | `无限制`           |
| rangePrompt         | 范围选择超过最多可选天数时的提示文案                                         | `string`                                    | `"最多选择 xx 天"` |
| showRangePrompt     | 是否展示范围选择提示文案                                                     | `boolean`                                   | `true`             |
| allowSameDay        | 是否允许日期范围的起止时间为同一天                                           | `boolean`                                   | `false`            |
| lockScroll          | 是否锁定背景滚动（当 poppable 为 true 时有效）                               | `boolean`                                   | `true`             |
| teleport            | 指定挂载的节点，等同于 Teleport 组件的 to 属性（当 poppable 为 true 时有效） | `string \| Element`                         | -                  |
| confirm             | 点击确认按钮后触发                                                           | `(date: TCalendarProSelectDate) => void`    | -                  |
| open                | 打开弹出层时触发（当 poppable 为 true 时有效）                               | `() => void`                                | -                  |
| close               | 关闭弹出层时触发（当 poppable 为 true 时有效）                               | `() => void`                                | -                  |
| opened              | 打开弹出层且动画结束后触发（当 poppable 为 true 时有效）                     | `() => void`                                | -                  |
| closed              | 关闭弹出层且动画结束后触发（当 poppable 为 true 时有效）                     | `() => void`                                | -                  |
| unselect            | 当日历组件的 type 为 multiple 时，取消选中日期时触发                         | `(date: Date) => void`                      | -                  |
| monthShow           | 当某个月份进入可视区域时触发                                                 | `(date: Date, title: string) => void`       | -                  |
| overRange           | 范围选择超过最多可选天数时触发                                               | `() => void`                                | -                  |
| clickSubtitle       | 点击日历副标题时触发                                                         | `(e: MouseEvent) => void`                   | -                  |
| clickDisabledDate   | 点击禁用日期时触发                                                           | `(date: TCalendarProSelectDate) => void`    | -                  |
| panelChange         | 日历面板切换时触发                                                           | `(date: Date) => void`                      | -                  |

## Props

| 参数                | 说明                                                                         | 类型                                        | 默认值             |
| ------------------- | ---------------------------------------------------------------------------- | ------------------------------------------- | ------------------ |
| v-model:show        | 是否显示                                                                     | `boolean`                                   | -                  |
| v-model:selectDate  | 选择的日期，组件式调用时使用                                                 | `TCalendarProSelectDate`                    | -                  |
| type                | 选择类型：'single' 表示单选，'multiple' 表示多选，'range' 表示范围选择       | `CalendarType`                              | `"single"`         |
| switchMode          | 切换模式：'none'、'month'、'year-month'                                      | `CalendarProps["switchMode"]`               | `"year-month"`     |
| title               | 日历标题                                                                     | `string`                                    | `"日期选择"`       |
| minDate             | 可选择的最小日期                                                             | `Date`                                      | `2000/1/1`         |
| maxDate             | 可选择的最大日期                                                             | `Date`                                      | `10年后`           |
| defaultDate         | 默认选中的日期，type 为 multiple 或 range 时为数组，传入 null 表示默认不选择 | `Date \| Date[] \| null`                    | `今天`             |
| rowHeight           | 日期行高                                                                     | `number \| string`                          | `64`               |
| formatter           | 日期格式化函数                                                               | `(day: CalendarDayItem) => CalendarDayItem` | -                  |
| lazyRender          | 是否只渲染可视区域的内容                                                     | `boolean`                                   | `true`             |
| showMark            | 是否显示月份背景水印                                                         | `boolean`                                   | `true`             |
| showTitle           | 是否展示日历标题                                                             | `boolean`                                   | `true`             |
| showSubtitle        | 是否展示日历副标题（年月）                                                   | `boolean`                                   | `true`             |
| showConfirm         | 是否展示确认按钮                                                             | `boolean`                                   | `false`            |
| readonly            | 是否为只读状态，只读状态下不能选择日期                                       | `boolean`                                   | `false`            |
| confirmText         | 确认按钮的文字                                                               | `string`                                    | `"确定"`           |
| confirmDisabledText | 确认按钮处于禁用状态时的文字                                                 | `string`                                    | `"确定"`           |
| firstDayOfWeek      | 设置周起始日，0 表示周日，1 表示周一                                         | `TNumberRange<0, 6>`                        | `1`                |
| maxRange            | 日期区间最多可选天数（当 type 为 range、multiple 时有效）                    | `number \| string`                          | `无限制`           |
| rangePrompt         | 范围选择超过最多可选天数时的提示文案                                         | `string`                                    | `"最多选择 xx 天"` |
| showRangePrompt     | 是否展示范围选择提示文案                                                     | `boolean`                                   | `true`             |
| allowSameDay        | 是否允许日期范围的起止时间为同一天                                           | `boolean`                                   | `false`            |
| poppable            | 是否以弹层的形式展示日历                                                     | `boolean`                                   | `true`             |
| lockScroll          | 是否锁定背景滚动（当 poppable 为 true 时有效）                               | `boolean`                                   | `true`             |
| teleport            | 指定挂载的节点，等同于 Teleport 组件的 to 属性（当 poppable 为 true 时有效） | `string \| Element`                         | -                  |
| select              | 点击并选中任意日期时触发                                                     | `(date: TCalendarProSelectDate) => void`    | -                  |
| confirm             | 点击确认按钮后触发                                                           | `(date: TCalendarProSelectDate) => void`    | -                  |
| open                | 打开弹出层时触发（当 poppable 为 true 时有效）                               | `() => void`                                | -                  |
| close               | 关闭弹出层时触发（当 poppable 为 true 时有效）                               | `() => void`                                | -                  |
| opened              | 打开弹出层且动画结束后触发（当 poppable 为 true 时有效）                     | `() => void`                                | -                  |
| closed              | 关闭弹出层且动画结束后触发（当 poppable 为 true 时有效）                     | `() => void`                                | -                  |
| unselect            | 当日历组件的 type 为 multiple 时，取消选中日期时触发                         | `(date: Date) => void`                      | -                  |
| monthShow           | 当某个月份进入可视区域时触发                                                 | `(date: Date, title: string) => void`       | -                  |
| overRange           | 范围选择超过最多可选天数时触发                                               | `() => void`                                | -                  |
| clickSubtitle       | 点击日历副标题时触发                                                         | `(e: MouseEvent) => void`                   | -                  |
| clickDisabledDate   | 点击禁用日期时触发                                                           | `(date: TCalendarProSelectDate) => void`    | -                  |
| panelChange         | 日历面板切换时触发                                                           | `(date: Date) => void`                      | -                  |

## Events

::: tip 提示
下方展示的是新增的扩展选项，其他选项还请查看 [Events](https://vant-ui.github.io/vant/#/zh-CN/calendar#events)
:::

| 事件名            | 说明       | 回调参数                       |
| ----------------- | ---------- | ------------------------------ |
| update:selectDate | 选择的日期 | `date: TCalendarProSelectDate` |

## 类型定义

组件导出以下类型定义：

```ts
import type {
    TCalendarProSelectDate,
    TCalendarProUnmountParam,
    ICalendarProProps,
    TShowCalendarProOptions,
    TShowCalendarProResult
} from "@dyb-dev/vant-pro"
```

## 主题定制

请参考 [vant](https://vant-ui.github.io/vant/#/zh-CN/home) 中 [ConfigProvider](https://vant-ui.github.io/vant/#/zh-CN/config-provider) 的使用
