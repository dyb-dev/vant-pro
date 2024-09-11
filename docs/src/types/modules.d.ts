/** 定义vue文件导入模块，避免ts解析报错 */
declare module "*.vue" {
    import { defineComponent } from "vue"
    const Component: ReturnType<typeof defineComponent>
    export default Component
}

/** 定义vue3-json-viewer组件类型 */
declare module "vue3-json-viewer" {
    import { AllowedComponentProps, App, Component, ComponentCustomProps, VNodeProps } from "vue"

    interface JsonViewerProps {
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

    type JsonViewerType = JsonViewerProps & VNodeProps & AllowedComponentProps & ComponentCustomProps
    declare const JsonViewer: Component<JsonViewerType>
    export { JsonViewer }
    const def: { install: (app: App) => void }
    export default def
}
