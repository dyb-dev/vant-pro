import type { DefaultTheme } from "vitepress"

/** STATIC: `左侧边栏` 对应根目录 */
const rootDir = "/docs"

/** STATIC: `左侧边栏` 对应根文件路径 */
const rootFilePath = `${rootDir}/home/`

/** STATIC: `左侧边栏` 链接映射配置 */
const config: DefaultTheme.Sidebar = {
    [rootDir]: [
        {
            text: "介绍",
            link: rootFilePath
        },
        {
            text: "快速上手",
            link: `${rootDir}/quickstart/`
        },
        {
            text: "组件",
            collapsed: false,
            items: [
                {
                    text: "TransitionPro 过渡",
                    link: `${rootDir}/components/TransitionPro/`
                },
                {
                    text: "LoadBox 加载盒子",
                    link: `${rootDir}/components/LoadBox/`
                },
                {
                    text: "ListPro 列表",
                    link: `${rootDir}/components/ListPro/`
                },
                {
                    text: "CalendarPro 日历",
                    link: `${rootDir}/components/CalendarPro/`
                },
                {
                    text: "选择器",
                    collapsed: false,
                    items: [
                        {
                            text: "PickerPro 自定义选择器",
                            link: `${rootDir}/components/picker/PickerPro/`
                        },
                        {
                            text: "AreaPickerPro 省市区选择器",
                            link: `${rootDir}/components/picker/AreaPickerPro/`
                        },
                        {
                            text: "DatePickerPro 日期选择器",
                            link: `${rootDir}/components/picker/DatePickerPro/`
                        },
                        {
                            text: "TimePickerPro 时间选择器",
                            link: `${rootDir}/components/picker/TimePickerPro/`
                        }
                    ]
                }
            ]
        }
    ]
}

/** STATIC: `左侧边栏` 配置 */
const sidebar = {
    rootDir,
    rootFilePath,
    config
}

export { sidebar as docsSidebar }
