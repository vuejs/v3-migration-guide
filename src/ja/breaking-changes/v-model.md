---
badges:
  - breaking
---

# `v-model` <MigrationBadges :badges="$frontmatter.badges" />

## 概要

変更点の概要は次のとおりです:

- **破壊的変更:** カスタムコンポーネントで使用する場合、`v-model` のプロパティとイベントのデフォルト名が変更されました:
  - プロパティ: `value` -> `modelValue`;
  - イベント: `input` -> `update:modelValue`;
- **破壊的変更:** `v-bind` の `.sync` 修飾子とコンポーネントの `model` オプションは削除され、`v-model` の引数に置き換わりました。
- **新機能:** 同じコンポーネントに複数の `v-model` をバインドできるようになりました。
- **新機能:** カスタム `v-model` 修飾子を作成する機能が追加されました。

詳細については続きをお読みください！

## はじめに

Vue 2.0 がリリースされたとき、`v-model` ディレクティブは常に `value` プロパティを使用する必要がありました。そして、別の用途のために別のプロパティが必要な場合は `v-bind.sync` を使用しなければなりませんでした。さらに、この `v-model` と `value` のハードコードされた関係は、ネイティブ要素とカスタム要素の扱い方の問題につながりました。

2.2 では、コンポーネントが `v-model` に使用するプロパティとイベントをカスタマイズできる、`model` コンポーネントオプションを導入しました。しかしそれでもコンポーネント上で使用できる `v-model` は 1 つだけでした。

Vue 3 では混乱を減らし、開発者がより柔軟に `v-model` ディレクティブを使えるように、双方向データバインディングの API が標準化されました。

## 2.x の構文

2.x では、コンポーネントで `v-model` を使用するのは、`value` プロパティを渡して `input` イベントを発行するのと同じでした:

```html
<ChildComponent v-model="pageTitle" />

<!-- これは以下のショートハンド: -->

<ChildComponent :value="pageTitle" @input="pageTitle = $event" />
```

もし、プロパティやイベントの名前を別のものに変更したい場合は、`ChildComponent` コンポーネントに `model` オプションを追加する必要があります:

```html
<!-- ParentComponent.vue -->

<ChildComponent v-model="pageTitle" />
```

```js
// ChildComponent.vue

export default {
  model: {
    prop: 'title',
    event: 'change'
  },
  props: {
    // これにより `value` プロパティを別の目的で使用できます
    value: String,
    // `value` の代わりのプロパティとして `title` を使用
    title: {
      type: String,
      default: 'Default title'
    }
  }
}
```

つまり、この場合の `v-model` は、次のショートハンドになります:

```html
<ChildComponent :title="pageTitle" @change="pageTitle = $event" />
```

### `v-bind.sync` の使用

場合によっては、（別のプロパティ用の既存の `v-model` に加え）プロパティの「双方向バインディング」が必要になることがあります。そのためには、`update:myPropName` のパターンでイベントを発行するのがお勧めです。例えば、前の例にあった `title` プロパティを持つ `ChildComponent` の場合、新しい値を割り当てる意図を伝えるには以下のようになります:

```js
this.$emit('update:title', newValue)
```

その後、親はそのイベントを購読して、ローカルデータのプロパティを更新できます。例えば:

```html
<ChildComponent :title="pageTitle" @update:title="pageTitle = $event" />
```

簡便のため、このパターンのショートハンドとして `.sync` という修飾子があります:

```html
<ChildComponent :title.sync="pageTitle" />
```

## 3.x の構文

3.x では、カスタムコンポーネントの `v-model` は、`modelValue` プロパティを渡して `update:modelValue` イベントを発行するのと同じです:

```html
<ChildComponent v-model="pageTitle" />

<!-- これは以下のショートハンド: -->

<ChildComponent
  :modelValue="pageTitle"
  @update:modelValue="pageTitle = $event"
/>
```

### `v-model` の引数

モデル名を変更するには、`model` コンポーネントのオプションの代わりに、`v-model` に**引数**を渡せるようになりました:

```html
<ChildComponent v-model:title="pageTitle" />

<!-- これは以下のショートハンド: -->

<ChildComponent :title="pageTitle" @update:title="pageTitle = $event" />
```

![v-bind の解剖図](/images/v-bind-instead-of-sync.png)

これは、`.sync` 修飾子の代わりにもなり、カスタムコンポーネントに複数の `v-model` を持たせることができるようになります。

```html
<ChildComponent v-model:title="pageTitle" v-model:content="pageContent" />

<!-- これは以下のショートハンド: -->

<ChildComponent
  :title="pageTitle"
  @update:title="pageTitle = $event"
  :content="pageContent"
  @update:content="pageContent = $event"
/>
```

### `v-model` の修飾子

`.trim` など、2.x のハードコードされた `v-model` 修飾子に加え、3.x ではカスタム修飾子がサポートされました:

```html
<ChildComponent v-model.capitalize="pageTitle" />
```

詳細は、[コンポーネントのカスタム `v-model` 修飾子](https://ja.vuejs.org/guide/components/v-model.html#handling-v-model-modifiers)をお読みください。

## 移行手順

推奨:

- コードベースの `.sync` の使用を確認し、`v-model` に置き換えます:

  ```html
  <ChildComponent :title.sync="pageTitle" />

  <!-- 以下に置き換える -->

  <ChildComponent v-model:title="pageTitle" />
  ```

- 引数のないすべての `v-model` に対して、プロパティとイベント名をそれぞれ `modelValue` と `update:modelValue` に変更する

  ```html
  <ChildComponent v-model="pageTitle" />
  ```

  ```js
  // ChildComponent.vue

  export default {
    props: {
      modelValue: String // 以前は `value: String`
    },
    emits: ['update:modelValue'],
    methods: {
      changePageTitle(title) {
        this.$emit('update:modelValue', title) // 以前は `this.$emit('input', title)`
      }
    }
  }
  ```

[移行ビルドのフラグ:](../migration-build.html#compat-configuration)

- `COMPONENT_V_MODEL`
- `COMPILER_V_BIND_SYNC`

## 次のステップ

新しい `v-model` 構文の詳細については、以下を参照してください:

- [コンポーネントでの `v-model` の使用](https://ja.vuejs.org/guide/components/v-model.html)
- [`v-model` の引数](https://ja.vuejs.org/guide/components/v-model.html#v-model-arguments)
- [`v-model` 修飾子の処理](https://ja.vuejs.org/guide/components/v-model.html#handling-v-model-modifiers)
