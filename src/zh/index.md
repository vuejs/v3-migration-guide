# Vue 3 迁移指南

本指南主要是为有 Vue 2 经验的、希望了解 Vue 3 的新功能和更改的用户而提供的。**在试用 Vue 3 之前，你不必完整阅读这些内容**。学习 Vue 3 的推荐方法是阅读[新的文档](https://cn.vuejs.org)。

<!-- VueMastery Start -->
<script setup>
import VueMasteryWidget from '../VueMastery.vue'
</script>
<VueMasteryWidget/>
<!-- VueMastery End -->

<style>
.note {
  color: #476582;
}
</style>

## 值得注意的新特性

Vue 3 中需要关注的一些新特性包括:

- [组合式 API](https://cn.vuejs.org/guide/extras/composition-api-faq.html)<span class="note">\*</span>
- [单文件组件中的组合式 API 语法糖 (`<script setup>`)](https://cn.vuejs.org/api/sfc-script-setup.html)<span class="note">\*</span>
- [Teleport 组件](https://cn.vuejs.org/guide/built-ins/teleport.html)
- [Fragments 片段](./new/fragments.html)
- [Emits 组件选项](https://cn.vuejs.org/api/options-state.html#emits)<span class="note">\*\*</span>
- [来自 `@vue/runtime-core` 的 `createRenderer` API](https://cn.vuejs.org/api/custom-renderer.html) 用来创建自定义渲染函数
- [单文件组件中的状态驱动的 CSS 变量 (`<style>` 中的 `v-bind`)](https://cn.vuejs.org/api/sfc-css-features.html#v-bind-in-css)<span class="note">\*</span>
- [SFC `<style scoped>` 新增全局规则和针对插槽内容的规则](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0023-scoped-styles-changes.md)
- [Suspense](https://cn.vuejs.org/guide/built-ins/suspense.html) <sup class="warning">实验性</sup>

<sub class="note"><b>\*</b> 现在也支持在 <a href="https://blog.vuejs.org/posts/vue-2-7-naruto.html" target="_blank">Vue 2.7</a> 中使用</sub><br>
<sub class="note"><b>\*\*</b> Vue 2.7 中支持，但仅用于类型推断</sub>

## 非兼容性改变

Vue 2 和 Vue 3 之间的非兼容性更改[在此](./breaking-changes/)列出。

## 新的推荐框架

新的推荐框架[在此](./recommendations)列出。

## 用于迁移的构建版本

如果您有一个现有的 Vue 2 项目或库，并打算将其升级到 Vue 3，我们将提供一个 Vue 3 的构建版本，它提供与 Vue 2 兼容的 api。查看[用于迁移的构建版本](./migration-build)页面了解更多细节。
