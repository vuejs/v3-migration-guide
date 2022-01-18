---
sidebar: false
---

# Vue 3 Migration Guide

This guide is primarily for users with prior Vue 2 experience who want to learn about the changes between Vue 2 and Vue 3. **This is not something you have to read from top to bottom before trying out Vue 3.** The recommended way to learn Vue 3 is by reading the [new documentation](https://vuejs.org).

## Notable New Features

Some of the new features to keep an eye on in Vue 3 include:

- [Composition API](https://vuejs.org/guide/extras/composition-api-faq.html)
- [SFC Composition API Syntax Sugar (`<script setup>`)](https://vuejs.org/api/sfc-script-setup.html)
- [Teleport](https://vuejs.org/guide/built-ins/teleport.html)
- [Fragments](/new/fragments.html)
- [Emits Component Option](https://vuejs.org/api/options-state.html#emits)
- [`createRenderer` API from `@vue/runtime-core`](https://vuejs.org/api/custom-renderer.html) to create custom renderers
- [SFC State-driven CSS Variables (`v-bind` in `<style>`)](https://vuejs.org/api/sfc-css-features.html#v-bind-in-css)
- [SFC `<style scoped>` can now include global rules or rules that target only slotted content](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0023-scoped-styles-changes.md)
- [Suspense](https://vuejs.org/guide/built-ins/suspense.html) <sup class="warning">experimental</sup>

## Breaking Changes

Breaking changes between Vue 2 and Vue 3 are listed [here](/breaking-changes/).

## New Framework-level Recommendations

New framework-level recommendations are listed [here](/recommendations).

## Migration Build

If you have an existing Vue 2 project or library that you intend to upgrade to Vue 3, we provide a build of Vue 3 that offers Vue 2 compatible APIs. Check out the [Migration Build](./migration-build.html) page for more details.
