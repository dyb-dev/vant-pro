/*
 * @FileDesc: 扩展主题、扩展vue应用配置
 */

// https://vitepress.dev/zh/guide/custom-theme
import { AntDesignContainer } from "@vitepress-demo-preview/component"
import { Lazyload } from "vant"
import DefaultTheme from "vitepress/theme"

import { isClientEnv, isEnableDebug } from "@/utils"

import { setupServiceWorker } from "../../src/sw"

import Layout from "./Layout.vue"

import type { Theme } from "vitepress"

import "virtual:uno.css"
// 引入打包后的组件库样式
import "@dyb-dev/vant-pro/dist/style.css"
import "vant/lib/index.css"
import "ant-design-vue/dist/reset.css"
import "vue3-json-viewer/dist/index.css"
import "@vitepress-demo-preview/component/dist/style.css"
import "../../src/styles/index.scss"
import "./style.css"

export default {
    // 继承 VitePress 的默认主题
    extends: DefaultTheme,
    // 使用自定义的布局组件来替代默认的布局组件
    Layout,
    // 执行时机在 Vue 应用实例创建后但在挂载到 DOM 之前
    // app: Vue 应用实例 router: Vue Router 实例 siteData: 站点元数据
    // 用于扩展应用、注册路由守卫等等
    async enhanceApp ({ app }) {

        app.component("demo-preview", AntDesignContainer)

        // 客户端环境下
        if (isClientEnv()) {

            /** TODO: 如果需要使用 PWA 则解开此段代码 */
            setupServiceWorker()

            // 需要手动注册 v-lazy 指令,实现图片懒加载
            app.use(Lazyload, { lazyComponent: true })

            // 根据 debug 参数判断是否加载 eruda
            if (isEnableDebug()) {

                import("eruda")
                    .then(({ default: eruda }) => {

                        eruda.init()
                        window.eruda = eruda

                        console.log("[项目信息]", __PROJECT_INFO__)

                    })
                    .catch(error => {

                        console.error("eruda 加载失败", error)

                    })

            }

        }

    }
} satisfies Theme
