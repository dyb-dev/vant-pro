<script setup lang="tsx">
import { App, Button, Space } from "ant-design-vue"
import { reactive, ref } from "vue"

import { PickerPro, showPickerPro } from "@dyb-dev/vant-pro"

import CellPhoneBox from "@/components/CellPhoneBox.vue"
import JsonViewer from "@/components/JsonViewer.vue"

import type { TPickerProBaseSelectedResult } from "@dyb-dev/vant-pro"

interface IData {
    /** 搜索关键字 */
    searchKeyword: string
    /** 当前选择器值 */
    pickerValue: (string | number)[]
    /** 当前选中结果 */
    selectResult: TPickerProBaseSelectedResult | null
}

/** REACTIVE: 数据 */
const data: IData = reactive({
    searchKeyword: "",
    pickerValue: [],
    selectResult: null
})

/** REF: 手机盒子实例 */
const cellPhoneBox = ref<InstanceType<typeof CellPhoneBox>>()

/** CONST: 数据 */
const columns = [
    {
        cityName: "浙江",
        cities: [
            {
                cityName: "杭州",
                cities: [{ cityName: "西湖区" }, { cityName: "余杭区" }]
            },
            {
                cityName: "温州",
                cities: [{ cityName: "鹿城区" }, { cityName: "瓯海区" }]
            }
        ]
    },
    {
        cityName: "福建",
        cities: [
            {
                cityName: "福州",
                cities: [{ cityName: "鼓楼区" }, { cityName: "台江区" }]
            },
            {
                cityName: "厦门",
                cities: [{ cityName: "思明区" }, { cityName: "海沧区" }]
            }
        ]
    }
]

/** CONST: 字段名映射 */
const columnsFieldNames = {
    text: "cityName",
    value: "cityName",
    children: "cities"
}

/** EVENT: 函数式调用 */
const onClickButton1 = async () => {

    const _result = await showPickerPro({
        showSearch: true,
        pickerValue: data.pickerValue,
        teleport: cellPhoneBox.value?.boxElement,
        lockScroll: false,
        columnsFieldNames,
        async fetchDataFn (param) {

            data.searchKeyword = param.keyword

            await delay(500)
            // 模拟错误操作
            if (param.keyword === "test") {

                return

            }

            return columns

        },
        async beforeClose (action) {

            if (action.actionType === "confirm" && action.selectedValues.length > 0) {

                // 模拟其他操作
                await delay(500)

            }
            return true

        }
    })
    if (_result[0].actionType === "confirm" && _result[0].selectedValues.length > 0) {

        data.selectResult = _result[0]
        data.pickerValue = data.selectResult.selectedValues

    }

}

/** REF: 是否显示 */
const show = ref(false)

/** EVENT: 组件式调用 */
const onClickButton2 = async () => {

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
                <PickerPro
                    v-model:show="show"
                    v-model:picker-value="data.pickerValue"
                    :columns="columns"
                    :columns-field-names="columnsFieldNames"
                    :lock-scroll="false"
                    @confirm="onConfirm"
                />
            </CellPhoneBox>

            <JsonViewer :value="data" :expand-depth="2" />
        </Space>
    </App>
</template>
