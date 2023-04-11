---
title: 'マウント API の変更'
badges:
  - breaking
---

# マウントされたアプリケーションは要素を置き換えません <MigrationBadges :badges="$frontmatter.badges" />

## 概要

Vue 2.x では、`template` を持つアプリケーションをマウントすると、レンダリングされたコンテンツはマウント先の要素を置き換えます。Vue 3.x では、レンダリングされたアプリケーションは、そのような要素の子として追加され、要素の `innerHTML` を置き換えます。

## 2.x の構文

Vue 2.x では、`new Vue()` や `$mount` に HTML 要素のセレクタを渡します:

```js
new Vue({
  el: '#app',
  data() {
    return {
      message: 'Hello Vue!'
    }
  },
  template: `
    <div id="rendered">{{ message }}</div>
  `
})

// もしくは
const app = new Vue({
  data() {
    return {
      message: 'Hello Vue!'
    }
  },
  template: `
    <div id="rendered">{{ message }}</div>
  `
})

app.$mount('#app')
```

このアプリケーションを、渡されたセレクタ（ここでは `id="app"`）を持つ `div` があるページにマウントすると:

```html
<body>
  <div id="app">
    Some app content
  </div>
</body>
```

レンダリング結果では、言及された `div` はレンダリングされたアプリケーションのコンテンツに置き換えられます:

```html
<body>
  <div id="rendered">Hello Vue!</div>
</body>
```

## 3.x の構文

Vue 3.x では、アプリケーションをマウントすると、そのレンダリング内容が、`mount` に渡した要素の `innerHTML` を置き換えます:

```js
const app = Vue.createApp({
  data() {
    return {
      message: 'Hello Vue!'
    }
  },
  template: `
    <div id="rendered">{{ message }}</div>
  `
})

app.mount('#app')
```

`id="app"` を持つ `div` があるページにこのアプリをマウントすると、このようになります:

```html
<body>
  <div id="app" data-v-app="">
    <div id="rendered">Hello Vue!</div>
  </div>
</body>
```

## 移行手順

[移行ビルドのフラグ: `GLOBAL_MOUNT_CONTAINER`](../migration-build.html#compat-configuration)

## 参照

- [`mount` API](https://ja.vuejs.org/api/application.html#app-mount)
