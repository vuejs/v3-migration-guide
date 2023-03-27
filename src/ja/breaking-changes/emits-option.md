---
title: emits オプション
badges:
  - new
---

# `emits` オプション <MigrationBadges :badges="$frontmatter.badges" />

## 概要

Vue 3 では、既存の `props` オプションと同様に、`emits` オプションを提供するようになりました。このオプションを使用してコンポーネントが親に発行可能なイベントを定義できます。

## 2.x の動作

Vue 2 ではコンポーネントが受け取るプロパティを定義できますが、そのコンポーネントが発行可能なイベントは宣言できません:

```vue
<template>
  <div>
    <p>{{ text }}</p>
    <button v-on:click="$emit('accepted')">OK</button>
  </div>
</template>
<script>
  export default {
    props: ['text']
  }
</script>
```

## 3.x の動作

プロパティと同様に、コンポーネントが発行するイベントを `emits` オプションで定義できるようになりました:

```vue
<template>
  <div>
    <p>{{ text }}</p>
    <button v-on:click="$emit('accepted')">OK</button>
  </div>
</template>
<script>
  export default {
    props: ['text'],
    emits: ['accepted']
  }
</script>
```

このオプションにはオブジェクトも指定できます。開発者は、`props` 定義のバリデーターと同じように、発行されるイベントに渡される引数のバリデーターを定義できます。

詳細については、[この機能の API ドキュメント](https://ja.vuejs.org/api/options-state.html#emits)をお読みください。

## 移行手順

`emits` を使って、各コンポーネントが発行するすべてのイベントをドキュメント化することを強くお勧めします。

特に、[`.native` 修飾子が削除される](./v-on-native-modifier-removed.md)ため重要です。`emits` で宣言されていないイベントリスナーは、コンポーネントの `$attrs` に含まれるようになり、デフォルトではコンポーネントのルートノードにバインドされます。

### 例

ネイティブイベントを親に再発行するコンポーネントの場合、2 つのイベントが発生することになります:

```vue
<template>
  <button v-on:click="$emit('click', $event)">OK</button>
</template>
<script>
export default {
  emits: [] // イベント宣言なし
}
</script>
```

親がコンポーネントの `click` イベントを購読する場合:

```html
<my-button v-on:click="handleClick"></my-button>
```

これは**2 回**トリガーされます:

- `$emit()` から 1 回。
- ルート要素に適用されるネイティブイベントリスナーから 1 回。

ここで、2 つの選択肢があります:

1. `click` イベントを適切に宣言する。これは実際に `<my-button>` のイベントハンドラーに何らかのロジックを追加する場合に便利です。
2. イベントの再発行を削除する。`.native` を追加しなくても、親は簡単にネイティブイベントを購読できるようになりました。とにかくイベントを再発行するだけの場合に適しています。

## 参照

- [関連 RFC](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0030-emits-option.md)
- [移行ガイド - `.native` 修飾子の削除](./v-on-native-modifier-removed.md)
- [移行ガイド - `$listeners` の削除](./listeners-removed.md)
- [移行ガイド - `$attrs` が `class` と `style` を包含](./attrs-includes-class-style.md)
- [移行ガイド - レンダー関数 API の変更点](./render-function-api.md)
