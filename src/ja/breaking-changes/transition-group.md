---
title: トランジショングループのルート要素
badges:
  - breaking
---

# {{ $frontmatter.title }} <MigrationBadges :badges="$frontmatter.badges" />

## 概要

`<transition-group>` はデフォルトでルート要素をレンダリングしなくなりましたが、`tag` 属性でルート要素を作成できます。

## 2.x の構文

Vue 2 では、`<transition-group>` は他のカスタムコンポーネントと同様にルート要素が必要でした。ルート要素はデフォルトでは `<span>` ですが、`tag` 属性によってカスタマイズできます。

```html
<transition-group tag="ul">
  <li v-for="item in items" :key="item">
    {{ item }}
  </li>
</transition-group>
```

## 3.x の構文

Vue 3 では、[fragment のサポート](../new/fragments.html)があるので、コンポーネントにはルートノードが不要になりました。その結果、`<transition-group>` はデフォルトでルートノードをレンダリングしなくなりました。

- 上の例のように、Vue 2 のコードですでに `tag` 属性が定義されている場合、すべて以前と同じように動作します
- 定義されておらず、スタイリングやその他の動作がルート要素の `<span>` に依存して正しく動作しない場合は、`<transition-group>` に `tag="span"` を追加するだけです：

```html
<transition-group tag="span">
  <!-- -->
</transition-group>
```

## 移行手順

[移行ビルドのフラグ: `TRANSITION_GROUP_ROOT`](../migration-build.html#compat-configuration)

## 参照

- [一部のトランジションクラスが名称変更されました](./transition.html)
- [ルートの `<Transition>` は、外部からトグルできなくなりました](./transition-as-root.html)
