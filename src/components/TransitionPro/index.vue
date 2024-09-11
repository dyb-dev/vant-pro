<!--
 * @Author: dyb-dev
 * @Date: 2024-09-03 16:37:34
 * @LastEditors: dyb-dev
 * @LastEditTime: 2024-09-11 13:52:42
 * @FilePath: /vant-pro/src/components/TransitionPro/index.vue
 * @Description: 过渡动画组件增强版(基于 `Vue3` 的 `Transition`、`TransitionGroup` 组件)
-->

<script setup lang="ts">
defineOptions({
    /** 设置组件名 */
    name: "TransitionPro"
})

import { computed, Transition, TransitionGroup } from "vue"

import type { TransitionProps, TransitionGroupProps } from "vue"

/** 过渡曲线模式 */
export type TTransitionProEasing = "linear" | "ease" | "ease-in" | "ease-out" | "ease-in-out"

export interface ITransitionProProps extends TransitionProps, TransitionGroupProps {
    /**
     * 过渡时间 单位:秒
     *
     * @default 0.3
     */
    time?: number
    /**
     * 过渡曲线模式
     *
     * @default "ease-out"
     */
    easing?: TTransitionProEasing
    /**
     * 是否启用列表过渡
     *
     * @default false
     */
    enableListTransition?: boolean
}

const props = withDefaults(defineProps<ITransitionProProps>(), {
    /** 过渡时间 单位:秒 */
    time: 0.3,
    /** 过渡曲线模式 */
    easing: "ease-out",
    /** 是否启用列表过渡 */
    enableListTransition: false,
    /** 是否在初始渲染时立即应用过渡 */
    appear: true,
    /** 过渡类名前缀 */
    name: "vant-pro-transition-pro",
    /** 是否启用css过渡 */
    css: true,
    /** 离开后元素是否保留在 DOM 中 */
    persisted: false
})

/** COMPUTED: 过渡组件Props */
const transitionProps = computed(() => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { time, easing, enableListTransition, mode, ...rest } = props
    return props.enableListTransition ? rest : { ...rest, mode }

})
</script>

<template>
    <component :is="props.enableListTransition ? TransitionGroup : Transition" v-bind="transitionProps">
        <slot></slot>
    </component>
</template>

<style lang="scss">
.vant-pro-transition-pro {
    &-move,/* 对移动中的元素应用的过渡 */
    &-enter-active,
    &-leave-active {
        transition: v-bind("`all ${props.time}s ${props.easing}`");
    }

    &-enter-from,
    &-leave-to {
        opacity: 0;
    }

    &-leave-active {
        /* 确保将离开的元素从布局流中删除以便能够正确地计算移动的动画 */
        position: v-bind("props.enableListTransition ? 'absolute' : 'relative'");
    }
}
</style>
