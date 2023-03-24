---
badges:
  - breaking
---

# `key` 属性 <MigrationBadges :badges="$frontmatter.badges" />

## 概要

- **新機能:** `v-if`/`v-else`/`v-else-if` の分岐では、Vue が自動的にユニークな `key` を生成するようになったため、`key` は不要になりました。
  - **破壊的変更:** 手動で `key` を指定する場合、各ブランチはユニークな `key` を使用する必要があります。ブランチの再利用を強制するために、意図的に同じ `key` を使用できなくなりました。
- **破壊的変更:** `<template v-for>` の `key` は（子要素ではなく）`<template>` タグに配置する必要があります。

## 背景

特別な属性 `key` は、Vue の仮想 DOM アルゴリズムがノードの ID を追跡するためのヒントとして使用されます。これにより、Vue は既存のノードを再利用したりパッチを当てたりできるタイミングや、ノードの並び替えや再作成が必要なタイミングを知ることができます。詳細については、下記のセクションを参照してください。

- [リストレンダリング: 状態管理](https://ja.vuejs.org/guide/essentials/list.html#maintaining-state-with-key)
- [API リファレンス: 特別な属性 `key`](https://ja.vuejs.org/api/built-in-special-attributes.html#key)

## 条件分岐 {#on-conditional-branches}

Vue 2.x では、`v-if`/`v-else`/`v-else-if` の分岐に `key` を使用することが推奨されていました。

```html
<!-- Vue 2.x -->
<div v-if="condition" key="yes">Yes</div>
<div v-else key="no">No</div>
```

上記の例は、Vue 3.x でも動作します。しかし、`v-if`/`v-else`/`v-else-if` の分岐で `key` 属性を使うことはもうお勧めしません。条件分岐で `key` を指定しない場合には自動的にユニークな `key` が生成されるようになったからです。

```html
<!-- Vue 3.x -->
<div v-if="condition">Yes</div>
<div v-else>No</div>
```

今回の破壊的変更は、手動で `key` を指定した場合、各ブランチはユニークな `key` を使用しなければならないことです。ほとんどの場合、これらの `key` は削除できます。

```html
<!-- Vue 2.x -->
<div v-if="condition" key="a">Yes</div>
<div v-else key="a">No</div>

<!-- Vue 3.x （推奨の解決策: キーの削除） -->
<div v-if="condition">Yes</div>
<div v-else>No</div>

<!-- Vue 3.x （代替策: キーを常にユニークにする） -->
<div v-if="condition" key="a">Yes</div>
<div v-else key="b">No</div>
```

## `<template v-for>` での使用 {#with-template-v-for}

Vue 2.x では、`<template>` タグは `key` を持つことができず、その代わりにそれぞれの子要素に `key` を配置できました。

```html
<!-- Vue 2.x -->
<template v-for="item in list">
  <div :key="'heading-' + item.id">...</div>
  <span :key="'content-' + item.id">...</span>
</template>
```

Vue 3.x ではそうではなく、`key` は `<template>` タグに配置する必要があります。

```html
<!-- Vue 3.x -->
<template v-for="item in list" :key="item.id">
  <div>...</div>
  <span>...</span>
</template>
```

同様に、`v-if` がある子要素を持つ `<template v-for>` を使う場合、`key` は `<template>` タグに移動する必要があります。

```html
<!-- Vue 2.x -->
<template v-for="item in list">
  <div v-if="item.isVisible" :key="item.id">...</div>
  <span v-else :key="item.id">...</span>
</template>

<!-- Vue 3.x -->
<template v-for="item in list" :key="item.id">
  <div v-if="item.isVisible">...</div>
  <span v-else>...</span>
</template>
```
