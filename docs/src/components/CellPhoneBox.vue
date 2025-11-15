<!--
 * @FileDesc: 手机盒子组件
 -->

<script setup lang="tsx">
import { App } from "ant-design-vue"
import { useData } from "vitepress"
import { computed, nextTick, onMounted, reactive, ref } from "vue"

/** HOOKS: 获取`vitepress`当前站点配置 */
const siteConfig = useData()

/** REACTIVE: 预览结果 */
const data = reactive({
    /** `vitepress`当前站点配置 */
    siteConfig
})

/** COMPUTED: 主题模式 */
const themeMode = computed(() => data.siteConfig.isDark ? "dark" : "light")

/** CONST: 盒子类名 */
const BOX_CLASS_NAME = "cell-phone-box"

/** REF: 元素 */
const boxElement = ref<HTMLElement>()

/** CONST: 盒子元素最大宽度 */
const BOX_MAX_WIDTH = 375

/** CONST: 盒子元素最大高度 */
const BOX_MAX_HEIGHT = 667

/** REF: 元素高度 */
const boxHeight = ref<number>(BOX_MAX_HEIGHT)

/** LIFECYCLE: 渲染 */
onMounted(async() => {

    await nextTick()

    // 如果已经赋值，则直接返回
    if (boxElement.value) {

        return

    }

    const _element = document.querySelector(`.${BOX_CLASS_NAME}`) as HTMLElement

    if (!_element) {

        console.error(`onMounted() =>> 未找到类名为${BOX_CLASS_NAME}的元素`)
        return

    }

    // 使用 ResizeObserver 监听 cell-phone-box 的宽度变化
    const observer = new ResizeObserver(entries => {

        for (const entry of entries) {

            // 当前元素宽度
            const _currentWidth = entry.contentRect.width

            // 如果宽度小于等于460px，达到手机最大宽度时，动态计算高度并赋值
            if (_currentWidth <= 460) {

                // 根据 MAX_ELEMENT_WIDTH / MAX_ELEMENT_HEIGHT 比例计算高度
                const _newHeight = _currentWidth * BOX_MAX_HEIGHT / BOX_MAX_WIDTH
                boxHeight.value = _newHeight

            }
            else {

                boxHeight.value = BOX_MAX_HEIGHT

            }

        }

    })

    observer.observe(_element)
    boxElement.value = _element

})

/** EXPOSE: 导出列表分页器状态信息 */
defineExpose({
    boxElement
})
</script>

<template>
    <App
        :class="[BOX_CLASS_NAME, `${BOX_CLASS_NAME}--${themeMode}`]"
        style="width: 100%"
        :style="{ maxWidth: `${BOX_MAX_WIDTH}px`, height: `${boxHeight}px` }"
    >
        <slot :box-element="boxElement"></slot>
    </App>
</template>

<style lang="scss" scoped>
.cell-phone-box {
    position: relative;
    overflow: hidden;
    border-radius: 20px;
    box-shadow: var(--cell-phone-box-shadow);

    &--light {
        --cell-phone-box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.1);
    }

    &--dark {
        --cell-phone-box-shadow: 0 4px 8px rgba(255, 255, 255, 0.1), 0 6px 20px rgba(255, 255, 255, 0.1);
    }

    &:deep(.van-popup),
    &:deep(.van-overlay) {
        position: absolute;
        z-index: 1 !important;
    }

    &:deep(.van-picker-column__wrapper) {
        margin: 0;
        padding: 0;
    }
    &:deep(.van-picker-column__item) {
        margin: 0;
    }

    &:deep(.van-back-top) {
        position: absolute;
    }
}
</style>
