---
badges:
  - breaking
---

# ルートのトランジション <MigrationBadges :badges="$frontmatter.badges" />

## 概要

コンポーネントのルートとして `<transition>` を使用する場合、外部からコンポーネントを切り替えたときにトランジションが発生しなくなりました。

## 2.x の動作

Vue 2 では、コンポーネントのルートとして `<transition>` を使用することで、コンポーネントの外からトランジションをトリガーできました:

```html
<!-- モーダルコンポーネント -->
<template>
  <transition>
    <div class="modal"><slot/></div>
  </transition>
</template>
```

```html
<!-- 使用箇所 -->
<modal v-if="showModal">hello</modal>
```

`showModal` の値を切り替えると、モーダルコンポーネントの内部でトランジションが発生します。

これは偶然の産物であり、意図したものではありませんでした。`<transition>` は、`<transition>` 自体のトグルではなく、その子への変更によってトリガーされることになっています。

現在、この動作は解消されています。

## 移行手順

代わりに、コンポーネントにプロパティを渡すことによって同様の効果を得られます:

```vue
<template>
  <transition>
    <div v-if="show" class="modal"><slot/></div>
  </transition>
</template>
<script>
export default {
  props: ['show']
}
</script>
```

```html
<!-- 使用箇所 -->
<modal :show="showModal">hello</modal>
```

## 参照

- [一部のトランジションクラスが名称変更されました](./transition.html)
- [`<TransitionGroup>` はデフォルトでラッパー要素をレンダリングしなくなりました](./transition-group.html)
