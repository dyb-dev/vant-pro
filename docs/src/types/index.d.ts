import type VConsole from "vconsole"

declare global {
    /** 扩展 Window 接口 */
    interface Window {
        /** vconsole 实例 */
        vConsole: VConsole
        /** 项目信息(window全局) */
        __PROJECT_INFO__: IProjectInfo
    }
}
