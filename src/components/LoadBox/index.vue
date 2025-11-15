<!--
 * @FileDesc: load盒子组件(基于 vant 的 `Loading`、`Icon` 组件)
 -->

<script setup lang="ts">
defineOptions({
    /** 设置组件名 */
    name: "LoadBox"
})

import { useVModel } from "@vueuse/core"
import { Loading, Icon } from "vant"
import { computed } from "vue"

import TransitionPro from "#/components/TransitionPro"

import type { LoadingType } from "vant"

/** 加载盒子状态类型 */
export type TLoadBoxStatus = "loading" | "success" | "fail"

export interface ILoadBoxProps {
    /**
     * @description 状态，可选值为 'loading' | 'success' | 'fail'
     * @default 'loading'
     */
    status: TLoadBoxStatus
    /**
     * @description 自定义图标，优先级高于 loadingIcon、failIcon
     */
    icon?: LoadingType | string
    /**
     * @description 自定义描述，优先级高于 loadingText、failText
     */
    text?: string
    /**
     * @description 加载中的图标
     * @default circular
     */
    loadingIcon?: LoadingType
    /**
     * @description 加载中的描述
     * @default "正在载入"
     */
    loadingText?: string
    /**
     * @description 加载失败的图标
     * @default "replay"
     */
    failIcon?: string
    /**
     * @description 加载失败的描述
     * @default "加载失败，请点击重试~"
     */
    failText?: string
    /**
     * @description icon和文本颜色
     * @default "var(--van-loading-spinner-color)"
     */
    color?: string
    /**
     * @description 重新加载函数
     */
    retryLoadFn: () => void
}

const props = withDefaults(defineProps<ILoadBoxProps>(), {
    loadingIcon: "circular",
    loadingText: "正在载入",
    failText: "加载失败，请点击重试~",
    failIcon: "replay",
    color: "var(--van-loading-spinner-color)"
})

const emits = defineEmits<{
    (event: "update:status", value: TLoadBoxStatus): void
}>()

/** REF: 状态 */
const status = useVModel(props, "status", emits)

/** COMPUTED: 图标 */
const icon = computed(() => {

    if (props.icon) {

        return props.icon

    }
    if (status.value === "loading") {

        return props.loadingIcon

    }
    if (status.value === "fail") {

        return props.failIcon

    }
    return ""

})

/** COMPUTED: 描述 */
const text = computed(() => {

    if (props.text) {

        return props.text

    }
    if (status.value === "loading") {

        return props.loadingText

    }
    if (status.value === "fail") {

        return props.failText

    }
    return ""

})
</script>

<template>
    <TransitionPro mode="out-in">
        <div v-if="status === 'loading' || status === 'fail'" class="vant-pro-load-box" v-bind="$attrs">
            <TransitionPro mode="out-in">
                <!-- 显示加载失败的图标和描述 -->
                <div v-if="status === 'fail'" class="vant-pro-load-box__fail" @click="props.retryLoadFn">
                    <Icon :name="icon" :color="props.color" />

                    <div class="vant-pro-load-box__fail__text" :style="{ color: props.color }">
                        {{ text }}
                    </div>
                </div>

                <!-- 显示加载中的图标和描述 -->
                <Loading
                    v-else
                    class="vant-pro-load-box__loading"
                    :color="props.color"
                    :text-color="props.color"
                    :type="<LoadingType>icon"
                    vertical
                >{{ text }}</Loading>
            </TransitionPro>
        </div>

        <div v-else class="vant-pro-content-box" v-bind="$attrs">
            <slot></slot>
        </div>
    </TransitionPro>
</template>

<style lang="scss">
.vant-pro {
    &-load-box {
        display: flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        min-height: 70px;

        &__fail {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            font-size: 20px;

            &__text {
                margin-top: 8px;
                font-size: 12px;
            }
        }

        &__loading {
            & > .van-loading__spinner {
                width: 20px;
                height: 20px;
            }

            & > .van-loading__text {
                font-size: 12px;
            }
        }
    }

    &-content-box {
        box-sizing: border-box;
        width: 100%;
    }
}
</style>
