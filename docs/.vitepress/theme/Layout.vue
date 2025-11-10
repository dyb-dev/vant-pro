<!--
 * @Author: dyb-dev
 * @Date: 2024-07-01 22:28:05
 * @LastEditors: dyb-dev
 * @LastEditTime: 2024-10-16 01:10:48
 * @FilePath: /vant-pro/docs/.vitepress/theme/Layout.vue
 * @Description: 自定义vitepress主题组件
-->

<script setup lang="tsx">
import { theme, ConfigProvider } from "ant-design-vue"
// 由于Ant组件默认: 英文版本，所以需要导入Ant组件中文版本
import zhCN from "ant-design-vue/lib/locale/zh_CN"
import { ConfigProvider as VantConfigProvider } from "vant"
import { useData } from "vitepress"
import DefaultTheme from "vitepress/theme"
import { computed, onMounted, reactive, ref } from "vue"

// 由于Ant日期类组件内部用到了dayjs，而dayjs默认: 英文版本，所以需要导入dayjs中文版本
import "dayjs/locale/zh-cn"
import { toAssetsAbsoluteUrl } from "@/utils"

// 可使用自定义插槽 示例:(https://vitepress.dev/zh/guide/extending-default-theme#layout-slots)
const { Layout } = DefaultTheme

/** HOOKS: 获取`vitepress`当前站点配置 */
const siteConfig = useData()

/** REACTIVE: 预览结果 */
const data = reactive({
    /** `vitepress`当前站点配置 */
    siteConfig
})

/** COMPUTED: 主题模式 */
const themeMode = computed(() => data.siteConfig.isDark ? "dark" : "light")

/** REF: 动态获取的主题颜色 */
const primaryColor = ref<string>("")

/** LIFECYCLE: 渲染 */
onMounted(() => {

    // 获取根元素的样式
    const _rootStyles = getComputedStyle(document.documentElement)
    // 获取 vitepress 的主题颜色
    primaryColor.value = _rootStyles.getPropertyValue("--vp-c-brand-3").trim()

})
</script>

<template>
    <ConfigProvider
        :locale="zhCN"
        :theme="{
            algorithm: data.siteConfig.isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
            token: {
                colorPrimary: primaryColor
            }
        }"
    >
        <VantConfigProvider :theme="themeMode" :theme-vars="{ primaryColor }">
            <Layout>
                <!-- 首页logo大图 -->
                <template #home-hero-image>
                    <img class="VPImage image-src" :src="toAssetsAbsoluteUrl('/image/logo.png')" alt="图片加载错误" />
                </template>
            </Layout>
        </VantConfigProvider>
    </ConfigProvider>
</template>

<style lang="scss" scoped>
.Layout {
    @media (min-width: 1440px) {
        /** 存在左侧边栏时 设置顶部栏样式 */
        &:deep(.VPNav .has-sidebar .wrapper .container > .title) {
            width: var(--vp-sidebar-width);
            padding: 0 32px;
        }

        &:deep(.VPNav .has-sidebar .wrapper .container > .content) {
            padding-right: 32px;
            padding-left: var(--vp-sidebar-width);
        }

        &:deep(.VPNav .has-sidebar > .divider) {
            padding-left: var(--vp-sidebar-width);
        }

        /** 设置左侧边栏样式 */
        &:deep(.VPSidebar) {
            width: var(--vp-sidebar-width);
            padding: var(--vp-nav-height) 32px 96px;
        }

        /** 存在左侧边栏时 设置中间内容样式 */
        &:deep(.VPContent.has-sidebar) {
            margin: var(--vp-layout-top-height, 0px) 0 0;
            padding-right: 0;
            padding-left: var(--vp-sidebar-width);
        }

        &:deep(.VPContent .has-sidebar .container .content > .content-container) {
            max-width: none;
        }
    }
}
</style>
