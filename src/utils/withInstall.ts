import type { App, Component } from "vue"

// https://github.com/vant-ui/vant/issues/8302
/**
 * 一个类型，用于为 Vue 组件的 props 添加 `onClick` 事件处理程序。
 * 这个 shim 用于确保组件拥有一个可选的 `onClick` 属性，用于事件处理。
 */
type EventShim = {
    new (...args: any[]): {
        $props: {
            onClick?: (...args: any[]) => void
        }
    }
}

/**
 * 一个类型，它扩展了 Vue 组件类型 (`T`)，以包含一个 `install` 方法。
 * `install` 方法用于将组件全局注册到 Vue 应用中。
 * 此外，组件还扩展了 `EventShim` 类型，以确保它可以处理 `onClick` 事件。
 */
type WithInstall<T> = T & {
    install(app: App): void
} & EventShim

/**
 * 一个实用函数，用于为 Vue 组件添加 `install` 方法。
 * 该方法允许将组件全局注册到 Vue 应用中。
 *
 * @template T - 组件类型
 * @param options - 需要添加 `install` 方法的组件
 * @returns 带有 `install` 方法的组件
 */
const withInstall = <T extends Component>(options: T) => {

    (options as Record<string, unknown>).install = (app: App) => {

        const { name } = options
        if (name) {

            app.component(name, options)

        }

    }

    return options as WithInstall<T>

}

export type { WithInstall }

export { withInstall }
