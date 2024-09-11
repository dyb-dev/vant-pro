import { createApp, type Component } from "vue"

/** 挂载根节点的选择器，默认为 `#app` */
let mountComponentSelector: string = "#app"

/**
 * 获取挂载组件的根节点选择器
 *
 * @returns {string} 返回根节点选择器 默认为 `#app`，如果#app不存在则使用 `document.body`
 */
const getMountComponentSelector = (): string => {

    return mountComponentSelector

}

/**
 * 设置挂载组件的根节点选择器
 *
 * @param {string} selector - 新的根节点选择器 默认为 `#app`，如果#app不存在则使用 `document.body`
 */
const setMountComponentSelector = (selector: string) => {

    if (selector) {

        mountComponentSelector = selector

    }

}

/**
 * 默认选项接口
 */
interface IDefaultOptions {
    /** 是否显示 */
    show: boolean
    /** 卸载 */
    unmount: (...args: any[]) => void
}

/**
 * 用于过滤掉默认选项的类型工具
 *
 * @template Target - 目标类型
 */
type TFilteredDefaultOptions<Target> = Omit<Target, TKeys<IDefaultOptions>>

/**
 * 挂载组件
 *
 * @author dyb-dev
 * @date 01/09/2024/  16:52:46
 * @template Options - 传入的选项类型
 * @template Result - 返回的结果类型
 * @param {Component} component - 组件
 * @param {TFilteredDefaultOptions<Options>} [options] - 参数
 * @returns {*}  {Promise<Result>} 返回组件的动作类型
 */
const mountComponent = <Options extends Record<string, any> = Record<string, any>, Result extends any[] = any[]>(
    component: Component,
    options?: TFilteredDefaultOptions<Options>
): Promise<Result> => {

    return new Promise(resolve => {

        // 使用 document.querySelector 查找指定的根节点，如果找不到则使用 document.body
        const _rootNode = document.querySelector(mountComponentSelector) || document.body
        const _mountNode = document.createElement("div")

        const _app = createApp(component, {
            ...options,
            show: true,
            unmount: (...args: Result) => {

                _app.unmount()
                _rootNode.removeChild(_mountNode)
                resolve(args)

            }
        } as IDefaultOptions & TFilteredDefaultOptions<Options>)

        _rootNode.appendChild(_mountNode)
        _app.mount(_mountNode)

    })

}

export type { IDefaultOptions, TFilteredDefaultOptions }
export { mountComponent, getMountComponentSelector, setMountComponentSelector }
