---
badges:
  - breaking
---

# 関数型コンポーネント <MigrationBadges :badges="$frontmatter.badges" />

## 概要

変更点の概要は次のとおりです:

- 関数型コンポーネントは 2.x からパフォーマンス向上し、3.x では無視できる程度になってので、ステートフルコンポーネントのみ使用することを推奨します
- 関数型コンポーネントは、`props` と `context`（つまり `slot`, `attrs`, `emit`）を受け取るプレーンな関数だけで作成できます
- **破壊的変更:** 単一ファイルコンポーネント（SFC）における `<template>` の `functional` 属性は削除されました
- **破壊的変更:** 関数によって作成されたコンポーネントの `{ Functional: true }` オプションは削除されました

詳細については続きをお読みください！

## はじめに

Vue 2 では、関数型コンポーネントには 2 つの主なユースケースがありました:

- ステートフルコンポーネントよりもはるかに高速に初期化されるので、パフォーマンスの最適化として
- 複数のルートノードを返すため

しかし Vue 3 では、ステートフルコンポーネントのパフォーマンスは、その差が無視できるほどに向上しています。さらに、ステートフルなコンポーネントには、複数のルートノードを返す機能も追加されました。

その結果、関数型コンポーネントに残った唯一のユースケースは、動的な見出しを作成するコンポーネントのような単純なコンポーネントだけです。それ以外の場合は、通常通りステートフルコンポーネントを使用することをおすすめします。

## 2.x の構文

適切な見出し（`h1`, `h2`, `h3` など）をレンダリングする `<dynamic-heading>` コンポーネントを例にすると、2.x では単一ファイルコンポーネントとして以下のように記述できました:

```js
// Vue 2 の関数型コンポーネントの例
export default {
  functional: true,
  props: ['level'],
  render(h, { props, data, children }) {
    return h(`h${props.level}`, data, children)
  }
}
```

あるいは、単一ファイルコンポーネントの `<template>` を好む場合は:

```vue
<!-- Vue 2 で <template> を使った関数型コンポーネントの例 -->
<template functional>
  <component
    :is="`h${props.level}`"
    v-bind="attrs"
    v-on="listeners"
  />
</template>

<script>
export default {
  props: ['level']
}
</script>
```

## 3.x の構文

### 関数で作られるコンポーネント

Vue 3 では、すべての関数型コンポーネントはプレーンな関数で作成されるようになりました。つまり、`{ functional: true }` というコンポーネントオプションを定義する必要はありません。

これらは 2 つの引数（`props` と `context`）を受け取ります。`context` 引数は、コンポーネントの `attrs`, `slots`, `emit` プロパティを含むオブジェクトです。

また、`render` 関数内で暗黙的に `h` を提供するのではなく、`h` はグローバルにインポートされるようになりました。

前述の `<dynamic-heading>` コンポーネントの例を使用すると、以下のようになります。

```js
import { h } from 'vue'

const DynamicHeading = (props, context) => {
  return h(`h${props.level}`, context.attrs, context.slots)
}

DynamicHeading.props = ['level']

export default DynamicHeading
```

### 単一ファイルコンポーネント (SFC) {#single-file-components-sfcs}

3.x では、ステートフルコンポーネントと関数型コンポーネントの性能差は大幅に減少し、ほとんどのユースケースで重要ではなくなります。その結果、SFC で `functional` を使用している開発者は、この属性を削除し、`props` の参照をすべて `$props` に、`attrs`を `$attrs` にリネームすることが移行手順となります。

先ほどの `<dynamic-heading>` の例を使うと、次のようになります。

```vue{1,3,4}
<template>
  <component
    v-bind:is="`h${$props.level}`"
    v-bind="$attrs"
  />
</template>

<script>
export default {
  props: ['level']
}
</script>
```

主な違いは以下の通りです:

1. `<template>` の `functional` 属性を削除
1. `listeners` は `$attrs` の一部として渡されるようになったので、削除できます

## 次のステップ

新しい関数型コンポーネントの使用方法やレンダー関数全般の変更点に関する詳細は、こちらをご覧ください:

- [移行ガイド: レンダー関数](./render-function-api.html)
- [ガイド: レンダー関数](https://ja.vuejs.org/guide/extras/render-function.html#render-functions-jsx)
- [移行ビルドのフラグ: `COMPONENT_FUNCTIONAL`](../migration-build.html#compat-configuration)
