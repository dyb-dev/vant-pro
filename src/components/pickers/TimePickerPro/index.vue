<!--
 * @FileDesc: 时间选择器增强版组件(基于 vant 的 `Popup`、`TimePicker`、`Loading` 组件)
 -->

<script setup lang="ts">
defineOptions({
    /** 设置组件名 */
    name: "TimePickerPro"
})

import { useVModels } from "@vueuse/core"
import { Popup, Loading, TimePicker } from "vant"
import { watch, onMounted, ref, computed } from "vue"

import type { TPickerProBaseActionType, TPickerProBaseSelectedResult, TPickerProBaseUnmountParam } from "../type"
import type { PickerOption, TimePickerColumnType } from "vant"

export interface ITimePickerProProps {
    /**
     * 是否显示
     */
    show: boolean
    /**
     * 卸载组件 `用于函数式调用`
     *
     * @param ares 卸载回调参数
     */
    unmount?: (...ares: TPickerProBaseUnmountParam) => void
    /**
     * 时间选择器的值
     */
    pickerValue?: string[]
    /**
     * 选项类型，由 hour、minute 和 second 组成的数组
     *
     * @default ['hour', 'minute']
     */
    columnsType?: TimePickerColumnType[]
    /**
     * 可选的最小小时
     *
     * @default 0
     */
    minHour?: number | string
    /**
     * 可选的最大小时
     *
     * @default 23
     */
    maxHour?: number | string
    /**
     * 可选的最小分钟
     *
     * @default 0
     */
    minMinute?: number | string
    /**
     * 可选的最大分钟
     *
     * @default 59
     */
    maxMinute?: number | string
    /**
     * 可选的最小秒数
     *
     * @default 0
     */
    minSecond?: number | string
    /**
     * 可选的最大秒数
     *
     * @default 59
     */
    maxSecond?: number | string
    /**
     * 可选的最小时间，格式参考 07:40:00，使用时 min-hour、min-minute、min-second 不会生效
     */
    minTime?: string
    /**
     * 可选的最大时间，格式参考 10:20:00，使用时 max-hour、max-minute、max-second 不会生效
     */
    maxTime?: string
    /**
     * 顶部栏标题
     *
     * @default 请选择时间
     */
    title?: string
    /**
     * 确认按钮文字，设置为空字符串可以隐藏按钮
     *
     * @default 确认
     */
    confirmButtonText?: string
    /**
     * 取消按钮文字，设置为空字符串可以隐藏按钮
     *
     * @default 取消
     */
    cancelButtonText?: string
    /**
     * 可见的选项个数
     *
     * @default 6
     */
    visibleOptionNum?: number
    /**
     * 选项高度，支持 px, vw, vh, rem 单位，默认 px
     *
     * @default 44
     */
    optionHeight?: number | string
    /**
     * 快速滑动时惯性滚动的时长，单位 ms
     *
     * @default 1000
     */
    swipeDuration?: number | string
    /**
     * 是否锁定背景滚动
     *
     * @default true
     */
    lockScroll?: boolean
    /**
     * 指定挂载的节点，等同于 Teleport 组件的 to 属性
     */
    teleport?: string | Element
    /**
     * 选项过滤函数
     *
     * @param type 选项类型
     * @param options 当前可选项
     * @returns {PickerOption[]} 返回过滤后的选项
     */
    filter?: (type: TimePickerColumnType, options: PickerOption[]) => PickerOption[]
    /**
     * 选项格式化函数
     *
     * @param type 选项类型
     * @param option 当前选项
     * @returns {PickerOption} 返回格式化后的选项
     */
    formatter?: (type: TimePickerColumnType, option: PickerOption) => PickerOption
    /**
     * 关闭前的回调函数，返回 false 可阻止关闭，支持返回 Promise
     *
     * @param selectedResult 选择结果
     * @returns {boolean | Promise<boolean>} 返回 false 可阻止关闭
     */
    beforeClose?: (selectedResult: TPickerProBaseSelectedResult) => boolean | Promise<boolean>
}

const props = withDefaults(defineProps<ITimePickerProProps>(), {
    /** 是否显示浮层 */
    show: false,
    /** 是否锁定背景滚动 */
    lockScroll: true,
    /** 顶部栏标题 */
    title: "请选择日期",
    /** 确认按钮文字 */
    confirmButtonText: "确认",
    /** 取消按钮文字 */
    cancelButtonText: "取消"
})

const emits = defineEmits<{
    /** 是否显示 */
    (event: "update:show"): void
    /** 更新选中的值的值 */
    (event: "update:pickerValue"): void
    /** 确认按钮点击 */
    (event: "confirm", selectedResult: TPickerProBaseSelectedResult): void
    /** 取消按钮点击 */
    (event: "cancel", selectedResult: TPickerProBaseSelectedResult): void
}>()

/** REF: 定义双向绑定 */
const { show, pickerValue } = useVModels(props, emits)

/** REF: 是否显示 */
const _show = ref(false)

/** REF: 是否正在执行 beforeClose */
const isBeforeClose = ref(false)

/** REF: 当前选择结果 */
const selectedResult = ref<TPickerProBaseSelectedResult>({
    selectedValues: props.pickerValue || [],
    selectedOptions: [],
    selectedIndexes: [],
    actionType: "cancel"
})

/** COMPUTED: 按钮样式 */
const buttonStyles = computed(() => {

    return [
        {
            opacity: isBeforeClose.value ? 0.6 : 1
        },
        "transition: opacity .3s;"
    ]

})

/** WATCH: 监听 show 的变化 */
watch(show, value => {

    // 将 show 的值赋值给 _show
    _show.value = value

})

/** LIFECYCLE: 渲染 */
onMounted(() => {

    _show.value = show.value

})

/**
 * EVENT: 日期选择器 确认按钮 点击事件
 *
 * @param params 选择的参数
 */
const onClickConfirmButton = async(params: TPickerProBaseSelectedResult) => {

    pickerValue.value = params.selectedValues as string[]
    selectedResult.value = { ...selectedResult.value, ...params }

    if (await close("confirm")) {

        selectedResult.value.actionType = "confirm"
        emits("confirm", selectedResult.value)

    }

}

/**
 * EVENT: 日期选择器 取消按钮 点击事件
 *
 * @param params 选择的参数
 */
const onClickCancelButton = async(params: TPickerProBaseSelectedResult) => {

    selectedResult.value = { ...selectedResult.value, ...params }

    if (await close("cancel")) {

        selectedResult.value.actionType = "cancel"
        emits("cancel", selectedResult.value)

    }

}

/**
 * FUN: 关闭弹窗
 *
 * @param actionType 动作类型
 * @returns {boolean} 是否关闭成功
 */
const close = async(actionType: TPickerProBaseActionType = "cancel"): Promise<boolean> => {

    if (isBeforeClose.value) {

        console.warn("beforeClose() 正在执行")
        return false

    }

    // 在选择结果为空的情况下统一清空，保持数据的一致性
    if (selectedResult.value.selectedOptions[0] === undefined) {

        selectedResult.value.selectedIndexes = []
        selectedResult.value.selectedOptions = []
        selectedResult.value.selectedValues = []

    }

    // 如果存在 beforeClose 回调函数
    if (props.beforeClose) {

        isBeforeClose.value = true
        // 记录一下当前的动作类型
        selectedResult.value.actionType = actionType

        try {

            const _isClose = await props.beforeClose(selectedResult.value)

            if (!_isClose) {

                return false

            }

        }
        catch (error) {

            console.error("close() =>> beforeClose() =>>", error)

        }
        finally {

            isBeforeClose.value = false

        }

    }

    _show.value = false
    show.value = false

    return true

}

/**
 * FUN: 选项格式化函数
 *
 * @param type 类型
 * @param option 选项
 * @returns {PickerOption} 格式化后的选项
 */
const formatter = (type: TimePickerColumnType, option: PickerOption): PickerOption => {

    if (props.formatter) {

        return props.formatter(type, option)

    }

    switch (type) {

    case "hour":
        option.text += "时"
        break

    case "minute":
        option.text += "分"
        break

    case "second":
        option.text += "秒"
        break

    }

    return option

}
</script>

<template>
    <Popup
        v-model:show="_show"
        position="bottom"
        :round="true"
        :closeable="false"
        :close-on-click-overlay="!isBeforeClose"
        :z-index="2001"
        :before-close="close"
        :lock-scroll="props.lockScroll"
        :teleport="props.teleport"
        @closed="props.unmount?.(selectedResult)"
    >
        <TimePicker
            v-model="pickerValue"
            :columns-type="props.columnsType"
            :min-hour="props.minHour"
            :max-hour="props.maxHour"
            :min-minute="props.minMinute"
            :max-minute="props.maxMinute"
            :min-second="props.minSecond"
            :max-second="props.maxSecond"
            :min-time="props.minTime"
            :max-time="props.maxTime"
            :formatter="<any>formatter"
            :filter="<any>props.filter"
            :title="props.title"
            :option-height="props.optionHeight"
            :swipe-duration="props.swipeDuration"
            :visible-option-num="props.visibleOptionNum"
            :readonly="isBeforeClose"
            @cancel="onClickCancelButton"
            @confirm="onClickConfirmButton"
        >
            <template #confirm>
                <div :style="buttonStyles">
                    <Loading
                        v-if="isBeforeClose && selectedResult.actionType === 'confirm'"
                        class="vant-pro-picker-pro-loading"
                        color="var(--van-picker-confirm-action-color)"
                    />
                    <span v-else>{{ props.confirmButtonText }}</span>
                </div>
            </template>

            <template #cancel>
                <div :style="buttonStyles">
                    <Loading
                        v-if="isBeforeClose && selectedResult.actionType === 'cancel'"
                        class="vant-pro-picker-pro-loading"
                        color="var(--van-picker-cancel-action-color)"
                    />
                    <span v-else>{{ props.cancelButtonText }}</span>
                </div>
            </template>
        </TimePicker>
    </Popup>
</template>
