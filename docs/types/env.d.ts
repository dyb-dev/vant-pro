/** vite环境变量 */
interface ImportMetaEnv {
    // STATIC: 运行时注入的环境变量
    /** 运行时注入 基础路径 */
    readonly BASE_URL: string
    /** 运行时注入 是否为开发环境 */
    readonly DEV: boolean
    /**
     * 运行时注入 当前模式
     * - development: 开发环境
     * - production: 生产环境
     */
    readonly MODE: "development" | "production"
    /** 运行时注入 是否为生产环境 */
    readonly PROD: boolean
    /** 运行时注入 是否为服务端渲染模式 */
    readonly SSR: boolean

    // STATIC: 公共
    /** 协议 默认:http  */
    readonly VITE_PROTOCOL: string
    /** 默认端口号 默认:8080 */
    readonly VITE_PORT: string
    /** 公共资源目录 默认:public */
    readonly VITE_PUBLIC_ASSETS_DIR: string
    /** markdown源文件目录 默认:views */
    readonly VITE_MARKDOWN_SOURCE_DIR: string
    /** 是否启用PWA 默认:false */
    readonly VITE_PWA: string
    /** 本地服务器代理目标域 默认:http://xxx.com/ */
    readonly VITE_PROXY_DOMAIN: string

    // STATIC: 生产环境
    /** 打包输出目录 默认:dist */
    readonly VITE_OUT_DIR: string
    /** 打包输出资源目录 默认:assets */
    readonly VITE_OUT_ASSETS_DIR: string
    /** 网站基础路径 默认:空 */
    readonly VITE_BASE_PATH: string
}

/** 扩展 ImportMeta 接口 */
interface ImportMeta {
    readonly env: ImportMetaEnv
}
