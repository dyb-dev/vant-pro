import type { DefaultTheme } from "vitepress"

/** CONST: `左侧边栏` 对应根目录 */
const rootDir = "/reference"

/** CONST: `左侧边栏` 对应根文件路径 */
const rootFilePath = `${rootDir}/`

/** CONST: `左侧边栏` 链接映射配置 */
const config: DefaultTheme.Sidebar = {
    [rootDir]: [
        {
            text: "常用",
            link: rootFilePath
        },
        {
            text: "高级组件",
            // `组`是否可折叠
            collapsed: false,
            items: [
                {
                    text: "示例",
                    link: `${rootDir}/component/`
                }
            ]
        },
        {
            text: "API",
            link: "https://vitepress.dev/zh/reference/runtime-api"
        }
    ]
}

/** CONST: `左侧边栏` 配置 */
const sidebar = {
    rootDir,
    rootFilePath,
    config
}

export { sidebar as referenceSidebar }
