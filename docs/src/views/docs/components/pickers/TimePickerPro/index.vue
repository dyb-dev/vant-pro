<script setup lang="ts">
import { App, Button, Space } from "ant-design-vue"
import dayjs from "dayjs"
import { reactive, ref } from "vue"

import { showTimePickerPro, TimePickerPro } from "@dyb-dev/vant-pro"

import CellPhoneBox from "@/components/CellPhoneBox.vue"
import JsonViewer from "@/components/JsonViewer.vue"

import type { TPickerProBaseSelectedResult } from "@dyb-dev/vant-pro"

interface IData {
    /** 当前选择器值 */
    pickerValue: string[]
    /** 当前选中结果 */
    selectResult: TPickerProBaseSelectedResult | null
}

/** REACTIVE: 数据 */
const data: IData = reactive({
    pickerValue: [
        dayjs().hour().toString(), // 当前小时转为字符串
        dayjs().minute().toString() // 当前分钟转为字符串
    ],
    selectResult: null
})

/** REF: 手机盒子实例 */
const cellPhoneBox = ref<InstanceType<typeof CellPhoneBox>>()

/** EVENT: 函数式调用 */
const onClickButton1 = async() => {

    const _result = await showTimePickerPro({
        pickerValue: data.pickerValue,
        teleport: cellPhoneBox.value?.boxElement,
        lockScroll: false,
        async beforeClose(action) {

            if (action.actionType === "confirm" && action.selectedValues.length > 0) {

                // 模拟其他操作
                await delay(500)

            }
            return true

        }
    })
    if (_result[0].actionType === "confirm" && _result[0].selectedValues.length > 0) {

        data.selectResult = _result[0]
        data.pickerValue = <string[]>data.selectResult.selectedValues

    }

}

/** REF: 是否显示 */
const show = ref(false)

/** EVENT: 组件式调用 */
const onClickButton2 = async() => {

    show.value = true

}

/**
 * EVENT: 组件式调用时点击确认按钮
 *
 * @param selectResult 选中结果
 */
const onConfirm = (selectResult: TPickerProBaseSelectedResult) => {

    data.selectResult = selectResult

}

/**
 * FUN: 延迟
 *
 * @param ms 毫秒
 * @returns Promise<void>
 */
const delay = (ms: number): Promise<void> => {

    return new Promise<void>(resolve => setTimeout(resolve, ms))

}
</script>

<template>
    <App>
        <Space style="width: 100%" direction="vertical" size="middle">
            <Space style="width: 100%" direction="horizontal">
                <Button type="primary" @click="onClickButton1">函数式调用</Button>
                <Button type="primary" @click="onClickButton2">组件式调用</Button>
            </Space>

            <CellPhoneBox class="cell-phone-box" ref="cellPhoneBox">
                <TimePickerPro
                    v-model:show="show"
                    v-model:picker-value="data.pickerValue"
                    :lock-scroll="false"
                    @confirm="onConfirm"
                />
            </CellPhoneBox>

            <JsonViewer :value="data" :expand-depth="2" />
        </Space>
    </App>
</template>
