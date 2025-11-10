<script setup lang="tsx">
import { areaList } from "@vant/area-data"
import { App, Button, Space } from "ant-design-vue"
import { reactive, ref } from "vue"

import { AreaPickerPro, showAreaPickerPro } from "@dyb-dev/vant-pro"

import CellPhoneBox from "@/components/CellPhoneBox.vue"
import JsonViewer from "@/components/JsonViewer.vue"

import type { TAreaPickerProSelectedResult } from "@dyb-dev/vant-pro"

interface IData {
    /** 当前地区编码 */
    areaCode: string
    /** 当前选择器值 */
    pickerValue: (string | number)[]
    /** 当前选中结果 */
    selectResult: TAreaPickerProSelectedResult | null
}

/** REACTIVE: 数据 */
const data: IData = reactive({
    areaCode: "",
    pickerValue: [],
    selectResult: null
})

/** REF: 手机盒子实例 */
const cellPhoneBox = ref<InstanceType<typeof CellPhoneBox>>()

/** EVENT: 函数式调用 */
const onClickButton1 = async() => {

    const _result = await showAreaPickerPro({
        areaList,
        areaCode: data.areaCode,
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
        data.areaCode = data.selectResult.selectedAreaCode
        data.pickerValue = data.selectResult.selectedValues

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
const onConfirm = (selectResult: TAreaPickerProSelectedResult) => {

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
                <AreaPickerPro
                    v-model:show="show"
                    v-model:area-code="data.areaCode"
                    v-model:picker-value="data.pickerValue"
                    :area-list="areaList"
                    :lock-scroll="false"
                    @confirm="onConfirm"
                />
            </CellPhoneBox>

            <JsonViewer :value="data" :expand-depth="2" />
        </Space>
    </App>
</template>
