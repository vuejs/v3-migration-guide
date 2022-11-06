# New Framework-level Recommendations

The supporting libraries for Vue 3 have undergone major updates. Here is a summary of the new default recommendations:

- New versions of Router, Devtools & test utils w/ Vue 3 support
- Build Toolchain: Vue CLI -> [Vite](https://vitejs.dev/)
- State Management: Vuex -> [Pinia](https://pinia.vuejs.org/)
- IDE Support: Vetur -> [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)
- New command line TypeScript support: [vue-tsc](https://github.com/johnsoncodehk/volar/tree/master/vue-language-tools/vue-tsc)
- SSG: VuePress -> [VitePress](https://vitepress.vuejs.org/)
- JSX: `@vue/babel-preset-jsx` -> [`@vue/babel-plugin-jsx`](https://github.com/vuejs/jsx-next)

## Details

### Build Toolchain

We now recommend [Vite](https://vitejs.dev/) as the new build toolchain for Vue 3 projects. Vite is a new build tool that offers extremely fast server start and hot update performance. It was originally created by the Vue team but is now a cross-framework tool. Learn more about [why we are recommending Vite](https://vitejs.dev/guide/why.html).

You can create a new Vite-powered Vue 3 project via [`create-vue`](https://github.com/vuejs/create-vue), our new scaffolding tool:

```sh
npm init vue@3
```

While Vue CLI has also been upgraded to support Vue 3, it is now in maintenance and no longer recommended for new projects. For information on migrating from Vue CLI to Vite:

- [Vue CLI -> Vite Migration Guide from VueSchool.io](https://vueschool.io/articles/vuejs-tutorials/how-to-migrate-from-vue-cli-to-vite/)
- [Tools / Plugins that help with auto migration](https://github.com/vitejs/awesome-vite#vue-cli)

Also see [Tooling chapter in new docs](https://vuejs.org/guide/scaling-up/tooling.html).

### Vue Router

Vue Router 4.0 provides Vue 3 support and has a number of breaking changes of its own. Check out its [migration guide](https://router.vuejs.org/) for full details.

- [Documentation](https://router.vuejs.org/)
- [GitHub](https://github.com/vuejs/router)
- [RFCs](https://github.com/vuejs/rfcs/pulls?q=is%3Apr+is%3Amerged+label%3Arouter)

### State Management

[Pinia](https://pinia.vuejs.org/) is the new recommended large-scale state management solution. Pinia was created as a prototype for Vuex 5, and has now evolved into the de facto implementation for what we had planned for Vuex 5. We decided to keep its original name in respect of the amount of work that went into it by core team member [Eduardo](https://github.com/posva).

- [Documentation](https://pinia.vuejs.org/)
- [GitHub](https://github.com/vuejs/pinia)
- [State management chapter in new docs](https://vuejs.org/guide/scaling-up/state-management.html)

Vuex 4.0 also provides Vue 3 support with largely the same API as 3.x, and can be used if you have existing Vuex stores that need to be migrated to Vue 3. The only breaking change is [how the plugin is installed](https://vuex.vuejs.org/guide/migrating-to-4-0-from-3-x.html#breaking-changes).

### IDE Support

[Volar](https://github.com/johnsoncodehk/volar) is now the new official VSCode extension, with greatly improved TypeScript support for Vue SFCs, including full type inference for template expressions.

If you have previous installed Vetur, make sure to disable it to avoid conflict with Volar.

### Devtools Extension

The devtools extension has received major updates (released as v6) to support both Vue 2 and Vue 3. If you have previously installed v6 via the beta channel, you can remove it and install the extension from the stable channel now.

- [Documentation](https://devtools.vuejs.org/guide/installation.html)
- [GitHub](https://github.com/vuejs/devtools)

### TypeScript Support

You can now type-check and generate definition files for Vue SFCs from the command line using [vue-tsc](https://github.com/johnsoncodehk/volar/tree/master/vue-language-tools/vue-tsc).

Also see [TypeScript Guide in new docs](https://vuejs.org/guide/typescript/overview.html).

### Static Site Generator

[VitePress](https://vitepress.vuejs.org/) is the spiritual successor to VuePress, built on Vue 3 + Vite. It provides a far superior dev experience and also produces faster sites.

### JSX

JSX support for Vue 3 is now provided via [`@vue/babel-plugin-jsx`](https://github.com/vuejs/babel-plugin-jsx).
