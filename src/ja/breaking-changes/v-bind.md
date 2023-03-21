---
title: v-bind のマージ動作
badges:
  - breaking
---

# {{ $frontmatter.title }} <MigrationBadges :badges="$frontmatter.badges" />

## 概要

- **破壊的変更**: v-bind のバインディングの順番は、レンダリング結果に影響します。

## はじめに

要素に属性を動的にバインドする場合、同じ要素で `v-bind="object"` 構文と個別の属性の両方を使用するのが一般的です。しかし、この場合、マージの優先順位に問題が生じます。

## 2.x の構文

2.x では、要素に `v-bind="object"` と個別の属性が定義されている場合、個別の属性は常に `object` のバインドを上書きしていました。

```html
<!-- テンプレート -->
<div id="red" v-bind="{ id: 'blue' }"></div>
<!-- 結果 -->
<div id="red"></div>
```

## 3.x の構文

3x では、要素に `v-bind="object"` と個別の属性が定義されている場合、バインディングが宣言されている順序によって、それらがどのようにマージされるかが決まります。つまり、`object` で定義されたものを個別の属性が常にオーバーライドすることを開発者が望んでいると想定するのではなく、必要とするマージ動作をより詳細にコントロールできるようになったのです。

```html
<!-- テンプレート -->
<div id="red" v-bind="{ id: 'blue' }"></div>
<!-- 結果 -->
<div id="blue"></div>

<!-- テンプレート -->
<div v-bind="{ id: 'blue' }" id="red"></div>
<!-- 結果 -->
<div id="red"></div>
```

## 移行手順

この `v-bind` のオーバーライド機能を利用している場合は、`v-bind` 属性が個別の属性より先に定義されているか確認することをお勧めします。

[移行ビルドのフラグ: `COMPILER_V_BIND_OBJECT_ORDER`](../migration-build.html#compat-configuration)
