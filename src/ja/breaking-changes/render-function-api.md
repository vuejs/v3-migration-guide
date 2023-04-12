---
badges:
  - breaking
---

# レンダー関数 API <MigrationBadges :badges="$frontmatter.badges" />

## 概要

この変更は、`<template>` を使用する場合には影響しません。

以下は、変更点の簡単なまとめです:

- `h` はレンダー関数に引数として渡されるのではなく、グローバルにインポートされるようになりました
- ステートフルコンポーネントと関数型コンポーネントの間でより一貫性を持たせるため、レンダー関数の引数が変更されました
- VNode のプロパティ構造はフラットになりました

詳細については続きをお読みください！

## レンダー関数の引数

### 2.x の構文

2.x では、`render` 関数は引数として `h` 関数（`createElement` の従来のエイリアス）を自動的に受け取ります:

```js
// Vue 2 のレンダー関数の例
export default {
  render(h) {
    return h('div')
  }
}
```

### 3.x の構文

3.x では、`h` は引数として自動的に渡されるのではなく、グローバルにインポートされるようになりました。

```js
// Vue 3 のレンダー関数の例
import { h } from 'vue'

export default {
  render() {
    return h('div')
  }
}
```

## VNode プロパティの形式

### 2.x の構文

2.x では、`domProps` は VNode プロパティの中にネストしたリストを持っていました:

```js
// 2.x
{
  staticClass: 'button',
  class: {'is-outlined': isOutlined },
  staticStyle: { color: '#34495E' },
  style: { backgroundColor: buttonColor },
  attrs: { id: 'submit' },
  domProps: { innerHTML: '' },
  on: { click: submitForm },
  key: 'submit-button'
}
```

### 3.x の構文

3.x では、VNode プロパティの構造全体がフラット化されています。上記の例を使用すると、次のようになります。

```js
// 3.x の構文
{
  class: ['button', { 'is-outlined': isOutlined }],
  style: [{ color: '#34495E' }, { backgroundColor: buttonColor }],
  id: 'submit',
  innerHTML: '',
  onClick: submitForm,
  key: 'submit-button'
}
```

## 登録済みのコンポーネント

### 2.x の構文

2.x では、コンポーネントが登録されている場合、第 1 引数に文字列でコンポーネント名を渡すと、レンダー関数は正しく動作します:

```js
// 2.x
Vue.component('button-counter', {
  data() {
    return {
      count: 0
    }
  }
  template: `
    <button @click="count++">
      Clicked {{ count }} times.
    </button>
  `
})

export default {
  render(h) {
    return h('button-counter')
  }
}
```

### 3.x の構文

3.x では VNode はコンテキストフリーになり、登録されたコンポーネントは文字列の ID を使用して暗黙的に検索できなくなりました。代わりに、`resolveComponent` メソッドをインポートして使用する必要があります:

```js
// 3.x
import { h, resolveComponent } from 'vue'

export default {
  setup() {
    const ButtonCounter = resolveComponent('button-counter')
    return () => h(ButtonCounter)
  }
}
```

詳しくは、[レンダー関数 API 変更の RFC](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0008-render-function-api-change.md#context-free-vnodes) を参照してください。

## 移行手順

[移行ビルドのフラグ: `RENDER_FUNCTION`](../migration-build.html#compat-configuration)

### ライブラリー作者

`h` がグローバルにインポートされるということは、Vue コンポーネントを含むライブラリーは、どこかで `import { h } from 'vue'` を含むことになります。その結果、ライブラリーの作者がビルドの設定で Vue の外部化を適切に設定する必要があるため、ちょっとしたオーバーヘッドが発生します:

- Vue はライブラリーにバンドルしないでください
- モジュールビルドの場合、インポートは残して、エンドユーザーのバンドラーが処理する必要があります
- UMD / ブラウザービルドの場合、まずグローバルな Vue.h を試し、require の呼び出しにフォールバックする必要があります

## 次のステップ

より詳細なドキュメントについては、[レンダー関数のガイド](https://ja.vuejs.org/guide/extras/render-function.html)を参照してください！
