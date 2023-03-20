---
badges:
  - new
---

# フラグメント <MigrationBadges :badges="$frontmatter.badges" />

## 概要 {#overview}

Vue 3 では、マルチルートノードのコンポーネント、つまりフラグメントを公式にサポートするようになりました！

## 2.x の構文

2.x では、マルチルートコンポーネントはサポートされておらず、ユーザーが誤って作成すると警告が表示されました。その結果、このエラーを解決するために、多くのコンポーネントが 1 つの `<div>` でラップされていました。

```html
<!-- Layout.vue -->
<template>
  <div>
    <header>...</header>
    <main>...</main>
    <footer>...</footer>
  </div>
</template>
```

## 3.x の構文

3.x では、コンポーネントは複数のルートノードを持つことができるようになりました！　ただしこの場合、開発者は属性を配布する場所を明示的に定義する必要があります。

```html
<!-- Layout.vue -->
<template>
  <header>...</header>
  <main v-bind="$attrs">...</main>
  <footer>...</footer>
</template>
```

属性継承の仕組みについては、[フォールスルー属性](https://ja.vuejs.org/guide/components/attrs.html#fallthrough-attributes)を参照してください。
