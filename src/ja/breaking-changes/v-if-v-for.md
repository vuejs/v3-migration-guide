---
title: v-if と v-for の優先順位
badges:
  - breaking
---

# {{ $frontmatter.title }} <MigrationBadges :badges="$frontmatter.badges" />

## 概要

- **破壊的変更**: 同じ要素で使用した場合、`v-if` は `v-for` より優先度が高くなります

## はじめに

Vue.js で最もよく使われるディレクティブは `v-if` と `v-for` の 2 つです。そのため、開発者がこの 2 つを一緒に使いたいと思うことがあっても不思議ではありません。これは推奨される方法ではありませんが、必要な場合もあるため、その仕組についてのガイダンスを提供したいと考えています。

## 2.x の構文

2.x では、同じ要素に対して `v-if` と `v-for` を使用した場合、`v-for` が優先されました。

## 3.x の構文

3.x では、`v-if` は常に `v-for` より優先度が高くなります。

## 移行手順

構文があいまいなため、同じ要素で両方を使用することは避けることをお勧めします。

これをテンプレートレベルで管理するのではなく、表示する要素のリストをフィルタリングする算出プロパティを作成することで実現する方法があります。

[移行ビルドのフラグ: `COMPILER_V_IF_V_FOR_PRECEDENCE`](../migration-build.html#compat-configuration)

## 参照

- [リストレンダリング - フィルタリング/並べ替えの結果を表示する](https://ja.vuejs.org/guide/essentials/list.html#displaying-filtered-sorted-results)
- [リストレンダリング - `v-for` と `v-if`](https://ja.vuejs.org/guide/essentials/list.html#v-for-with-v-if)
