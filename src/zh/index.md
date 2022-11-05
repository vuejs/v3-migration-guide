# Vue 3 迁移指南

本指南主要针对有 Vue 2 经验的用户，他们希望了解 Vue 2 和 Vue 3 之间的变化。**在使用 Vue 3 之前，你不需要从头到尾阅读这篇文章**。学习 Vue 3 的推荐方法是阅读[新的文档](https://cn.vuejs.org)。

<!-- VueMastery Start -->
<style>
.vue-mastery-link {
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 8px 16px 8px 8px;
}

.vue-mastery-link a {
  display: flex;
  align-items: center;
  text-decoration: none;
}

.vue-mastery-link .banner {
  background-color: #f9f9f9;
  border-radius: 4px;
  width:96px;
  height:56px;
  object-fit: cover;
}

.vue-mastery-link .description {
  flex: 1;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #213547;
  margin: 0 0 0 16px;
}

.vue-mastery-link .description span {
  color: #42b883;
}

.vue-mastery-link .logo-wrapper {
  position: relative;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
}

.vue-mastery-link .logo-wrapper img {
  width: 25px;
  object-fit: contain;
}

@media (max-width: 576px) {
  .vue-mastery-link .banner {
    width:56px;
  }

  .vue-mastery-link .description {
    font-size: 12px;
    line-height: 18px;
  }
  .vue-mastery-link .logo-wrapper {
    position: relative;
    width: 32px;
    height: 32px;
  }
}
</style>

<div class="vue-mastery-link">
  <a href="https://www.vuemastery.com/migration-guide-cheat-sheet/" target="_blank">
    <div class="banner-wrapper">
      <img class="banner" alt="Vue Mastery banner" width="96px" height="56px" src="https://storage.googleapis.com/vue-mastery.appspot.com/flamelink/media/vuemastery-graphical-link-96x56.png" />
    </div>
    <p class="description">Get the free Migration Guide Cheat Sheet at <span>VueMastery.com</span></p>
    <div class="logo-wrapper">
        <img alt="Vue Mastery Logo" width="25px" src="https://storage.googleapis.com/vue-mastery.appspot.com/flamelink/media/vue-mastery-logo.png" />
    </div>
  </a>
</div>
<!-- VueMastery End -->

<style>
.note {
  color: #476582;
}
</style>

## 值得注意的新特性

Vue 3 中需要关注的一些新特性包括:

- [组合式 API](https://cn.vuejs.org/guide/extras/composition-api-faq.html)<span class="note">\*</span>
- [单文件组件，组合式 API 语法糖 (`<script setup>`)](https://cn.vuejs.org/api/sfc-script-setup.html)<span class="note">\*</span>
- [Teleport 组件](https://cn.vuejs.org/guide/built-ins/teleport.html)
- [Fragments 片段](/zh/new/fragments.html)
- [Emits 组件选项](https://cn.vuejs.org/api/options-state.html#emits)<span class="note">\*\*</span>
- [`createRenderer` API from `@vue/runtime-core`](https://cn.vuejs.org/api/custom-renderer.html) 用来创建自定义渲染函数
- [单文件组件，状态绑定 CSS 变量(`v-bind` in `<style>`)](https://cn.vuejs.org/api/sfc-css-features.html#v-bind-in-css)<span class="note">\*</span>
- [SFC `<style scoped>` 新增全局规则和针对插槽内容规则](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0023-scoped-styles-changes.md)
- [Suspense](https://cn.vuejs.org/guide/built-ins/suspense.html) <sup class="warning">实验性</sup>

<sub class="note"><b>\*</b> 现在也支持在 <a href="https://blog.vuejs.org/posts/vue-2-7-naruto.html" target="_blank">Vue 2.7</a></sub><br>
<sub class="note"><b>\*\*</b> Vue 2.7 中支持, 但仅用于类型推断</sub>

## 非兼容性改变

列出了 Vue 2 和 Vue 3 之间的非兼容性更改 [这里](/zh/breaking-changes/)。

## 新的框架级别推荐

列出了新的框架级建议 [这里](/zh/recommendations)。

## 迁移构建

如果您有一个现有的 Vue 2 项目或库，并打算将其升级到 Vue 3，我们将提供一个 Vue 3 的构建版本，它提供与 Vue 2 兼容的 api。查看 [迁移构建](/zh/migration-build) 页面了解更多细节。