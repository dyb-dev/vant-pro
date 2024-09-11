<!--
 * @Author: dyb-dev
 * @Date: 2024-09-06 23:15:42
 * @LastEditors: dyb-dev
 * @LastEditTime: 2024-09-11 01:40:48
 * @FilePath: /vant-pro/src/components/picker/AreaPickerPro/index.vue
 * @Description: 地区选择器增强版组件(基于 vant 的 `Popup`、`Area`、`Loading` 组件)
-->

<script setup lang="ts">
defineOptions({
    /** 设置组件名 */
    name: "AreaPickerPro"
})

import { useVModels } from "@vueuse/core"
import { Popup, Area, Loading } from "vant"
import { watch, onMounted, ref, computed } from "vue"

import type { TPickerProBaseActionType, TPickerProBaseSelectedResult } from "../types"
import type { AreaList } from "vant"

/** 地区选择器类型 */
export type TAreaPickerProType = "province" | "city" | "district"

/** 地区选择器数据 */
export type TAreaPickerProData = TModifyProperties<AreaList, "city_list" | "county_list">

/** 请求 Picker 数据函数的返回值 */
export type TAreaPickerProFetchDataFnReturn = Promise<TAreaPickerProData | void>

/** 地区选择器选择结果 */
export type TAreaPickerProSelectedResult = TPickerProBaseSelectedResult & {
    /** 选择的地区编码 */
    selectedAreaCode: string
}

/** 组件卸载回调参数 */
export type TAreaPickerProUnmountParam = [TAreaPickerProSelectedResult]

export interface IAreaPickerProProps {
    /**
     * @description 是否显示
     */
    show: boolean
    /**
     * @description 卸载组件 `用于函数式调用`
     * @param ares 卸载回调参数
     */
    unmount?: (...ares: TAreaPickerProUnmountParam) => void
    /**
     * @description 地区数据对象
     */
    areaList?: TAreaPickerProData
    /**
     * @description 地区选择器的值
     */
    pickerValue?: (string | number)[]
    /**
     * @description 选择的地区编码
     */
    areaCode?: string
    /**
     * @description 顶部栏标题
     * @default 请选择
     */
    title?: string
    /**
     * @description 确认按钮文字，设置为空字符串可以隐藏按钮
     * @default 确认
     */
    confirmButtonText?: string
    /**
     * @description 取消按钮文字，设置为空字符串可以隐藏按钮
     * @default 取消
     */
    cancelButtonText?: string
    /**
     * @description 可见的选项个数
     * @default 6
     */
    visibleOptionNum?: number
    /**
     * @description 选择的地区等级，如果没有传递 `areaType` 时会根据 `areaList` 的长度来决定
     * @default district
     */
    areaType?: TAreaPickerProType
    /**
     * @description 列占位提示文字
     * @default []
     */
    columnsPlaceholder?: string[]
    /**
     * @description 选项高度，支持 px, vw, vh, rem 单位，默认 px
     * @default 44
     */
    optionHeight?: number | string
    /**
     * @description 快速滑动时惯性滚动的时长，单位 ms
     * @default 1000
     */
    swipeDuration?: number | string
    /**
     * @description 是否锁定背景滚动
     * @default true
     */
    lockScroll?: boolean
    /**
     * @description 指定挂载的节点，等同于 Teleport 组件的 to 属性
     */
    teleport?: string | Element
    /**
     * @description 关闭前的回调函数，返回 false 可阻止关闭，支持返回 Promise
     * @param selectedResult 选择结果
     * @returns {boolean | Promise<boolean>} 返回 false 可阻止关闭
     */
    beforeClose?: (selectedResult: TAreaPickerProSelectedResult) => boolean | Promise<boolean>
}

const props = withDefaults(defineProps<IAreaPickerProProps>(), {
    /** 是否显示浮层 */
    show: false,
    /** 是否锁定背景滚动 */
    lockScroll: true,
    /** 顶部栏标题 */
    title: "请选择",
    /** 确认按钮文字 */
    confirmButtonText: "确认",
    /** 取消按钮文字 */
    cancelButtonText: "取消",
    areaList: () => {

        return {} as TAreaPickerProData

    }
})

const emits = defineEmits<{
    /** 是否显示 */
    (event: "update:show"): void
    /** 更新选中的值的值 */
    (event: "update:areaCode"): void
    /** 更新选中的值的值 */
    (event: "update:pickerValue"): void
    /** 确认按钮点击 */
    (event: "confirm", selectedResult: TAreaPickerProSelectedResult): void
    /** 取消按钮点击 */
    (event: "cancel", selectedResult: TAreaPickerProSelectedResult): void
}>()

/** REF: 定义双向绑定 */
const { show, areaCode, pickerValue } = useVModels(props, emits)

/** REF: 是否显示 */
const _show = ref(false)

/** REF: 地区数据对象 */
const areaList = ref<TAreaPickerProData>(props.areaList)

/** REF: 是否正在执行 beforeClose */
const isBeforeClose = ref(false)

/** REF: 当前选择结果 */
const selectedResult = ref<TAreaPickerProSelectedResult>({
    selectedValues: props.pickerValue || [],
    selectedOptions: [],
    selectedIndexes: [],
    actionType: "cancel",
    selectedAreaCode: props.areaCode || ""
})

/** COMPUTED: 选择的地区等级 */
const areaType = computed(() => {

    let _index
    if (props.areaType) {

        const _areaTypeList: TAreaPickerProType[] = ["province", "city", "district"]
        _index = _areaTypeList.findIndex(item => item === props.areaType) + 1

    }
    else {

        // 自动推断地区显示等级
        _index = Math.min(Object.values(areaList.value).length, 3)

    }

    return _index

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
 * EVENT: 地区选择器 确认按钮 点击事件
 *
 * @param params 选择的参数
 */
const onClickConfirmButton = async(params: TAreaPickerProSelectedResult) => {

    pickerValue.value = params.selectedValues
    selectedResult.value = { ...selectedResult.value, ...params }
    selectedResult.value.selectedAreaCode = params.selectedValues.at(-1) as string

    if (await close("confirm")) {

        selectedResult.value.actionType = "confirm"
        emits("confirm", selectedResult.value)

    }

}

/**
 * EVENT: 地区选择器 取消按钮 点击事件
 *
 * @param params 选择的参数
 */
const onClickCancelButton = async(params: TAreaPickerProSelectedResult) => {

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
        <Area
            v-model="areaCode"
            :title="props.title"
            :option-height="props.optionHeight"
            :swipe-duration="props.swipeDuration"
            :columns-placeholder="props.columnsPlaceholder"
            :visible-option-num="props.visibleOptionNum"
            :area-list="<AreaList>areaList"
            :readonly="isBeforeClose"
            :columns-num="areaType"
            @cancel="onClickCancelButton"
            @confirm="onClickConfirmButton"
        >
            <template #confirm>
                <div :style="buttonStyles">
                    <Loading
                        v-if="isBeforeClose && selectedResult.actionType === 'confirm'"
                        color="var(--van-picker-confirm-action-color)"
                        size="23px"
                    />
                    <span v-else>{{ props.confirmButtonText }}</span>
                </div>
            </template>

            <template #cancel>
                <div :style="buttonStyles">
                    <Loading
                        v-if="isBeforeClose && selectedResult.actionType === 'cancel'"
                        color="var(--van-picker-cancel-action-color)"
                        size="23px"
                    />
                    <span v-else>{{ props.cancelButtonText }}</span>
                </div>
            </template>
        </Area>
    </Popup>
</template>
