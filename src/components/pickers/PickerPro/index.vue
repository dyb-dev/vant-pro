<!--
 * @FileDesc: 选择器增强版组件(基于 vant 的 `Popup`、`Picker`、`Search`、`Loading`、`Icon` 组件)
 -->

<script setup lang="ts">
defineOptions({
    /** 设置组件名 */
    name: "PickerPro"
})

import { useVModels } from "@vueuse/core"
import { Popup, Search, Picker, Loading, Icon } from "vant"
import { watch, onMounted, ref, computed } from "vue"

import { debounce } from "#/utils"

import type { TPickerProBaseActionType, TPickerProBaseSelectedResult, TPickerProBaseUnmountParam } from "../type"
import type { PickerFieldNames, PickerOption, PickerColumn } from "vant"

/** 请求 Picker 数据函数的参数 */
export type TPickerProFetchDataFnParam = {
    /** 搜索关键词 */
    keyword: string
}

/** Picker 数据 */
export type TPickerProData = PickerOption | Record<string, any>[]

/** 请求 Picker 数据函数的返回值 */
export type TPickerProFetchDataFnReturn = Promise<TPickerProData | void>

export interface IPickerProProps {
    /**
     * @description 是否显示
     */
    show: boolean
    /**
     * @description 卸载组件 `用于函数式调用`
     * @param ares 卸载回调参数
     */
    unmount?: (...ares: TPickerProBaseUnmountParam) => void
    /**
     * @description 当前选中项对应的值
     * @default []
     */
    pickerValue?: (string | number)[]
    /**
     * @description 对象数组，配置每一列显示的数据
     * @default []
     */
    columns?: TPickerProData
    /**
     * @description 自定义 columns 结构中的字段
     * @default { text: 'text', values: 'values', children: 'children' }
     */
    columnsFieldNames?: PickerFieldNames
    /**
     * @description 是否显示搜索组件，使用搜索功能还需要传入 `fetchDataFn` 函数
     * @default false
     */
    showSearch?: boolean
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
     * @description 是否允许选项内容中渲染 HTML
     * @default false
     */
    allowHtml?: boolean
    /**
     * @description 请求数据失败提示文案
     * @default 加载失败，点击重试
     */
    fetchDataFailTipText?: string
    /**
     * @description 可见的选项个数
     * @default 6
     */
    visibleOptionNum?: number
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
     * @description 获取 Picker 数据的函数，如果 `columns` 不存在时会在弹窗打开时调用该函数获取数据，优先以 `columns` 为准
     * @returns {TPickerProFetchDataFnReturn} 返回 Picker 数据
     */
    fetchDataFn?: (param: TPickerProFetchDataFnParam) => TPickerProFetchDataFnReturn
    /**
     * @description 关闭前的回调函数，返回 false 可阻止关闭，支持返回 Promise
     * @param selectedResult 选择结果
     * @returns {boolean | Promise<boolean>} 返回 false 可阻止关闭
     */
    beforeClose?: (selectedResult: TPickerProBaseSelectedResult) => boolean | Promise<boolean>
}

const props = withDefaults(defineProps<IPickerProProps>(), {
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
    /** 请求数据失败提示文案 */
    fetchDataFailTipText: "加载失败，点击重试",
    /** 是否显示搜索组件 */
    showSearch: false,
    columns: () => []
})

const emits = defineEmits<{
    /** 是否显示 */
    (event: "update:show"): void
    /** 更新选中的值的值 */
    (event: "update:pickerValue"): void
    /** 确认按钮点击 */
    (event: "confirm", params: TPickerProBaseSelectedResult): void
    /** 取消按钮点击 */
    (event: "cancel", params: TPickerProBaseSelectedResult): void
}>()

/** REF: 定义双向绑定 */
const { show, pickerValue } = useVModels(props, emits)

/** REF: 是否显示 */
const _show = ref(false)

/** REF: 当前选择器的数据 */
const columns = ref<TPickerProData>(props.columns)

/** REF: 加载状态 */
const loadStatus = ref<"loading" | "success" | "fail">("success")

/** REF: 搜索关键字 */
const searchKeyWords = ref("")

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

    // 将 show 的值赋值给 _isShow
    _show.value = value

})

/** LIFECYCLE: 渲染 */
onMounted(() => {

    _show.value = show.value

})

/** EVENT: 监听弹出层打开 */
const onOpened = () => {

    // 如果 columns 为默认值空数组时，才会初始化加载数据
    if (props.columns.length <= 0) {

        loadData()

    }

}

/** EVENT: 搜索框搜索事件 */
const onSearch = () => {

    loadData()

}

/** EVENT: 提示文案 点击事件 */
const onClickTip = () => {

    loadData()

}

/**
 * EVENT: 搜索选择器 确认按钮 点击事件
 *
 * @param params 选择的参数
 */
const onClickConfirmButton = async(params: TPickerProBaseSelectedResult) => {

    pickerValue.value = params.selectedValues
    selectedResult.value = { ...selectedResult.value, ...params }

    if (await close("confirm")) {

        selectedResult.value.actionType = "confirm"
        emits("confirm", params)

    }

}

/**
 * EVENT: 搜索选择器 取消按钮 点击事件
 *
 * @param params 选择的参数
 */
const onClickCancelButton = async(params: TPickerProBaseSelectedResult) => {

    selectedResult.value = { ...selectedResult.value, ...params }

    if (await close("cancel")) {

        selectedResult.value.actionType = "cancel"
        emits("cancel", params)

    }

}

/** FUN: 加载选择器数据 并且 设置当前选中的值 */
const loadData = async() => {

    if (props.fetchDataFn) {

        try {

            if (loadStatus.value === "loading") {

                console.warn("loadData() =>> 正在加载数据中 loadStatus: ", loadStatus.value)
                return

            }

            loadStatus.value = "loading"

            const _result = await props.fetchDataFn({
                keyword: searchKeyWords.value
            })

            if (!Array.isArray(_result)) {

                throw `fetchDataFn() 返回值必须是数组 _result: ${_result}`

            }

            if (_result.length <= 0) {

                console.warn(`fetchDataFn() 返回值为空数组 _result: ${_result}`)

            }

            columns.value = _result
            loadStatus.value = "success"

        }
        catch (error) {

            console.error("loadData() =>>", error)
            columns.value = []
            loadStatus.value = "fail"

        }

    }

}

/** FUN: 防抖加载数据 */
const _loadData = debounce(loadData, 1000)

/** WATCH: 监听 搜索框值 的变化 */
watch(searchKeyWords, () => {

    _loadData()

})

/**
 * FUN: 关闭选择器
 *
 * @param actionType 操作类型
 * @returns 是否关闭成功
 */
const close = async(actionType: TPickerProBaseActionType = "cancel") => {

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
        class="vant-pro-picker-pro"
        position="bottom"
        :round="true"
        :closeable="false"
        :close-on-click-overlay="!isBeforeClose"
        :z-index="2001"
        :before-close="close"
        :lock-scroll="props.lockScroll"
        :teleport="props.teleport"
        @opened="onOpened"
        @closed="props.unmount?.(selectedResult)"
    >
        <Picker
            v-model="pickerValue"
            :title="props.title"
            :columns-field-names="props.columnsFieldNames"
            :visible-option-num="props.visibleOptionNum"
            :allow-html="props.allowHtml"
            :loading="loadStatus === 'loading'"
            :columns="<PickerColumn>columns"
            :readonly="isBeforeClose"
            :show-toolbar="true"
            @cancel="onClickCancelButton"
            @confirm="onClickConfirmButton"
        >
            <template v-if="props.showSearch" #columns-top>
                <Search
                    v-model="searchKeyWords"
                    shape="round"
                    placeholder="请输入搜索关键词"
                    :disabled="isBeforeClose"
                    @search="onSearch"
                />
            </template>

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

            <template v-if="loadStatus === 'fail'" #columns-bottom>
                <div class="vant-pro-picker-pro__fetch-data-fail-tip" @click="onClickTip">
                    <Icon class="vant-pro-picker-pro__fetch-data-fail-tip__icon" name="replay" color="var(--van-text-color-2)" />
                    <span class="vant-pro-picker-pro__fetch-data-fail-tip__text">{{ props.fetchDataFailTipText }}</span>
                </div>
            </template>
        </Picker>
    </Popup>
</template>

<style lang="scss">
.vant-pro-picker-pro {
    &__fetch-data-fail-tip {
        position: absolute;
        top: 50%;
        left: 50%;
        display: flex;
        flex-direction: column;
        align-items: center;
        color: var(--van-text-color-2);
        font-size: 20px;
        text-align: center;
        transform: translate(-50%, -50%);

        &__icon {
            margin-bottom: 5px;
        }

        &__text {
            font-size: var(--van-font-size-md);
        }
    }
}
</style>
