/*
 * @Author: dyb-dev
 * @Date: 2024-08-21 00:12:28
 * @LastEditors: dyb-dev
 * @LastEditTime: 2024-08-21 00:14:17
 * @FilePath: /lib-docs-template/types/index.d.ts
 * @Description: app 和 node 共有的环境类型定义模块
 */

/** 项目信息(window全局) */
declare interface IProjectInfo {
    /** 包信息 */
    pkg: {
        /** 包名称 */
        name: string
        /** 包版本 */
        version: string
        /** 生产依赖 */
        dependencies: Record<string, string>
        /** 开发依赖 */
        devDependencies: Record<string, string>
    }
    /** 项目版本 */
    version: string
    /** 项目最后构建时间 */
    lastBuildTime: string
    /** 环境变量 */
    env: ImportMetaEnv
}

/** 项目信息(window全局) */
declare const __PROJECT_INFO__: IProjectInfo
