<!--
 * @Author: dyb-dev
 * @Date: 2024-09-04 15:52:38
 * @LastEditors: dyb-dev
 * @LastEditTime: 2024-09-10 21:02:13
 * @FilePath: /vant-pro/src/components/ListPro/index.vue
 * @Description: 列表分页组件增强版(基于 vant 的 `PullRefresh`、`List`、`BackTop`、`Empty`、`Highlight` 组件)
-->

<script setup lang="tsx">
defineOptions({
    /** 设置组件名 */
    name: "ListPro"
})

import { PullRefresh, List, BackTop, Empty, Highlight } from "vant"
import { computed, nextTick, onMounted, ref, useSlots, watchEffect } from "vue"

import TransitionPro from "#/components/TransitionPro"

import { useListPagination } from "./hooks/useListPagination"

import type { TPaginationDataItem, IPaginationFetchDataFnParam, TPaginationFetchDataFnReturn } from "./hooks"
import type { BackTopProps, EmptyProps, HighlightProps, ListProps, PullRefreshProps } from "vant"

/** vant `PullRefresh` 组件的属性 */
export type TPullRefreshProps = Omit<Partial<PullRefreshProps>, "modelValue">

/** vant `List` 组件的属性 */
export type TListProps = Omit<Partial<ListProps>, "loading" | "error" | "finished">

/** vant `Highlight` 组件的属性 */
export type THighlightProps = TModifyProperties<Partial<HighlightProps>, "keywords" | "sourceString", "required">

export interface IListProProps {
    /**
     * @description 是否启用顶部描述
     * @default true
     */
    enableTopDesc?: boolean
    /**
     * @description 是否启用数据为空时元素占位
     * @default true
     */
    enableEmptyPlaceholder?: boolean
    /**
     * @description 是否启用 back-top 按钮
     * @default true
     */
    enableBackTop?: boolean
    /**
     * @description vant `PullRefresh` 组件的属性
     */
    pullRefreshProps?: TPullRefreshProps
    /**
     * @description vant `Highlight` 组件的属性
     */
    highlightProps?: THighlightProps
    /**
     * @description vant `Empty` 组件的属性
     */
    emptyProps?: EmptyProps
    /**
     * @description vant `List` 组件的属性
     */
    listProps?: TListProps
    /**
     * @description vant `BackTop` 组件的属性
     */
    backTopProps?: Partial<BackTopProps>
    /**
     * @description 每页数据大小
     * @default 10
     */
    pageSize?: number
    /**
     * @description 请求数据的方法
     * @param param 请求参数
     * @returns 数据返回值
     */
    fetchDataFn: (param: IPaginationFetchDataFnParam) => TPaginationFetchDataFnReturn<TPaginationDataItem>
}

const props = withDefaults(defineProps<IListProProps>(), {
    /** 是否启用顶部描述 默认: true */
    enableTopDesc: true,
    /** 是否启用数据为空时元素占位 默认: true */
    enableEmptyPlaceholder: true,
    /** 是否启用 back-top 按钮 默认: true */
    enableBackTop: true,
    listProps: () => ({
        loadingText: "加载中...",
        errorText: "加载失败，点击重试",
        finishedText: "没有更多了"
    }),
    backTopProps: () => ({
        target: `.${rootClassName}`
    })
})

// HOOKS: 使用列表分页器
const useListPaginationReturn = useListPagination<TPaginationDataItem>({
    pageSize: props.pageSize,
    fetchDataFn: async param => {

        await nextTick()

        return props.fetchDataFn(param)

    }
})
/** 列表分页器返回值 */
const { currentLoadStatus, currentTotalData, totalSize, initialized, refreshing, finished, next, clearRefresh } =
    useListPaginationReturn

/** COMPUTED: 是否显示空元素占位 */
const showEmpty = computed(() => {

    // 如果启用空元素占位 && 当前加载状态不是 loading
    if (props.enableEmptyPlaceholder) {

        // 如果正在刷新 || 如果初始化未完成 || 总数据量小于等于 0
        if (refreshing.value || !initialized.value || totalSize.value <= 0) {

            return true

        }

    }

    return false

})

/** COMPUTED: 下拉刷新的 props */
const pullRefreshProps = computed<TPullRefreshProps>(() => {

    if (props.pullRefreshProps) {

        return props.pullRefreshProps

    }

    const _pullRefreshProps: TPullRefreshProps = {
        successText: "刷新成功"
    }

    if (currentLoadStatus.value === "fail") {

        _pullRefreshProps.successText = "刷新失败"

    }
    return _pullRefreshProps

})

/** COMPUTED: 高亮提示的 props */
const highlightProps = computed<THighlightProps>(() => {

    // 如果传入了高亮提示的 props
    if (props.highlightProps) {

        return props.highlightProps

    }

    // 转为字符串
    const _totalSize = totalSize.value.toString()

    return {
        keywords: [_totalSize],
        sourceString: `共有${_totalSize}个数据`,
        highlightClass: "vant-pro-list-pro__top-desc__highlight"
    }

})

/** COMPUTED: 空元素占位的 props */
const emptyProps = computed<EmptyProps>(() => {

    // 如果传入了空元素占位的 props
    if (props.emptyProps) {

        return props.emptyProps

    }

    // 如果加载失败
    if (currentLoadStatus.value === "fail") {

        return {
            image: "error",
            description: "加载失败"
        }

    }

    return {
        image: "default",
        description: "暂无数据"
    }

})

/** REF: 列表加载失败状态 由于需要使用 `List` 组件的点击刷新功能所以这里单独弄一个ref */
const listError = ref(false)

watchEffect(() => {

    listError.value = currentLoadStatus.value === "fail"

})

/** LIFECYCLE: 初始渲染 */
onMounted(() => {

    // 未初始化时手动触发第一页数据加载
    clearRefresh()

})

/** REF: 列表过渡时间 */
const listTransitionTime = ref(0.3)

/**
 * EVENT: 监听下拉刷新状态变化
 *
 * @param obj 下拉刷新状态
 * @param obj.status 下拉刷新状态
 * @param obj.distance 下拉距离
 */
const onRefreshChange = ({ status }: { status: "pulling" | "loosing" | "loading" | "normal"; distance: number }) => {

    // 解决:下拉拖拽时，由于过渡动画样式设置 `all` 的原因，导致下拉刷新过程中列表下拉延迟的问题
    listTransitionTime.value = status === "normal" ? 0.3 : 0

}

/** EVENT: 监听下拉刷新  */
const onRefresh = () => {

    clearRefresh()

}

/** EVENT: 监听列表下滑加载  */
const onLoad = () => {

    next()

}

/** CONST: 根元素类名 */
const rootClassName = "vant-pro-list-pro"

// HOOKS: 获取传入插槽
const slots = useSlots()

/** COMPUTED: 是否显示 空元素-图标 的插槽 */
const showEmptyImageSlot = computed(() => !!slots.emptyImage)
/** COMPUTED: 是否显示 空元素-描述文字 的插槽 */
const showEmptyDescriptionSlot = computed(() => !!slots.emptyDescription)
/** COMPUTED: 是否显示 空元素-底部内容 的插槽 */
const showEmptyDefaultSlot = computed(() => !!slots.emptyDefault)

/** EXPOSE: 导出列表分页器状态信息 */
defineExpose(useListPaginationReturn)
</script>

<template>
    <PullRefresh
        style="overflow: hidden auto"
        :class="rootClassName"
        v-bind="pullRefreshProps"
        v-model="refreshing"
        @refresh="onRefresh"
        @change="onRefreshChange"
    >
        <slot v-if="props.enableTopDesc" name="top-desc" :total-size="totalSize">
            <Highlight class="vant-pro-list-pro__top-desc" v-bind="highlightProps" />
        </slot>

        <TransitionPro mode="out-in">
            <Empty v-if="showEmpty" v-bind="emptyProps">
                <template v-if="showEmptyImageSlot" #image>
                    <slot name="emptyImage"></slot>
                </template>

                <template v-if="showEmptyDescriptionSlot" #description>
                    <slot name="emptyDescription"></slot>
                </template>

                <template v-if="showEmptyDefaultSlot" #default>
                    <slot name="emptyDefault"></slot>
                </template>
            </Empty>

            <List
                v-else
                v-bind="props.listProps"
                :loading="currentLoadStatus === 'loading'"
                v-model:error="listError"
                :finished="finished"
                @load="onLoad"
            >
                <!-- 使用懒加载实现延迟加载页面可视区域外的内容 -->
                <lazy-component>
                    <TransitionPro :time="listTransitionTime" :enable-list-transition="true">
                        <slot :current-total-data="currentTotalData"></slot>
                    </TransitionPro>
                </lazy-component>
            </List>
        </TransitionPro>

        <BackTop v-if="enableBackTop" v-bind="props.backTopProps" />
    </PullRefresh>
</template>

<style lang="scss">
.vant-pro-list-pro {
    width: 100%;
    height: 100%;
    @include hide-scroll-bar-mixin;

    &__top-desc {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        margin: 10px 0;
        color: var(--van-text-color-2);
        font-size: var(--van-font-size-md);

        &__highlight {
            --van-highlight-tag-color: var(--van-primary-color);
        }
    }
}
</style>
