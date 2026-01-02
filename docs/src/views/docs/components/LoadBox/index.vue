<script setup lang="tsx">
import { App, Button, Space } from "ant-design-vue"
import { Image } from "vant"
import { reactive } from "vue"

import { LoadBox } from "@dyb-dev/vant-pro"

import CellPhoneBox from "@/components/CellPhoneBox.vue"
import JsonViewer from "@/components/JsonViewer.vue"

import type { TLoadBoxStatus } from "@dyb-dev/vant-pro"

interface IData {
    /** 加载状态 */
    loadStatus: TLoadBoxStatus
}

/** REACTIVE: 数据 */
const data: IData = reactive({
    loadStatus: "loading"
})

/**
 * 加载函数
 */
const load = async () => {

    data.loadStatus = "loading"
    await delay(1000)
    if (Math.random() > 0.8) {

        data.loadStatus = "fail"
        return

    }
    data.loadStatus = "success"

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

load()
</script>

<template>
    <App>
        <Space style="width: 100%" direction="vertical" size="middle">
            <Button type="primary" @click="load">重新加载</Button>

            <CellPhoneBox class="cell-phone-box" ref="cellPhoneBox">
                <LoadBox v-model:status="data.loadStatus" :retry-load-fn="load">
                    <Image width="100%" height="100%" fit="cover" src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" />
                </LoadBox>
            </CellPhoneBox>

            <JsonViewer :value="data" :expand-depth="1" />
        </Space>
    </App>
</template>
