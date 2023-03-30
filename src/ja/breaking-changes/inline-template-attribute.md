---
badges:
  - breaking
---

# インラインテンプレート属性 <MigrationBadges :badges="$frontmatter.badges" />

## 概要

[インラインテンプレート機能](https://v2.ja.vuejs.org/v2/guide/components-edge-cases#%E3%82%A4%E3%83%B3%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%86%E3%83%B3%E3%83%97%E3%83%AC%E3%83%BC%E3%83%88)のサポートは削除されました。

## 2.x の構文

2.x では、Vue は子コンポーネントに `inline-template` 属性を提供し、その内容を（配布するコンテンツとして扱うのではなく）テンプレートとして使用できました。

```html
<my-component inline-template>
  <div>
    <p>These are compiled as the component's own template.</p>
    <p>Not parent's transclusion content.</p>
  </div>
</my-component>
```

## 3.x の構文

この機能は今後サポートされません。

## 移行手順

`inline-template` のユースケースのほとんどは、すべてのテンプレートが HTML ページの中に直接書かれる、ビルドツールのないセットアップを想定しています。

[移行ビルドのフラグ: `COMPILER_INLINE_TEMPLATE`](../migration-build.html#compat-configuration)

### 選択肢 #1: `<script>` タグを使用する

このような場合の最も簡単な回避策は、代替の type 属性で `<script>` を使うことです:

```html
<script type="text/html" id="my-comp-template">
  <div>{{ hello }}</div>
</script>
```

そしてコンポーネントでは、セレクターを使ってテンプレートをターゲットにします:

```js
const MyComp = {
  template: '#my-comp-template'
  // ...
}
```

これは、ビルドのセットアップを必要とせず、すべてのブラウザーで動作し、DOM 内の HTML パースの注意点（例えば、camelCase のプロパティ名を使用できる）に左右されず、ほとんどの IDE で適切なシンタックスハイライトを提供します。従来のサーバーサイドフレームワークでは、これらのテンプレートは保守性を高めるために、サーバーテンプレートのパーシャル（メインの HTML テンプレートに含まれる）に分割できます。

### 選択肢 #2: デフォルトスロット

これまで `inline-template` を使用していたコンポーネントも、デフォルトのスロットを使用してリファクタリングできます。これにより、子コンテンツをインラインで記述する利便性を維持しつつ、データのスコープがより明確になります:

```html
<!-- 2.x の構文 -->
<my-comp inline-template :msg="parentMsg">
  {{ msg }} {{ childState }}
</my-comp>

<!-- デフォルトスロットバージョン -->
<my-comp v-slot="{ childState }">
  {{ parentMsg }} {{ childState }}
</my-comp>
```

子コンポーネントは、テンプレートを提供しない代わりに、デフォルトスロット\*をレンダリングする必要があります:

```html
<!--
  子のテンプレートでは、必要な子コンポーネントのプライベート状態を渡しつつ、
  デフォルトスロットをレンダリングします
-->
<template>
  <slot :childState="childState" />
</template>
```

> - 注意: 3.x では、ネイティブの [fragments](../new/fragments) サポートにより、スロットをルートとしてレンダリングすることができます！
