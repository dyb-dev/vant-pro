/*
 * @FileDesc: 构建工具函数模块
 */

import { existsSync, readFileSync } from "fs"
import { networkInterfaces } from "os"
import { resolve, basename } from "path"

import dayjs from "dayjs"
import { VitePWA } from "vite-plugin-pwa"

import pkg from "../../../package.json"

/**
 * FUN: 生成项目信息
 *
 * @author dyb-dev
 * @date 15/08/2024/  20:42:38
 * @export
 * @param {ImportMetaEnv} env - 环境变量
 * @returns {*}  {IProjectInfo} - 项目信息
 */
export const generateProjectInfo = (env: ImportMetaEnv): IProjectInfo => {

    // @ts-ignore
    const { name, version, dependencies = {} } = pkg
    const _dayObj = dayjs()
    const _projectVersion = _dayObj.format("YYYYMMDDHHmmss")
    const _lastBuildTime = _dayObj.format("YYYY-MM-DD HH:mm:ss")

    const _projectInfo: IProjectInfo = {
        version: _projectVersion,
        lastBuildTime: _lastBuildTime,
        env,
        pkg: { name, version, dependencies }
    }

    return _projectInfo

}

/**
 * FUN: 获取可用IPv4主机ip(192.168.10.191)
 *
 * @author dyb-dev
 * @date 26/03/2024/  22:56:49
 * @export
 * @returns {*}  {string}
 */
export const getAvailableIPv4HostIP = (): string => {

    const _address = networkInterfaces().en0?.find(details => !details.internal && details.family === "IPv4")?.address
    if (!_address) {

        console.error("getAvailableIPv4HostIP() 获取可用IPv4主机ip失败！")
        return "localhost"

    }

    return _address

}

/**
 * FUN: 获取远程仓库名称
 *
 * @author dyb-dev
 * @date 12/09/2024/ 14:57:29
 * @param {string} gitStorageDir - Git 存放目录 例如: 项目根目录
 * @returns {string} - 远程仓库名称
 */
export const getRemoteRepositoryName = (gitStorageDir: string): string => {

    /** 远程仓库名称 */
    let _remoteName = ""

    try {

        // 拼接 .git/config 文件的路径
        const _gitConfigPath = resolve(gitStorageDir, "./.git/config")
        // 检查 .git/config 文件是否存在
        if (!existsSync(_gitConfigPath)) {

            throw `无法找到git配置文件 _gitConfigPath: ${_gitConfigPath}`

        }

        const _gitConfig = readFileSync(_gitConfigPath, "utf-8")

        // 匹配 [remote "xxx"] 结构，获取 remote 名称
        const _match = _gitConfig.match(/\[remote "(.*)"\]/)

        if (!_match) {

            throw `无法匹配到远程仓库名称 _match: ${_match}`

        }

        // 提取 remote 名称
        _remoteName = _match[1]

    }
    catch (error) {

        // 使用 ANSI 码将输出设置为红色
        console.error("\x1b[31m%s\x1b[0m", `getRemoteRepositoryName() =>> ${error}`)

    }

    return _remoteName

}

/** 设置setupVitePWA参数 */
interface ISetupVitePWAParam {
    /** 项目根目录 */
    projectRootDir: string
    /** 环境变量 */
    env: ImportMetaEnv
    /** 项目信息 */
    __PROJECT_INFO__: IProjectInfo
}

/**
 * FUN: 设置VitePWA插件
 *
 * @author dyb-dev
 * @date 24/04/2024/  16:42:29
 * @export
 * @param {ISetupVitePWAParam} param - 参数
 * @returns {*}  {any[]}
 */
export const setupVitePWAPlugin = (param: ISetupVitePWAParam): any[] => {

    const {
        projectRootDir,
        env,
        __PROJECT_INFO__: { version }
    } = param
    const { VITE_OUT_DIR } = env

    /** CONST: icon路径前缀 */
    const _iconsPathPrefix = "/image/sw/"

    /** CONST: 资源路径参数 */
    const _assetsPathParam = `?version=${version}`

    /** CONST: 哈希文件名的正则表达式模式 */
    const _hashPattern = /\..{8}\./

    /** CONST: 输出目录绝对路径 */
    const _outDirAbsolutePath = resolve(projectRootDir, `./${VITE_OUT_DIR}`)

    return VitePWA({
        // manifest清单配置
        manifest: {
            name: pkg.name,
            short_name: pkg.name,
            description: pkg.description,
            theme_color: "#ffffff",
            icons: [
                {
                    src: `${_iconsPathPrefix}pwa-192x192.png${_assetsPathParam}`,
                    sizes: "192x192",
                    type: "image/png"
                },
                {
                    src: `${_iconsPathPrefix}pwa-512x512.png${_assetsPathParam}`,
                    sizes: "512x512",
                    type: "image/png"
                }
            ]
        },
        // 是否给 <link rel="manifest"> 标签添加 crossorigin="use-credentials" 属性 默认: false
        useCredentials: true,

        // Service Worker脚本 创建策略，默认: generateSW
        // generateSW: 根据配置生成Service Worker脚本文件，一般不需要高度定制Service Worker的情况直接选择generateSW就行 （注意:该策略只支持 GET 请求缓存）
        // injectManifest: 使用自定义Service Worker脚本文件，注入资源列表到脚本中，自己控制缓存策略，一般适用于复杂一点的缓存策略
        strategies: "injectManifest",

        // strategies:injectManifest 时 自定义 Service Worker 脚本存放目录 默认: public
        srcDir: resolve(projectRootDir, "./src/sw"),
        // strategies:injectManifest 时 自定义 service worker 脚本文件名 默认: sw.js
        filename: "sw.ts",
        // 编译后的 Service Worker 脚本输出目录 默认: dist
        outDir: _outDirAbsolutePath,
        // service worker的更新方式 autoUpdate:自动 prompt:手动 默认值: prompt
        registerType: "autoUpdate",
        // strategies:injectManifest 时配置
        injectManifest: {
            // 构建时输出格式 默认: iife
            rollupFormat: "es",
            // 是否添加源映射
            sourcemap: false,
            // 是否压缩sw脚本
            minify: true,
            // 生成的预缓存清单注入在Service Worker脚本的位置 默认: self.__WB_MANIFEST
            injectionPoint: "self.__WB_MANIFEST",
            // 预缓存的文件的最大大小 默认: 2097152 字节（2MB）
            maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
            // `globPatterns`根据此目录来匹配文件
            globDirectory: _outDirAbsolutePath,
            // 首次进入网站时，预缓存清单需要包含的资源类型（注意: 预缓存清单只在生产环境有效）
            globPatterns: [
                "**/*.{ico,html,js,css,webp,jpg,jpeg,png,gif,svg,ttf,woff,woff2,otf,eot,mp3,wav,ogg,mp4,webm,json,bmp,psd,tiff,tga,eps}"
            ],
            // 需要额外添加的预缓存清单的资源
            // additionalManifestEntries: [],
            // 自定义修改和设置预缓存清单的内容
            manifestTransforms: [
                entries => {

                    const manifest = entries.map(entry => {

                        /** 预缓存清单的资源url */
                        const _url = entry.url

                        // 如果当前资源 url 不是`根文件`类型且不是包含`hash`的文件名时
                        if (!_hashPattern.test(basename(_url))) {

                            entry.url += _assetsPathParam

                        }
                        return entry

                    })

                    return { manifest }

                }
            ]
        }
    })

}
