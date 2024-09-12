# Vant-Pro

[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/dyb-dev/vant-pro)

## 简介

`vant-pro` 是一个使用 [Vue3](https://cn.vuejs.org/) + [TS](https://www.typescriptlang.org/) + [Vant](https://vant-ui.github.io/vant/#/zh-CN/home) 二次封装的移动端组件库，目前仅支持浏览器环境。

## 特性

-   🎉 支持 Vue3 写法
-   🎉 支持完整的TS中文类型提示
-   🎉 支持组件函数式调用
-   🎉 支持源代码和在线预览示例
-   🎉 支持 Vant 主题定制
-   🎉 支持深色模式
-   🎉 支持现代浏览器

## 环境要求

-   Node.js 版本 >= 18.0.0
-   如果包管理器为 pnpm，版本需 >= 8.15.5

## 安装与使用

在安装 vant-pro 之前，需要具备以下前置条件:

```shell
# 安装 Vue3 最新版本
pnpm i vue

# 安装 vant 组件库 最新版本
pnpm i vant

# 安装 Vue 3 官方提供的组合式 API 和 工具函数 最新版本
pnpm i @vueuse/core
```

安装 **vant** 组件库之后，还需引入其提供的样式文件:

```ts
import { createApp } from "vue"
// 引入 vant 组件库样式
import "vant/lib/index.css"

const app = createApp()
```

**⚠️注意:**

如果 vant 的样式为按需加载的，那么会造成组件无法正常使用，这是由于当你在使用按需加载时，使用 vant-pro 的组件并不会去自动引入其内部 vant 组件的样式文件。

前置条件完成后，可以通过 pnpm 进行安装:

```shell
# 当然你也可以通过 npm、yarn 或 bun 进行安装
pnpm i @dyb-dev/vant-pro
```

## 快速上手

```ts
import { createApp } from "vue"
// 1. 引入 `ListPro` 组件
import { ListPro } from "@dyb-dev/vant-pro"
// 2. 引入 vant-pro 组件库样式
import "@dyb-dev/vant-pro/dist/style.css"

const app = createApp()

// 3. 注册 `ListPro` 组件

// 方式一. 通过 app.use 注册
app.use(ListPro)

// 方式二. 通过 app.component 注册
app.component(ListPro.name, ListPro)
```

更多内容请参阅[快速上手](https://dyb-dev.github.io/vant-pro/docs/quickstart/)。

## 链接

-   [文档](https://dyb-dev.github.io/vant-pro/)

## 开源协议

本项目基于 [MIT](https://zh.wikipedia.org/wiki/MIT%E8%A8%B1%E5%8F%AF%E8%AD%89) 协议，请自由地享受和参与开源。
