<script setup lang="ts">
import { App, Space } from "ant-design-vue"
import { Cell } from "vant"
import { ref } from "vue"

import { ListPro } from "vant-pro"

import CellPhoneBox from "@/components/CellPhoneBox.vue"
import JsonViewer from "@/components/JsonViewer.vue"

import type { IPaginationFetchDataFnParam, TPaginationFetchDataFnReturn } from "vant-pro"

/** REF: 列表组件实例 */
const listPro = ref<InstanceType<typeof ListPro> | Record<string, any>>({})

interface User {
    id: number
    name: string
}

/** REF: 数据 */
const data = ref<User[]>(Array.from({ length: 30 }, (_, i) => ({ id: i, name: `user ${i}` })))

/**
 * 获取分页数据的函数
 *
 * @param {IPaginationFetchDataFnParam} param 参数，包括当前页码和当前页大小
 * @returns {Promise<TPaginationFetchDataFnReturn<User>>} 返回包含当前页数据和总大小的对象
 */
const fetchDataFn = async({ currentPage, currentPageSize }: IPaginationFetchDataFnParam): TPaginationFetchDataFnReturn<User> => {

    const _start = (currentPage - 1) * currentPageSize
    const _end = _start + currentPageSize

    const _data = data.value.slice(_start, _end)
    const _random = Math.random()

    await delay(1000)

    if (_random >= 0.8) {

        return

    }

    return {
        currentPageData: _data,
        totalSize: data.value.length
    }

}

/**
 * 延迟
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
            <CellPhoneBox class="cell-phone-box" ref="cellPhoneBox">
                <template #default="{ boxElement }">
                    <ListPro ref="listPro" :fetch-data-fn="fetchDataFn" :back-top-props="{ teleport: boxElement }">
                        <template #default="{ currentTotalData }">
                            <Cell v-for="(item, index) in <User[]>currentTotalData" :key="index" :title="item.name" />
                        </template>
                    </ListPro>
                </template>
            </CellPhoneBox>

            <JsonViewer :value="<InstanceType<typeof ListPro>>listPro" :expand-depth="1" />
        </Space>
    </App>
</template>
