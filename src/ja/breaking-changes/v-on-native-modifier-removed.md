---
title: v-on.native 修飾子の削除
badges:
  - breaking
---

# `v-on.native` 修飾子の削除 <MigrationBadges :badges="$frontmatter.badges" />

## 概要

`v-on` の `.native` 修飾子は削除されました。

## 2.x の構文

`v-on` でコンポーネントに渡されたイベントリスナーは、デフォルトでは `this.$emit` でイベントを発行したときにのみトリガーされます。代わりに子コンポーネントのルート要素にネイティブな DOM リスナーを追加するには、`.native` 修飾子を使用できます:

```html
<my-component
  v-on:close="handleComponentEvent"
  v-on:click.native="handleNativeClickEvent"
/>
```

## 3.x の構文

`v-on` の `.native` 修飾子は削除されました。同時に、[新しい `emits` オプション](./emits-option.md)によって、子が実際に発行するイベントを定義できるようになりました。

その結果、Vue は、子要素でコンポーネント発信イベントとして定義されて**いない**すべてのイベントリスナーを、子要素のルート要素のネイティブイベントリスナーとして追加するようになりました（子要素のオプションで `inheritAttrs: false` が設定されている場合を除く）。

```html
<my-component
  v-on:close="handleComponentEvent"
  v-on:click="handleNativeClickEvent"
/>
```

`MyComponent.vue`

```html
<script>
  export default {
    emits: ['close']
  }
</script>
```

## 移行手順

- `.native` 修飾子の使用箇所をすべて削除します。
- すべてのコンポーネントで `emits` オプションを使用して、イベントをドキュメント化するようにします。

[移行ビルドのフラグ: `COMPILER_V_ON_NATIVE`](../migration-build.html#compat-configuration)

## 参照

- [関連 RFC](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0031-attr-fallthrough.md#v-on-listener-fallthrough)
- [移行ガイド - 新しい `emits` オプション](./emits-option.md)
- [移行ガイド - `$listeners` の削除](./listeners-removed.md)
- [移行ガイド - レンダー関数 API の変更点](./render-function-api.md)
