# Vue 3 Migration Guide

This guide is primarily for users with prior Vue 2 experience who want to learn about the changes between Vue 2 and Vue 3. **This is not something you have to read from top to bottom before trying out Vue 3.** The recommended way to learn Vue 3 is by reading the [new documentation](https://vuejs.org).

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

## Notable New Features

Some of the new features to keep an eye on in Vue 3 include:

- [Composition API](https://vuejs.org/guide/extras/composition-api-faq.html)<span class="note">\*</span>
- [SFC Composition API Syntax Sugar (`<script setup>`)](https://vuejs.org/api/sfc-script-setup.html)<span class="note">\*</span>
- [Teleport](https://vuejs.org/guide/built-ins/teleport.html)
- [Fragments](./new/fragments.html)
- [Emits Component Option](https://vuejs.org/api/options-state.html#emits)<span class="note">\*\*</span>
- [`createRenderer` API from `@vue/runtime-core`](https://vuejs.org/api/custom-renderer.html) to create custom renderers
- [SFC State-driven CSS Variables (`v-bind` in `<style>`)](https://vuejs.org/api/sfc-css-features.html#v-bind-in-css)<span class="note">\*</span>
- [SFC `<style scoped>` can now include global rules or rules that target only slotted content](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0023-scoped-styles-changes.md)
- [Suspense](https://vuejs.org/guide/built-ins/suspense.html) <sup class="warning">experimental</sup>

<sub class="note"><b>\*</b> Now also supported in <a href="https://blog.vuejs.org/posts/vue-2-7-naruto.html" target="_blank">Vue 2.7</a></sub><br>
<sub class="note"><b>\*\*</b> Supported in Vue 2.7, but only for type inference</sub>

## Breaking Changes

Breaking changes between Vue 2 and Vue 3 are listed [here](./breaking-changes/).

## New Framework-level Recommendations

New framework-level recommendations are listed [here](/recommendations).

## Migration Build

If you have an existing Vue 2 project or library that you intend to upgrade to Vue 3, we provide a build of Vue 3 that offers Vue 2 compatible APIs. Check out the [Migration Build](./migration-build.html) page for more details.
