<script setup lang="ts">
import { App, Button, Space } from "ant-design-vue"
import { reactive, ref } from "vue"

import { CalendarPro, showCalendarPro } from "@dyb-dev/vant-pro"

import CellPhoneBox from "@/components/CellPhoneBox.vue"
import JsonViewer from "@/components/JsonViewer.vue"

import type { TCalendarProSelectDate } from "@dyb-dev/vant-pro"

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
        lockScroll: false
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
                />
            </CellPhoneBox>

            <JsonViewer :value="data" :expand-depth="2" />
        </Space>
    </App>
</template>
