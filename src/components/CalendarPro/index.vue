<!--
 * @Author: dyb-dev
 * @Date: 2024-09-02 14:15:13
 * @LastEditors: dyb-dev
 * @LastEditTime: 2024-09-12 13:38:36
 * @FilePath: /vant-pro/src/components/CalendarPro/index.vue
 * @Description: 日历组件增强版(基于 vant 的 `Calendar` 组件)
-->

<script setup lang="ts">
defineOptions({
    /** 设置组件名 */
    name: "CalendarPro"
})

import { useVModels } from "@vueuse/core"
import { Calendar, Popup } from "vant"
import { onMounted, ref, watch } from "vue"

import type { CalendarProps, CalendarType, CalendarDayItem } from "vant"

/** 选择的日期 */
export type TCalendarProSelectDate = Date | Date[] | undefined

/** 组件卸载回调参数 */
export type TCalendarProUnmountParam = [TCalendarProSelectDate]

export interface ICalendarProProps {
    /**
     * @description 是否显示
     */
    show: boolean
    /**
     * @description 选择的日期，组件式调用时使用
     */
    selectDate?: TCalendarProSelectDate
    /**
     * @description 卸载组件 `用于函数式调用`
     * @param ares 卸载回调参数
     */
    unmount?: (...ares: TCalendarProUnmountParam) => void
    /**
     * @description 选择类型：'single' 表示单选，'multiple' 表示多选，'range' 表示范围选择
     * @default "single"
     */
    type?: CalendarType
    /**
     * @description 切换模式：
     * 'none' 表示平铺展示所有月份，不展示切换按钮，
     * 'month' 支持按月切换，展示上个月/下个月按钮，
     * 'year-month' 支持按年切换，也支持按月切换，展示上一年/下一年，上个月/下个月按钮
     * @default "year-month"
     */
    switchMode?: CalendarProps["switchMode"]
    /**
     * @description 日历标题
     * @default "日期选择"
     */
    title?: string
    /**
     * @description 可选择的最小日期
     * @default 10年前
     */
    minDate?: Date
    /**
     * @description 可选择的最大日期
     * @default 10年后
     */
    maxDate?: Date
    /**
     * @description 默认选中的日期，type 为 multiple 或 range 时为数组，传入 null 表示默认不选择
     * @default 今天
     */
    defaultDate?: Date | Date[] | null
    /**
     * @description 日期行高
     * @default 64
     */
    rowHeight?: number | string
    /**
     * @description 日期格式化函数
     */
    formatter?: (day: CalendarDayItem) => CalendarDayItem
    /**
     * @description 是否只渲染可视区域的内容
     * @default true
     */
    lazyRender?: boolean
    /**
     * @description 是否显示月份背景水印
     * @default true
     */
    showMark?: boolean
    /**
     * @description 是否展示日历标题
     * @default true
     */
    showTitle?: boolean
    /**
     * @description 是否展示日历副标题（年月）
     * @default true
     */
    showSubtitle?: boolean
    /**
     * @description 是否展示确认按钮
     * @default false
     */
    showConfirm?: boolean
    /**
     * @description 是否为只读状态，只读状态下不能选择日期
     * @default false
     */
    readonly?: boolean
    /**
     * @description 确认按钮的文字
     * @default "确定"
     */
    confirmText?: string
    /**
     * @description 确认按钮处于禁用状态时的文字
     * @default "确定"
     */
    confirmDisabledText?: string
    /**
     * @description 设置周起始日，0 表示周日，1 表示周一，依此类推
     * @default 1
     */
    firstDayOfWeek?: TNumberRange<0, 6>

    /**
     * @description 日期区间最多可选天数（当 type 为 range、multiple 时有效）
     * @default 无限制
     */
    maxRange?: number | string
    /**
     * @description 范围选择超过最多可选天数时的提示文案（当 type 为 range、multiple 时有效）
     * @default "最多选择 xx 天"
     */
    rangePrompt?: string
    /**
     * @description 是否展示范围选择提示文案（当 type 为 range 时有效）
     * @default true
     */
    showRangePrompt?: boolean
    /**
     * @description 是否允许日期范围的起止时间为同一天（当 type 为 range 时有效）
     * @default false
     */
    allowSameDay?: boolean
    /**
     * @description 是否以弹层的形式展示日历
     * @default true
     */
    poppable?: boolean
    /**
     * @description 是否锁定背景滚动（当 poppable 为 true 时有效）
     * @default true
     */
    lockScroll?: boolean
    /**
     * @description 指定挂载的节点，等同于 Teleport 组件的 to 属性（当 poppable 为 true 时有效）
     */
    teleport?: string | Element
    /**
     * @description 点击并选中任意日期时触发
     * @param date 选中的日期
     */
    select?: (date: TCalendarProSelectDate) => void
    /**
     * @description 点击确认按钮后触发
     * @param date 确认的日期
     */
    confirm?: (date: TCalendarProSelectDate) => void
    /**
     * @description 打开弹出层时触发（当 poppable 为 true 时有效）
     */
    open?: () => void
    /**
     * @description 关闭弹出层时触发（当 poppable 为 true 时有效）
     */
    close?: () => void
    /**
     * @description 打开弹出层且动画结束后触发（当 poppable 为 true 时有效）
     */
    opened?: () => void
    /**
     * @description 关闭弹出层且动画结束后触发（当 poppable 为 true 时有效）
     */
    closed?: () => void
    /**
     * @description 当日历组件的 type 为 multiple 时，取消选中日期时触发
     * @param date 取消选中的日期
     */
    unselect?: (date: Date) => void
    /**
     * @description 当某个月份进入可视区域时触发
     * @param date 当前的日期
     * @param title 当前的月份标题
     */
    monthShow?: (date: Date, title: string) => void
    /**
     * @description 范围选择超过最多可选天数时触发
     */
    overRange?: () => void
    /**
     * @description 点击日历副标题时触发
     * @param e 鼠标事件
     */
    clickSubtitle?: (e: MouseEvent) => void
    /**
     * @description 点击禁用日期时触发
     * @param date 禁用的日期
     */
    clickDisabledDate?: (date: TCalendarProSelectDate) => void
    /**
     * @description 日历面板切换时触发
     * @param date 切换到的日期
     */
    panelChange?: (date: Date) => void
}

const props = withDefaults(defineProps<ICalendarProProps>(), {
    /** 是否显示 */
    show: false,
    /** 是否以弹层的形式展示日历 */
    poppable: true,
    /** 是否锁定背景滚动 */
    lockScroll: true,
    /** 选择类型 */
    type: "single",
    /** 切换模式 默认：year-month：支持按钮按年切换，也支持按钮按月切换，可选：none：不支持按钮切换，平铺展示所有月份、year-month：支持按钮按月切换 */
    switchMode: "year-month",
    /** 是否展示确认按钮 */
    showConfirm: false,
    /** 设置周起始日 0-6 */
    firstDayOfWeek: 1,
    /**
     * @returns {Date} 默认选中的日期
     */
    defaultDate: () => new Date(),
    /**
     * @returns {Date} 可选择的最小日期
     */
    minDate: () => {

        const _today = new Date()
        _today.setFullYear(_today.getFullYear() - 10) // 减少10年
        return _today

    },
    /**
     * @returns {Date} 可选择的最大日期
     */
    maxDate: () => {

        const _today = new Date()
        _today.setFullYear(_today.getFullYear() + 10) // 增加10年
        return _today

    },
    /** 是否展示日历标题 */
    showTitle: true,
    /** 是否显示月份背景水印 */
    showMark: true,
    /** 是否展示日历副标题（年月） */
    showSubtitle: true,
    /** 是否展示范围选择提示文案（当 type 为 range 时有效）*/
    showRangePrompt: true
})

const emits = defineEmits<{
    /** 是否显示 */
    (event: "update:show", value: boolean): void
    /** 选择的日期 */
    (event: "update:selectDate", date: TCalendarProSelectDate): void

    /** 打开弹出层时触发（当 poppable 为 true 时有效） */
    (event: "open"): void
    /** 关闭弹出层时触发（当 poppable 为 true 时有效） */
    (event: "close"): void
    /** 打开弹出层且动画结束后触发（当 poppable 为 true 时有效） */
    (event: "opened"): void
    /** 关闭弹出层且动画结束后触发（当 poppable 为 true 时有效） */
    (event: "closed"): void

    /** 点击并选中任意日期时触发 */
    (event: "select", date: TCalendarProSelectDate): void
    /** 点击确认按钮后触发 */
    (event: "confirm", date: TCalendarProSelectDate): void
    /** 当日历组件的 type 为 multiple 时，取消选中日期时触发 */
    (event: "unselect", date: Date): void
    /** 当某个月份进入可视区域时触发 */
    (event: "monthShow", { date, title }: { date: Date; title: string }): void
    /** 范围选择超过最多可选天数时触发 */
    (event: "overRange"): void
    /** 点击日历副标题时触发 */
    (event: "clickSubtitle", e: MouseEvent): void
    /** 点击禁用日期时触发 */
    (event: "clickDisabledDate", date: TCalendarProSelectDate): void
    /** 日历面板切换时触发 */
    (event: "panelChange", { date }: { date: Date }): void
}>()

/** REF: 定义双向绑定 */
const { show, selectDate } = useVModels(props, emits)

/** REF: 是否显示日历 */
const _show = ref(false)

/** REF: 选择日期 函数式调用时使用 */
const _selectDate = ref<TCalendarProSelectDate>()

/** WATCH: 监听 visible 的变化 */
watch(show, newValue => {

    // 将 visible 的值赋值给 _isShow
    _show.value = newValue

})

/** LIFECYCLE: 渲染 */
onMounted(() => {

    _show.value = show.value

})

/**
 * EVENT: 选择日期回调
 *
 * @param date 当前日期
 */
const onSelect = async(date: TCalendarProSelectDate) => {

    if (props.select && typeof props.select === "function") {

        props.select(date)

    }
    /** 不显示确认按钮的时候 */
    if (!props.showConfirm) {

        _close(date)

    }
    emits("select", date)

}

/**
 * EVENT: 确认回调
 *
 * @param date 当前日期
 */
const onConfirm = async(date: TCalendarProSelectDate) => {

    if (props.confirm && typeof props.confirm === "function") {

        props.confirm(date)

    }

    _close(date)
    emits("confirm", date)

}

/**
 * FUN: 关闭日历
 *
 * @param date 当前日期
 */
const _close = (date?: TCalendarProSelectDate) => {

    // 作用：组件式调用
    show.value = false
    // 作用：函数式调用
    _show.value = false
    if (date) {

        selectDate.value = date
        _selectDate.value = date

    }

}

/** EVENT: 打开弹出层回调 */
const onOpen = () => {

    if (props.open && typeof props.open === "function") {

        props.open()

    }
    emits("open")

}

/** EVENT: 关闭弹出层回调 */
const onClose = () => {

    if (props.close && typeof props.close === "function") {

        props.close()

    }
    emits("close")

}

/** EVENT: 打开弹出层且动画结束后触发 */
const onOpened = () => {

    if (props.opened && typeof props.opened === "function") {

        props.opened()

    }
    emits("opened")

}

/** EVENT: 关闭弹出层且动画结束后触发 */
const onClosed = () => {

    if (props.closed && typeof props.closed === "function") {

        props.closed()

    }
    emits("closed")
    _close()
    props.unmount?.(_selectDate.value)

}

/**
 * EVENT: 当日历组件的 type 为 multiple 时，取消选中日期时触发
 *
 * @param date 当前日期
 */
const onUnselect = (date: Date) => {

    if (props.unselect && typeof props.unselect === "function") {

        props.unselect(date)

    }
    emits("unselect", date)

}

/**
 * EVENT: 当某个月份进入可视区域时触发
 *
 * @param date 当前日期
 * @param title 当前标题
 */
const onMonthShow = (date: Date, title: string) => {

    if (props.monthShow && typeof props.monthShow === "function") {

        props.monthShow(date, title)

    }
    emits("monthShow", { date, title })

}

/** EVENT: 范围选择超过最多可选天数时触发 */
const onOverRange = () => {

    if (props.overRange && typeof props.overRange === "function") {

        props.overRange()

    }
    emits("overRange")

}

/**
 * EVENT: 点击日历副标题时触发
 *
 * @param e 鼠标事件
 */
const onClickSubtitle = (e: MouseEvent) => {

    if (props.clickSubtitle && typeof props.clickSubtitle === "function") {

        props.clickSubtitle(e)

    }
    emits("clickSubtitle", e)

}

/**
 * EVENT: 点击禁用日期时触发
 *
 * @param date 当前日期
 */
const onClickDisabledDate = (date: TCalendarProSelectDate) => {

    if (props.clickDisabledDate && typeof props.clickDisabledDate === "function") {

        props.clickDisabledDate(date)

    }
    emits("clickDisabledDate", date)

}

/**
 * EVENT: 日历面板切换时触发
 *
 * @param date 当前日期
 */
const onPanelChange = (date: Date) => {

    if (props.panelChange && typeof props.panelChange === "function") {

        props.panelChange(date)

    }
    emits("panelChange", { date })

}
</script>

<template>
    <Popup
        v-if="props.poppable"
        class="vant-pro-calendar-pro"
        style="height: 80%"
        v-model:show="_show"
        position="bottom"
        :round="true"
        :closeable="false"
        :z-index="2001"
        :lock-scroll="props.lockScroll"
        :teleport="props.teleport"
        @open="onOpen"
        @close="onClose"
        @opened="onOpened"
        @closed="onClosed"
    >
        <Calendar
            :type="props.type"
            :switch-mode="props.switchMode"
            :title="props.title"
            :min-date="props.minDate"
            :max-date="props.maxDate"
            :default-date="props.defaultDate"
            :row-height="props.rowHeight"
            :lazy-render="props.lazyRender"
            :show-mark="props.showMark"
            :show-title="props.showTitle"
            :show-subtitle="props.showSubtitle"
            :show-confirm="props.showConfirm"
            :readonly="props.readonly"
            :confirm-text="props.confirmText"
            :confirm-disabled-text="props.confirmDisabledText"
            :first-day-of-week="props.firstDayOfWeek"
            :max-range="props.maxRange"
            :range-prompt="props.rangePrompt"
            :show-range-prompt="props.showRangePrompt"
            :allow-same-day="props.allowSameDay"
            :formatter="props.formatter"
            :poppable="false"
            color="var(--van-primary-color)"
            @select="onSelect"
            @confirm="onConfirm"
            @unselect="onUnselect"
            @month-show="onMonthShow"
            @over-range="onOverRange"
            @click-subtitle="onClickSubtitle"
            @click-disabled-date="onClickDisabledDate"
            @panel-change="onPanelChange"
        />
    </Popup>

    <Calendar
        v-else
        class="vant-pro-calendar-pro"
        :type="props.type"
        :switch-mode="props.switchMode"
        :title="props.title"
        :min-date="props.minDate"
        :max-date="props.maxDate"
        :default-date="props.defaultDate"
        :row-height="props.rowHeight"
        :lazy-render="props.lazyRender"
        :show-mark="props.showMark"
        :show-title="props.showTitle"
        :show-subtitle="props.showSubtitle"
        :show-confirm="props.showConfirm"
        :readonly="props.readonly"
        :confirm-text="props.confirmText"
        :confirm-disabled-text="props.confirmDisabledText"
        :first-day-of-week="props.firstDayOfWeek"
        :max-range="props.maxRange"
        :range-prompt="props.rangePrompt"
        :show-range-prompt="props.showRangePrompt"
        :allow-same-day="props.allowSameDay"
        :formatter="props.formatter"
        :poppable="false"
        color="var(--van-primary-color)"
        @select="onSelect"
        @confirm="onConfirm"
        @unselect="onUnselect"
        @month-show="onMonthShow"
        @over-range="onOverRange"
        @click-subtitle="onClickSubtitle"
        @click-disabled-date="onClickDisabledDate"
        @panel-change="onPanelChange"
    />
</template>

<style lang="scss">
.vant-pro-calendar-pro {
    & .van-calendar__body {
        @include hide-scroll-bar-mixin;
    }

    & .van-calendar__header-title,
    & .van-badge__wrapper,
    & .van-calendar__header-subtitle,
    & .van-calendar__header-action,
    & .van-calendar__weekdays,
    & .van-calendar__month-mark {
        color: var(--van-primary-color);
    }

    & .van-calendar__month-mark {
        opacity: 0.4;
    }

    & .van-calendar__top-info {
        @include text-ellipsis-mixin;
    }
}
</style>
