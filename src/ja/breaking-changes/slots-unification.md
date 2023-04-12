---
badges:
  - breaking
---

# スロットの統一 <MigrationBadges :badges="$frontmatter.badges" />

## 概要

3.x では、通常のスロットとスコープ付きスロットが統合されます。

以下は、変更点の簡単なまとめです:

- `this.$slots` はスロットを関数として公開するようになりました
- **破壊的変更**: `this.$scopedSlots` は削除されました

詳細については続きをお読みください！

## 2.x の構文

2.x では、`h` のようなレンダー関数を使用する場合、コンテンツノードに `slot` データプロパティを定義していました。

```js
// 2.x の構文
h(LayoutComponent, [
  h('div', { slot: 'header' }, this.header),
  h('div', { slot: 'content' }, this.content)
])
```

また、スコープ付きスロットを参照する場合、次のような構文で参照できました:

```js
// 2.x の構文
this.$scopedSlots.header
```

## 3.x の構文

3.x では、スロットは現在のノードの子としてオブジェクトで定義されます:

```js
// 3.x の構文
h(LayoutComponent, {}, {
  header: () => h('div', this.header),
  content: () => h('div', this.content)
})
```

また、スコープ付きスロットをプログラムで参照する必要がある場合、`$slots` オプションに統合されました。

```js
// 2.x の構文
this.$scopedSlots.header

// 3.x の構文
this.$slots.header()
```

## 移行手順

変更の大部分は、すでに 2.6 で出荷されています。その結果、移行は 1 つのステップで行うことができます:

1. 3.x では、すべての `this.$scopedSlots` を `this.$slots` に置き換えます
2. すべての `this.$slots.mySlot` を `this.$slots.mySlot()` に置き換えます

[移行ビルドのフラグ: `INSTANCE_SCOPED_SLOTS`](../migration-build.html#compat-configuration)
