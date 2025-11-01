import type { Eruda } from "eruda"

declare global {
    /** 扩展 Window 接口 */
    interface Window {
        /** eruda 实例 */
        eruda: Eruda
    }
}
