<script setup lang="ts">
import { App, Button, Space } from "ant-design-vue"
import dayjs from "dayjs"
// @ts-ignore
import { Lunar } from "lunar-javascript"
import { reactive, ref } from "vue"

import { CalendarPro, showCalendarPro } from "@dyb-dev/vant-pro"

import CellPhoneBox from "@/components/CellPhoneBox.vue"
import JsonViewer from "@/components/JsonViewer.vue"

import type { TCalendarProSelectDate } from "@dyb-dev/vant-pro"
import type { CalendarDayItem } from "vant"

interface IData {
    selectDate: TCalendarProSelectDate
}

/** REACTIVE: 数据 */
const data: IData = reactive({
    selectDate: undefined
})

/** REF: 手机盒子实例 */
const cellPhoneBox = ref<InstanceType<typeof CellPhoneBox>>()

/** EVENT: 函数式调用 */
const onClickButton1 = async() => {

    const _result = await showCalendarPro({
        defaultDate: data.selectDate,
        teleport: cellPhoneBox.value?.boxElement,
        lockScroll: false,
        formatter
    })
    if (_result[0]) {

        data.selectDate = _result[0]

    }

}

/** REF: 是否显示 */
const show = ref(false)

/** EVENT: 组件式调用 */
const onClickButton2 = async() => {

    show.value = true

}

/**
 * FUN: Calendar 格式化函数
 *
 * @param day 当前日期
 * @returns 格式化后的日期
 */
const formatter = (day: CalendarDayItem) => {

    // 如果有日期
    if (day.date) {

        // 根据当前时间 获取 lunar 对象
        const _lunar = Lunar.fromDate(day.date)

        // 获取阳历节日
        const _solarFestival = _lunar.getSolar().getFestivals().join(",") || ""
        // 获取农历节日
        const _lunarFestival = _lunar.getFestivals().join(",") || ""
        // 阳历节日优先显示，因为它们更为常见和重要
        day.topInfo = _solarFestival || _lunarFestival

        // 获取农历日
        const _lunarDay = _lunar.getDayInChinese()
        day.bottomInfo = _lunarDay

        // 获取今天的 dayjs 对象
        const _today = dayjs().startOf("day")

        // 如果是今天，添加 '今天' 标记
        if (dayjs(day.date).isSame(_today, "day")) {

            day.text = "今天"

        }

    }

    return day

}
</script>

<template>
    <App>
        <Space style="width: 100%" direction="vertical" size="middle">
            <Space style="width: 100%" direction="horizontal">
                <Button type="primary" @click="onClickButton1">函数式调用</Button>
                <Button type="primary" @click="onClickButton2">组件式调用</Button>
            </Space>

            <CellPhoneBox ref="cellPhoneBox">
                <CalendarPro
                    v-model:show="show"
                    v-model:select-date="data.selectDate"
                    type="range"
                    :show-confirm="true"
                    :lock-scroll="false"
                    :formatter="formatter"
                />
            </CellPhoneBox>

            <JsonViewer :value="data" :expand-depth="2" />
        </Space>
    </App>
</template>
