## 目录表 {#table-of-contents}

**输入**

```md
[[toc]]
```

**输出**

[[toc]]

## Emoji :tada:

[emoji字典](https://github.com/markdown-it/markdown-it-emoji/blob/master/lib/data/full.mjs)

**输入**

```md
:tada: :100:
```

**输出**

:tada: :100:

## 徽标 {#badge}

**输入**

```md
Title <Badge type="info" text="default" />

Title <Badge type="tip" text="^1.9.0" />

Title <Badge type="warning">beta</Badge>

Title <Badge type="danger">caution</Badge>
```

**输出**

Title <Badge type="info" text="default" />

Title <Badge type="tip" text="^1.9.0" />

Title <Badge type="warning">beta</Badge>

Title <Badge type="danger">caution</Badge>

## 自定义容器 {#custom-containers}

**输入**

```md
::: info
这是一个信息框。
:::

::: tip
这是一个提示。
:::

::: warning
这是一个警告。
:::

::: danger
这是一个危险警告。
:::

::: details
这是一个详细信息块。
:::
```

**输出**

::: info
这是一个信息框。
:::

::: tip
这是一个提示。
:::

::: warning
这是一个警告。
:::

::: danger
这是一个危险警告。
:::

::: details
这是一个详细信息块。
:::

## 表格 {#tables}

**输入**

```md
| Tables        |      Are      |  Cool |
| ------------- | :-----------: | ----: |
| col 3 is      | right-aligned | $1600 |
| col 2 is      |   centered    |   $12 |
| zebra stripes |   are neat    |    $1 |
```

**输出**

| Tables        |      Are      |   Cool |
| ------------- | :-----------: | -----: |
| col 3 is      | right-aligned | \$1600 |
| col 2 is      |   centered    |   \$12 |
| zebra stripes |   are neat    |    \$1 |

## 代码高亮 {#code-highlight}

-   方法1: `{5-8}`、`{4,7,9}`、`{4,7-13,16,23-27,40}`
-   方法2: `// [!code highlight]`

**输入**

````md
```js{1-2,4}
export default {
  data () {
    return {}
  }
} // [!!code highlight]
```
````

**输出**

```js{1-2,4}
export default {
  data () {
    return {}
  }
} // [!code highlight]
```

## 代码聚焦 {#code-focus}

`// [!code focus:<lines>]`

`:<lines>` 聚焦的行数(选填)

**输入**

````md
```js
export default {
    data() {} // [!!code focus]
}
```
````

**输出**

```js
export default {
    data() {} // [!code focus]
}
```

## 代码修改 {#code-modify}

`// [!code --]` 或 `// [!code ++]`

**输入**

````md
```js
export default {
    data() {
        return {
            msg1: "Removed", // [!!code --]
            msg2: "Added" // [!!code ++]
        }
    }
}
```
````

**输出**

```js
export default {
    data() {
        return {
            msg1: "Removed", // [!code --]
            msg2: "Added" // [!code ++]
        }
    }
}
```

## 代码“错误”和“警告” {#errors-and-warnings-in-code-blocks}

`// [!code warning]` 或 `// [!code error]`

**输入**

````md
```js
export default {
    data() {
        return {
            msg1: "Error", // [!!code error]
            msg2: "Warning" // [!!code warning]
        }
    }
}
```
````

**输出**

```js
export default {
    data() {
        return {
            msg1: "Error", // [!code error]
            msg2: "Warning" // [!code warning]
        }
    }
}
```

## 导入文件代码 {#import-file-code}

`@` 对应于 `VitePress` 配置的 `srcDir` 选项，默认 `views`

**输入**

```md
<<< @/reference/component/index.vue{5-10}
```

**输出**

<<< @/reference/component/index.vue{5-10}

## 导入文件代码片段 {#import-file-code-snippet}

`@` 对应于 `VitePress` 配置的 `srcDir` 选项，默认 `views`

**输入**

```md
<<< @/reference/component/index.vue#snippet
```

**输出**

<<< @/reference/component/index.vue#snippet

## 代码分组 {#code-groups}

**输入**

````md
::: code-group

```js [config.js]
export default config
```

```ts [config.ts]
export default config
```

:::
````

**输出**

::: code-group

```js [config.js]
export default config.js
```

```ts [config.ts]
export default config.ts
```

:::

## 文件代码分组 {#file-code-groups}

`@` 对应于 `VitePress` 配置的 `srcDir` 选项，默认 `views`

**输入**

```md
::: code-group

<<< @/reference/component/index.vue{5-10}

<<< @/reference/component/index.vue#snippet

:::
```

**输出**

::: code-group

<<< @/reference/component/index.vue{5-10}

<<< @/reference/component/index.vue#snippet

:::

## 内嵌 vue 文件 {#vue-file-inclusion}

`@` 对应于 `VitePress` 的 `vite` 配置的 `resolve.alias` 选项，默认 `src`

**输入**

```vue
<script setup>
import TestComponent from "@/views/reference/component/index.vue"
import { toAssetsAbsoluteUrl } from "@/utils"
</script>

<TestComponent />
```

**输出**

<script setup>
import TestComponent from '@/views/reference/component/index.vue'
import { toAssetsAbsoluteUrl } from "@/utils"
</script>

<TestComponent/>

## 内嵌 markdown 文件 {#markdown-file-inclusion}

`@` 对应于 `VitePress` 配置的 `srcDir` 选项，默认 `views`

`{x,x}` 内嵌几行至几行(选填)

**输入**

```md
<!-- @include: @/index.md{x,x} -->
```

**输出**

<!-- @include: @/index.md{3,3} -->

## 导航VitePress页面 {#vitepress-pages}

**输入**

```md
[首页](/)
[目录](/reference/component/#table-of-contents)
```

**输出**

[首页](/) [目录](/reference/#table-of-contents)

## 导航非VitePress页面 {#external-pages}

**输入**

```vue
<a href="https://vitepress.dev/zh/" target="_self">vitepress</a>
```

**输出**

<a href="https://vitepress.dev/zh/" target="_self">vitepress</a>

## 使用assets目录资源 {#assets-dir}

`@` 对应于 `VitePress` 的 `vite` 配置的 `resolve.alias` 选项，默认 `src`

::: tip
必须使用 `@` 符号否则会报错
:::

**输入**

```vue
<img style="width: 150px" src="@/assets/image/bg.png" alt="" />
```

**输出**

<img style="width: 150px" src="@/assets/image/bg.png" alt="" />

## 使用public目录资源 {#public-dir}

::: tip
推荐使用 `src/utils/url` 目录提供的 `toAssetsAbsoluteUrl` 方法拼接路径

如果 `VITE_BASE_PATH` 为空，可直接用 `/` 拼接，例如: `/image/game.jpg`
:::

**输入**

```vue
<img style="width: 150px" :src="toAssetsAbsoluteUrl(`/image/game.jpg`)" alt="" />
```

**输出**

<img style="width: 150px" :src="toAssetsAbsoluteUrl(`/image/game.jpg`)" alt="" />

## 更多 {#more}

查看文档获取 [完整的 Markdown 扩展列表](https://vitepress.dev/zh/guide/markdown)。
