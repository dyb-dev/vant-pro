<script setup lang="tsx">
import { StarTwoTone } from "@ant-design/icons-vue"
import { theme, App, Space, Tag } from "ant-design-vue"
import { useData } from "vitepress"
import { reactive } from "vue"

import JsonViewer from "@/components/JsonViewer.vue"

/** HOOKS: 获取`vitepress`当前站点配置 */
const siteConfig = useData()
/** HOOKS: 获取`ant`当前主题 配置 */
const { token: antThemeConfig } = theme.useToken()

// #region snippet

/** REACTIVE: 数据 */
const data = reactive({
    /** `vitepress`当前站点配置 */
    siteConfig,
    /** `ant`当前主题配置 */
    antThemeConfig
})

// #endregion snippet
</script>

<template>
    <App>
        <Space style="width: 100%" direction="vertical">
            <Tag class="tag" :bordered="false" :color="data.antThemeConfig.colorPrimary">
                <template #icon>
                    <StarTwoTone :two-tone-color="data.antThemeConfig.colorPrimary" />
                </template>
                vitepress 站点配置
            </Tag>

            <JsonViewer :value="data.siteConfig" :expand-depth="1" />

            <Tag class="tag" :bordered="false" :color="data.antThemeConfig.colorPrimary">
                <template #icon>
                    <StarTwoTone :two-tone-color="data.antThemeConfig.colorPrimary" />
                </template>
                Ant 主题配置
            </Tag>

            <JsonViewer :value="data.antThemeConfig" />
        </Space>
    </App>
</template>

<style lang="scss" scoped>
.tag {
    padding: 2px 10px;
    font-size: 15px;
}
</style>
