# 新的框架级别推荐

Vue 3 的支持库进行了重大更新。以下是新的默认建议的摘要:

- 新版本的 Router, Devtools & test utils 来支持 Vue 3
- 构建工具: Vue CLI -> [Vite](https://vitejs.dev/)
- 状态管理: Vuex -> [Pinia](https://pinia.vuejs.org/)
- IDE 插件支持: Vetur -> [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)
- 新的 TypeScript 命令行工具: [vue-tsc](https://github.com/johnsoncodehk/volar/tree/master/vue-language-tools/vue-tsc)
- 静态网站生成: VuePress -> [VitePress](https://vitepress.vuejs.org/)
- JSX: `@vue/babel-preset-jsx` -> [`@vue/babel-plugin-jsx`](https://github.com/vuejs/jsx-next)

## 详情说明

### 构建工具链

我们现在推荐 Vite 作为 Vue 3 项目的新构建工具链。 Vite 是一个新的构建工具，提供极快的服务器启动和热更新性能。它最初由 Vue 团队创建，但现在是一个跨框架工具。详细了解我们[为何推荐 Vite](https://cn.vitejs.dev/guide/why.html)。

您可以通过我们新的脚手架工具 [create-vue](https://github.com/vuejs/create-vue) 创建一个由 vite 驱动的 Vue 3 项目:

```bash
npm init vue@3
```

虽然 Vue CLI 也已升级以支持 Vue 3，但它现在处于维护状态，不再推荐用于新项目。有关从 Vue CLI 迁移到 Vite 的信息:

- [Vue CLI -> Vite Migration Guide from VueSchool.io](https://vueschool.io/articles/vuejs-tutorials/how-to-migrate-from-vue-cli-to-vite/)
- [Tools / Plugins that help with auto migration](https://github.com/vitejs/awesome-vite#vue-cli)

或者您也可以参阅 [Vue 新文档中工具章节](https://cn.vuejs.org/guide/scaling-up/tooling.html)

### Vue Router

Vue Router 4.0 提供了对 Vue 3 的支持，并且有许多自己的重大更新。查看其[迁移指南](https://router.vuejs.org/zh/guide/migration/index.html)以获取完整的详细信息

- [文档](https://router.vuejs.org/zh/index.html)
- [GitHub](https://github.com/vuejs/router)
- [RFCs](https://github.com/vuejs/rfcs/pulls?q=is%3Apr+is%3Amerged+label%3Arouter)

### 状态管理工具

Pinia 是我们新推荐的大规模状态管理解决方案。 本来是作为 Vuex 5 的原型创建的，现在已经演变为我们为 Vuex 5 计划的实际实现。考虑到核心团队成员Eduardo投入的工作量，我们决定保留其原始名称

- [文档](https://pinia.vuejs.org/zh/index.html)
- [GitHub](https://github.com/vuejs/pinia)
- [Vue 新文档中状态管理章节](https://cn.vuejs.org/guide/scaling-up/state-management.html)

Vuex 4.0 还提供对于 Vue 3 的支持，其 API 与 3.x 大致相同，如果您有需要迁移到 Vue 3 的现有 Vuex tores，可以使用它。唯一的重大变化是 [插件的安装方式](https://vuex.vuejs.org/zh/guide/migrating-to-4-0-from-3-x.html#%E5%AE%89%E8%A3%85%E8%BF%87%E7%A8%8B)



### IDE 支持

[Volar](https://github.com/johnsoncodehk/volar) 现在是新的官方 VSCode 扩展，大大改进了对 Vue SFC 的 TypeScript 支持，包括模板表达式的完整类型推断。
如果您以前安装过 Vetur，请确保将其禁用以避免与 Volar 冲突。



### Devtools Extension

devtools 扩展已收到重大更新（作为 v6 发布）以同时支持 Vue 2 和 Vue 3。如果您之前安装过 beta 版本的v6，您现在可以将其删除并安装稳定版本的扩展。

- [文档](https://devtools.vuejs.org/guide/installation.html)
- [GitHub](https://github.com/vuejs/devtools)



### TypeScript 支持

您现在可以使用 [vue-tsc](https://github.com/johnsoncodehk/volar/tree/master/vue-language-tools/vue-tsc) 从命令行对 Vue SFC 进行类型检查和生成定义文件。
或者您也可以参阅 [新文档中的 TypeScript 指南](https://cn.vuejs.org/guide/typescript/overview.html)。



### 静态站点生成器

[VitePress](https://vitepress.vuejs.org/) 是 VuePress 的精神继承者，建立在 Vue 3 + Vite 之上。它提供了卓越的开发体验，还可以生成更快的站点。



### JSX

现在通过  [`@vue/babel-plugin-jsx`](https://github.com/vuejs/babel-plugin-jsx)  提供对于Vue3 中 JSX 的支持