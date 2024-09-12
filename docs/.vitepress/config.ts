/*
 * @Author: dyb-dev
 * @Date: 2024-06-24 19:59:56
 * @LastEditors: dyb-dev
 * @LastEditTime: 2024-09-12 15:25:04
 * @FilePath: /vant-pro/docs/.vitepress/config.ts
 * @Description: VitePress配置文件
 */

import { resolve } from "path"

import { containerPreview, componentPreview } from "@vitepress-demo-preview/plugin"
import { getPort } from "portfinder-sync"
import ViteMkcertPlugin from "vite-plugin-mkcert"
import { defineConfig, loadEnv } from "vitepress"

import { repository } from "../../package.json"
import { docsSidebar } from "../src/views/docs"
import { referenceSidebar } from "../src/views/reference"

import { generateProjectInfo, getAvailableIPv4HostIP, getRemoteRepositoryName, setupVitePWAPlugin } from "./utils"

import type { UserConfigFn, DefaultTheme } from "vitepress"

/** STATIC: 顶部菜单配置 */
const nav: DefaultTheme.NavItem[] = [
    { text: "首页", link: "/" },
    { text: "文档", link: docsSidebar.rootFilePath },
    { text: "参考", link: referenceSidebar.rootFilePath }
]

/** STATIC: 左侧边栏菜单配置 */
const sidebar: DefaultTheme.Sidebar = { ...docsSidebar.config, ...referenceSidebar.config }

/** STATIC: 项目根目录 */
const projectRootDir = resolve(__dirname, "../")

/** STATIC: 是否开发模式 */
const isDevMode = process.env.NODE_ENV === "development"

// VitePress配置 示例:(https://vitepress.dev/zh/reference/site-config)
const configFn: UserConfigFn<DefaultTheme.Config> = ({ mode }) => {

    /** STATIC: 获取.env文件的环境变量 */
    const _env = loadEnv(mode, resolve(projectRootDir, "../")) as unknown as ImportMetaEnv

    const {
        VITE_PROJECT_ASSETS_DIR_PREFIX,
        VITE_MARKDOWN_SOURCE_DIR,
        VITE_OUT_DIR,
        VITE_OUT_ASSETS_DIR,
        VITE_PROTOCOL,
        VITE_PORT,
        VITE_PROXY_DOMAIN,
        VITE_PUBLIC_ASSETS_DIR,
        VITE_PWA
    } = _env

    /** STATIC: 项目信息 */
    const __PROJECT_INFO__ = generateProjectInfo(_env)

    /** STATIC: 路径参数 */
    const _query = `?version=${__PROJECT_INFO__.version}`

    /** STATIC: logo路径 需要加版本号保证PWA模式下正常离线缓存 */
    const _logoPath = `/image/logo.png${_query}`

    /** STATIC: favicon路径前缀 */
    const _faviconPathPrefix = isDevMode ? "" : `/${getRemoteRepositoryName(resolve(projectRootDir, "../"))}`

    /** STATIC: favicon路径 需要加版本号保证PWA模式下正常离线缓存 */
    const _faviconPath = `${_faviconPathPrefix}/image/favicon.ico${_query}`

    /** STATIC: 端口号 */
    const _port = getPort(~~VITE_PORT)

    /** STATIC: 浏览器打开地址 */
    const _browserOpenUrl = `${VITE_PROTOCOL}://${getAvailableIPv4HostIP()}:${_port}`

    return defineConfig({
        // 网站标题
        title: "Vant-Pro",
        // 网站描述
        description: "Vant-Pro组件库文档",
        // 网站基础路径
        base: isDevMode ? "/" : VITE_PROJECT_ASSETS_DIR_PREFIX || "/",
        // markdown 源文件目录
        srcDir: resolve(projectRootDir, `./src/${VITE_MARKDOWN_SOURCE_DIR}`),
        // 打包输出目录 默认: ./.vitepress/dist
        outDir: resolve(projectRootDir, `./${VITE_OUT_DIR}`),
        // 打包输出目录内的资源目录 默认: assets
        assetsDir: VITE_OUT_ASSETS_DIR,
        // 缓存文件的目录 默认: ./.vitepress/cache
        cacheDir: resolve(projectRootDir, "./cache"),
        // 排除作为源内容输出的 markdown 文件
        srcExclude: ["**/README.md", "**/TODO.md"],
        // 将页面元数据提取到单独的 js 块中，而不是内联在初始 HTML 中,使页面元数据可缓存,减少服务器带宽
        metaChunk: true,
        // 是否显示 git 最后更新时间
        lastUpdated: true,
        // 注入的额外 head 标签
        head: [
            [
                "link",
                {
                    rel: "icon",
                    type: "image/x-icon",
                    href: _faviconPath
                }
            ]
        ],
        // 多语言配置
        locales: {
            root: {
                label: "简体中文",
                lang: "zh-CN"
            }
        },

        // 主题配置 示例:(https://vitepress.dev/zh/reference/default-theme-config)
        themeConfig: {
            // 左上角 logo
            logo: _logoPath,
            // 左上角 标题
            siteTitle: "Vant-Pro",
            // 右上角 icon
            socialLinks: [{ icon: "github", link: repository.url }],
            // 页脚配置
            footer: {
                // 页脚文本
                message:
                    'Released under the <a href="https://github.com/dyb-dev/vant-pro/blob/main/LICENSE" target="_blank">MIT License</a>.',
                // 版权信息
                copyright: 'Copyright © 2019-present <a href="https://github.com/dyb-dev" target="_blank">dyb-dev</a>'
            },
            // 页面编辑链接配置
            editLink: {
                pattern: "https://github.com/dyb-dev/vant-pro/tree/main/docs/src/views/:path",
                text: "为此页面提供修改建议"
            },

            // 顶部菜单栏
            nav,
            // 左侧边栏配置
            sidebar,
            // 外部链接旁显示外部链接图标
            externalLinkIcon: true,
            // 右侧边栏位置 false:禁用 true:右侧 left:左侧
            aside: true,
            // 右侧边栏配置
            outline: {
                // 允许显示的目录等级
                level: [1, 3],
                // 显示默认目录描述
                label: "目录大纲"
            },
            // 左侧边栏菜单按钮提示文本 (移动端)
            sidebarMenuLabel: "菜单",
            // 页面返回顶部按钮提示文本 (移动端)
            returnToTopLabel: "返回顶部",
            // 主题切换按钮 (移动端) 提示文本
            darkModeSwitchLabel: "主题切换",
            // 主题切换按钮 (深色) 悬浮提示文本
            lightModeSwitchTitle: "切换到浅色主题",
            // 主题切换按钮 (浅色) 悬浮提示文本
            darkModeSwitchTitle: "切换到深色主题",
            // 自定义导航栏中语言切换按钮的 aria-label，仅当使用 i18n 时才使用此选项
            langMenuLabel: "切换语言",
            // 页面最后更新时间配置
            lastUpdated: {
                text: "最后更新时间于:",
                formatOptions: {
                    // 显示完整的日期格式，包括星期、月份、日期和年份
                    dateStyle: "full",
                    // 显示中等长度的时间格式，通常包括小时、分钟和秒
                    timeStyle: "medium"
                }
            },
            // 页面 访问 `上一页` 和 `下一页` 按钮配置
            docFooter: {
                prev: "上一页",
                next: "下一页"
            },
            // 搜索配置
            search: {
                provider: "local",
                options: {
                    locales: {
                        root: {
                            translations: {
                                button: {
                                    buttonText: "搜索"
                                },
                                modal: {
                                    displayDetails: "显示详情",
                                    noResultsText: "无法找到相关结果",
                                    resetButtonTitle: "清除查询条件",
                                    footer: {
                                        selectText: "选择",
                                        navigateText: "切换",
                                        closeText: "关闭"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },

        // markdown-it配置（作用于`markdown`文件）
        markdown: {
            config(md) {

                // 支持使用 :::preview 容器预览vue组件
                md.use(<any>containerPreview)
                // 支持使用 <preview path="./xxx/xx.vue" title="" description=""></preview> 组件预览vue组件
                md.use(<any>componentPreview)

            },
            // 是否在代码块中显示行号
            lineNumbers: true,
            // 指定代码高亮主题，例如(js、ts)
            theme: {
                light: "github-light",
                dark: "github-dark"
            },
            image: {
                // 开启图片懒加载 默认: false
                lazyLoading: true
            }
        },

        // Vite配置 示例:(https://cn.vitejs.dev/)
        vite: {
            // 公共资源目录 默认：`srcDir`目录下的`public`目录
            publicDir: resolve(projectRootDir, `./${VITE_PUBLIC_ASSETS_DIR}`),

            resolve: {
                // 路径别名
                alias: {
                    "@": resolve(projectRootDir, "./src")
                },
                // 导入时想要省略的扩展名集合
                extensions: [".js", ".ts", ".jsx", ".tsx", ".json", ".mjs", ".mts", ".cjs", ".cts"]
            },

            // 用于在window环境中注入全局变量
            define: {
                __PROJECT_INFO__: JSON.stringify(__PROJECT_INFO__)
            },

            css: {
                // 开发过程中是否启用 sourcemap，默认：false
                devSourcemap: true,
                // 指定传递给 CSS 预处理器的选项
                preprocessorOptions: {
                    scss: {
                        additionalData: `
                            @use "${projectRootDir}/src/styles/scss-var.scss" as *;
                            @use "${projectRootDir}/src/styles/mixins/index.scss" as *;
                            @use "${projectRootDir}/src/styles/funs/index.scss" as *;
                        `
                    }
                }
            },

            json: {
                // 是否支持从 .json 文件中进行按名导入，示例：import { name, age } from './data.json';
                namedExports: false,
                // 开启则会禁用按名导入,导入的 JSON 会被转换为 export default JSON.parse("...") 会比转译成对象字面量性能更好，
                stringify: true
            },

            plugins: [
                // 是否使用 PWA 离线访问 当 preview 时，带有路径前缀，则浏览器地址栏需要添加 index.html，因为PWA的缓存路径带有index.html，否则离线刷新页面会出现404
                VITE_PWA === "true" &&
                    setupVitePWAPlugin({
                        projectRootDir,
                        env: _env,
                        __PROJECT_INFO__
                    }),
                // 是否使用https
                VITE_PROTOCOL === "https" &&
                    ViteMkcertPlugin({
                        // 指定mkcert下载源
                        source: "coding",
                        // 证书保存路径
                        savePath: resolve(projectRootDir, "./dev-https-cert")
                    })
            ],

            server: {
                // 允许任何来源的请求，默认：'localhost'
                host: "0.0.0.0",
                // 端口号，默认： 5173
                port: _port,
                // 若端口已被占用，尝试下一个可用端口
                strictPort: false,
                // 浏览器打开地址，默认：http://localhost:8080/
                open: _browserOpenUrl,
                // 请求代理配置
                proxy: {
                    "/posts": {
                        // 代理目标服务器
                        target: VITE_PROXY_DOMAIN,
                        // 解决跨域
                        changeOrigin: true
                        // 根据当前请求路径，添加一个重写规则
                        // rewrite: (path) => path.replace(/^\/api/, ""),
                    }
                }
            }
        }
    })

}

export default configFn
