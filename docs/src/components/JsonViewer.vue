<!--
 * @FileDesc: json预览组件（基于`JsonViewer`二次封装）
 -->

<script setup lang="tsx">
import { useData } from "vitepress"
import { computed, reactive } from "vue"
import { JsonViewer } from "vue3-json-viewer"

interface Props {
    /** 显示数据 */
    value: object | Array<any> | string | number | boolean
    /** 是否自动展开 */
    expanded?: boolean
    /** 默认展开层级 */
    expandDepth?: number
    /** 是否可复制 */
    copyable?: boolean | object
    /** 是否排序 */
    sort?: boolean
    /** 是否显示底部收缩按钮 */
    boxed?: boolean
    /** 主题 dark | light */
    theme?: string
    /** 是否展开所有层级数据 */
    previewMode?: boolean
    /** 数据格式化函数 */
    timeformat?: (value: any) => string
}

const props = withDefaults(defineProps<Props>(), {
    /** 是否自动展开 */
    expanded: true,
    /** 默认展开层级 */
    expandDepth: 0,
    /** 是否可复制 */
    copyable: true,
    /** 是否排序 */
    sort: true,
    /** 是否显示底部收缩按钮 */
    boxed: true,
    /** 是否展开所有层级数据 */
    previewMode: false
})

/** REACTIVE: `vitepress`当前站点配置 */
const siteConfig = reactive(useData())

/** COMPUTED: 站点主题类型 */
const siteThemeType = computed(() => siteConfig.isDark ? "dark" : "light")
</script>

<template>
    <JsonViewer v-bind="props" :theme="siteThemeType" />
</template>
