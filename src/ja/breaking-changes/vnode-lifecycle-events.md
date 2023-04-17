---
badges:
  - breaking
---

# VNode ライフサイクルイベント <MigrationBadges :badges="$frontmatter.badges" />

## 概要

Vue 2 ではイベントを使用して、コンポーネントのライフサイクルの主要な段階を購読できました。これらのイベントは `hook:` プレフィックスで始まり、その後に対応するライフサイクルフックの名前が続きます。

Vue 3 では、このプレフィックスは `vue:` に変更されました。さらに、これらのイベントは、コンポーネントだけでなく HTML 要素でも利用できるようになりました。

## 2.x の構文

Vue 2 では、イベント名は相当するライフサイクルフックと同じで、プレフィックスとして `hook:` が付きます:

```html
<template>
  <child-component @hook:updated="onUpdated">
</template>
```

## 3.x の構文

Vue 3 では、イベント名の前に `vue:` が付きます:

```html
<template>
  <child-component @vue:updated="onUpdated">
</template>
```

## 移行手順

ほとんどの場合、プレフィックスを変更するだけでよいでしょう。ライフサイクルフックの `beforeDestroy` と `destroyed` はそれぞれ `beforeUnmount` と `unmounted` に名前が変更されたので、対応するイベントの名前も更新する必要があります。

[移行ビルドのフラグ: `INSTANCE_EVENT_HOOKS`](../migration-build.html#compat-configuration)

## 参照

- [移行ガイド - イベント API](./events-api.html)
