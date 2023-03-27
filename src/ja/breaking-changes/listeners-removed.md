---
title: $listeners の削除
badges:
  - breaking
---

# `$listeners` の削除 <MigrationBadges :badges="$frontmatter.badges" />

## 概要

Vue 3 では、`$listeners` オブジェクトは削除されました。イベントリスナーは `$attrs` の一部になりました:

```js
{
  text: 'this is an attribute',
  onClose: () => console.log('close Event triggered')
}
```

## 2.x の構文

Vue 2 では、コンポーネントに渡される属性には `this.$attrs` でアクセスし、イベントリスナーには `this.$listeners` でアクセスできます。
`inheritAttrs: false` と組み合わせることで、これらの属性やリスナーをルート要素ではなく他の要素に適用できます:

```html
<template>
  <label>
    <input type="text" v-bind="$attrs" v-on="$listeners" />
  </label>
</template>
<script>
  export default {
    inheritAttrs: false
  }
</script>
```

## 3.x の構文

Vue 3 の仮想 DOM では、イベントリスナーは単なる属性となり、接頭辞に `on` が付き、`$attrs` オブジェクトの一部となるため、`$listeners` は削除されました。

```vue
<template>
  <label>
    <input type="text" v-bind="$attrs" />
  </label>
</template>
<script>
export default {
  inheritAttrs: false
}
</script>
```

このコンポーネントが `id` 属性と `v-on:close` リスナーを受け取った場合、 `$attrs` オブジェクトは次のようになります:

```js
{
  id: 'my-input',
  onClose: () => console.log('close Event triggered')
}
```

## 移行手順

`$listeners` の使用箇所をすべて削除します。

[移行ビルドのフラグ: `INSTANCE_LISTENERS`](../migration-build.html#compat-configuration)

## 参照

- [関連 RFC](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0031-attr-fallthrough.md)
- [移行ガイド - `$attrs` が `class` と `style` を包含](./attrs-includes-class-style.md)
- [移行ガイド - レンダー関数 API の変更点](./render-function-api.md)
- [移行ガイド - 新しい `emits` オプション](./emits-option.md)
- [移行ガイド - `.native` 修飾子の削除](./v-on-native-modifier-removed.md)
