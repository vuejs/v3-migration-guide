---
title: $attrs が class と style を包含
badges:
  - breaking
---

# `$attrs` が `class` と `style` を包含 <MigrationBadges :badges="$frontmatter.badges" />

## 概要

`class` や `style` を含む、コンポーネントに渡された**すべての**属性が `$attrs` に含まれるようになりました。

## 2.x の動作

`class` と `style` 属性は、Vue 2 の仮想 DOM の実装で特別な処理を受けます。そのため、これらは `$attrs` には含まれず、他の属性はすべて含まれます。

この副作用は、`inheritAttrs: false` を使用したときに現れます:

- `$attrs` 内の属性は自動的にルート要素に追加されなくなり、どこに追加するかは開発者の判断に任されます。
- しかし、`$attrs` に含まれない `class` と `style` は、今までどおりコンポーネントのルート要素に適用されます：

```vue
<template>
  <label>
    <input type="text" v-bind="$attrs" />
  </label>
</template>
<script>
export default {
  inheritAttrs: false
}
</script>
```

次のように使用すると:

```html
<my-component id="my-id" class="my-class"></my-component>
```

... 以下のような HTML を生成します:

```html
<label class="my-class">
  <input type="text" id="my-id" />
</label>
```

## 3.x の動作

`$attrs` には**すべての**属性が含まれるので、すべての属性を別の要素に適用することが容易になります。先ほどの例では、次のような HTML が生成されるようになりました:

```html
<label>
  <input type="text" id="my-id" class="my-class" />
</label>
```

## 移行手順

`inheritAttrs: false` を使用しているコンポーネントでは、スタイリングが意図したとおりになっていることを確認してください。これまで `class` と `style` の特別な動作に依存していた場合、これらの属性が別の要素に適用される可能性があるため、一部のビジュアルが崩れるかも知れません。

[移行ビルドのフラグ: `INSTANCE_ATTRS_CLASS_STYLE`](../migration-build.html#compat-configuration)

## 参照

- [関連 RFC](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0031-attr-fallthrough.md)
- [移行ガイド - `$listeners` の削除](./listeners-removed.md)
- [移行ガイド - 新しい `emits` オプション](./emits-option.md)
- [移行ガイド - `.native` 修飾子の削除](./v-on-native-modifier-removed.md)
- [移行ガイド - レンダー関数 API の変更点](./render-function-api.md)
