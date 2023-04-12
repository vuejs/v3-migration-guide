---
badges:
  - removed
---

# $children <MigrationBadges :badges="$frontmatter.badges" />

## 概要

インスタンスプロパティ `$children` は Vue 3.0 から削除され、サポートされなくなりました。

## 2.x の構文

2.x では、開発者は `this.$children` で現在のインスタンスの直接の子コンポーネントにアクセスできました:

```vue
<template>
  <div>
    <img alt="Vue logo" src="./assets/logo.png">
    <my-button>Change logo</my-button>
  </div>
</template>

<script>
import MyButton from './MyButton'

export default {
  components: {
    MyButton
  },
  mounted() {
    console.log(this.$children) // [VueComponent]
  }
}
</script>
```

## 3.x の更新内容

3.x では、`$children` プロパティは削除され、サポートされなくなりました。代わりに、子コンポーネントのインスタンスにアクセスする必要がある場合は、[テンプレート参照](https://ja.vuejs.org/guide/essentials/template-refs.html#template-refs)を使用することをお勧めします。

## 移行手順

[移行ビルドのフラグ: `INSTANCE_CHILDREN`](../migration-build.html#compat-configuration)
