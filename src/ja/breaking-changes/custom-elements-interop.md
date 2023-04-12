---
badges:
  - breaking
---

# カスタム要素の相互運用性 <MigrationBadges :badges="$frontmatter.badges" />

## 概要

- **破壊的変更:** タグをカスタム要素として扱うかどうかのチェックは、テンプレートのコンパイル時に行われるようになり、ランタイム設定ではなく、コンパイラーオプションで設定する必要があります。
- **破壊的変更:** 特別な `is` 属性の使用は、予約済みである `<component>` タグにのみ制限されます。
- **新機能:** ネイティブの HTML パースの制限を回避する目的で、ネイティブ要素に `is` を使用するという 2.x のユースケースをサポートするため、値の前に `vue:` を付けて Vue コンポーネントとして解決するようにします。

## 自主的なカスタム要素

Vue の外部で定義されたカスタム要素を追加したい場合（例えば Web コンポーネント API を使用するなど）、Vue にカスタム要素として扱うように「指示」する必要があります。次のテンプレートを例にして説明します。

```html
<plastic-button></plastic-button>
```

### 2.x の構文

Vue 2.x では、タグをカスタム要素として設定するには、`Vue.config.ignoredElements` を使用していました:

```js
// これにより、Vue は Vue の外部で定義されたカスタム要素を無視するようになります
// （例: Web コンポーネント APIを使用する場合など）

Vue.config.ignoredElements = ['plastic-button']
```

### 3.x の構文

**Vue 3.0 では、このチェックはテンプレートのコンパイル時に行われます。** `<plastic-button>` をカスタム要素として扱うようにコンパイラーに指示するには:

- ビルドステップを使用する場合: Vue テンプレートコンパイラーに `isCustomElement` オプションを渡します。`vue-loader` を使用する場合は、`vue-loader` の `compilerOptions` オプションで渡す必要があります:

  ```js
  // webpack 設定
  rules: [
    {
      test: /\.vue$/,
      use: 'vue-loader',
      options: {
        compilerOptions: {
          isCustomElement: tag => tag === 'plastic-button'
        }
      }
    }
    // ...
  ]
  ```

- オンザフライのテンプレートコンパイルを使用する場合は、`app.config.compilerOptions.isCustomElement` で渡します:

  ```js
  const app = Vue.createApp({})
  app.config.compilerOptions.isCustomElement = tag => tag === 'plastic-button'
  ```

  ランタイム設定は、ランタイムテンプレートのコンパイルにのみ影響することに注意してください。事前にコンパイルされたテンプレートには影響しません。

## カスタマイズされたビルトイン要素 {#customized-built-in-elements}

カスタム要素の仕様では、組み込み要素に `is` 属性を付加することで、カスタム要素を[カスタマイズされたビルトイン要素](https://html.spec.whatwg.org/multipage/custom-elements.html#custom-elements-customized-builtin-example)として使用する方法を提供しています:

```html
<button is="plastic-button">Click Me!</button>
```

Vue の特別な属性 `is` の使い方は、ネイティブ属性がブラウザーで普遍的に利用できるようになる前のネイティブ属性の動作をシミュレートしていました。しかし、2.x では、`plastic-button` という名前の Vue コンポーネントをレンダリングすると解釈されました。これは、前述のカスタマイズされたビルトイン要素のネイティブな使い方をブロックしています。

3.0 では、Vue の `is` 属性の特別な扱いを、`<component>` タグのみに限定しています。

- 予約済みである `<component>` タグで使用された場合、2.x と全く同じ動作をします。
- 通常のコンポーネントで使用する場合は、通常の属性と同じように動作します:

  ```html
  <foo is="bar" />
  ```

  - 2.x の動作: `bar` コンポーネントをレンダリングします。
  - 3.x の動作: `foo` コンポーネントをレンダリングし、`is` 属性を渡します。

- プレーンな要素で使用する場合、`createElement` の呼び出しに `is` 属性として渡され、ネイティブ属性としてレンダリングされます。これは、カスタマイズされたビルトイン要素の使用をサポートします。

  ```html
  <button is="plastic-button">Click Me!</button>
  ```

  - 2.x の動作: `plastic-button` コンポーネントをレンダリングします
  - 3.x の動作: 以下を呼び出してネイティブのボタンをレンダリングします。

    ```js
    document.createElement('button', { is: 'plastic-button' })
    ```

[移行ビルドのフラグ: `COMPILER_IS_ON_ELEMENT`](../migration-build.html#compat-configuration)

## DOM 内テンプレートのパース回避のための `vue:` プレフィックス

> 注意: このセクションは、Vue のテンプレートがページの HTML に直接記述されている場合にのみ影響します。
> DOM 内テンプレートを使用する場合、テンプレートはネイティブの HTML パースルールに従います。`<ul>`、`<ol>`、`<table>`、`<select>` などの一部の HTML 要素は、その内部に表示できる要素に制限がありますし、`<li>`、`<tr>`、`<option>` などの一部の要素は、他の特定の要素内にのみ表示できます。

### 2.x の構文

Vue 2 では、ネイティブのタグに `is` 属性を使用することで、この制限を回避することを推奨していました:

```html
<table>
  <tr is="blog-post-row"></tr>
</table>
```

### 3.x の構文

`is` の動作変更に伴い、要素を Vue コンポーネントとして解決するには `vue:` プレフィックスが必要になりました:

```html
<table>
  <tr is="vue:blog-post-row"></tr>
</table>
```

## 移行手順

- `config.ignoredElements` は、ビルドステップの場合は `vue-loader` の `compilerOptions` に置き換え、オンザフライのテンプレートコンパイルの場合は `app.config.compilerOptions.isCustomElement` に置き換えます。

- `<component>` 以外で `is` が使われているタグは、SFC テンプレートの場合は `<component is="...">` に変更し、DOM 内テンプレートの場合は `vue:` プレフィックスを付けます。

## 参照

- [ガイド - Vue と Web コンポーネント](https://ja.vuejs.org/guide/extras/web-components.html)
