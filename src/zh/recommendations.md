# 新的框架级别推荐

Vue 3 的支持库进行了重大更新。以下是新的默认建议的摘要:

- 新版本的 Router, Devtools & test utils 来支持 Vue 3
- 构建工具: Vue CLI -> [Vite](https://vitejs.dev/)
- 状态管理: Vuex -> [Pinia](https://pinia.vuejs.org/)
- IDE 插件支持: Vetur -> [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)
- 新的 TypeScript 命令行工具: [vue-tsc](https://github.com/johnsoncodehk/volar/tree/master/packages/vue-tsc)
- 静态网站生成: VuePress -> [VitePress](https://vitepress.vuejs.org/)
- JSX: `@vue/babel-preset-jsx` -> [`@vue/babel-plugin-jsx`](https://github.com/vuejs/jsx-next)

<!-- TODO -->

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

或者您也可以参阅[新文档中的工具章节](https://cn.vuejs.org/guide/scaling-up/tooling.html)

### Vue Router

Vue Router 4.0 提供了对 Vue 3 的支持，并且有许多自己的重大更新。查看其[迁移指南](https://router.vuejs.org/zh/guide/migration/index.html)以获取完整的详细信息

- [文档](https://router.vuejs.org/zh/index.html)
- [GitHub](https://github.com/vuejs/router)
- [RFCs](https://github.com/vuejs/rfcs/pulls?q=is%3Apr+is%3Amerged+label%3Arouter)

