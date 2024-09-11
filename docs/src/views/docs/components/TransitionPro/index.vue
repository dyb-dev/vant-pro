<script setup lang="ts">
import { App, Button, Space } from "ant-design-vue"
import { Image } from "vant"
import { computed, ref } from "vue"

import { TransitionPro } from "vant-pro"

import CellPhoneBox from "@/components/CellPhoneBox.vue"

/** REF: 是否显示 */
const show = ref(false)

/** COMPUTED: 进入时 x 位移量 */
const enterX = computed(() => show.value ? "100%" : "-100%")

/** COMPUTED: 离开时 x 位移量 */
const leaveX = computed(() => show.value ? "-100%" : "100%")

/** EVENT: 模拟页面切换 */
const onClickButton = () => {

    show.value = !show.value

}
</script>

<template>
    <App>
        <Space style="width: 100%" direction="vertical" size="middle">
            <Button type="primary" @click="onClickButton">页面切换</Button>

            <CellPhoneBox class="cell-phone-box" ref="cellPhoneBox">
                <TransitionPro :time="0.5" easing="ease" mode="out-in">
                    <Image
                        v-if="show"
                        width="100%"
                        height="100%"
                        fit="cover"
                        round
                        src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
                    />

                    <Image
                        v-else
                        width="100%"
                        height="100%"
                        fit="cover"
                        src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
                    />
                </TransitionPro>
            </CellPhoneBox>
        </Space>
    </App>
</template>

<style lang="scss">
.vant-pro-transition-pro {
    &-enter {
        transform: translateX(v-bind(enterX));
        opacity: 0;
    }

    &-leave-to {
        transform: translateX(v-bind(leaveX));
        opacity: 0;
    }
}
</style>
