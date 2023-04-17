---
title: トランジションクラスの変更
badges:
  - breaking
---

# {{ $frontmatter.title }} <MigrationBadges :badges="$frontmatter.badges" />

## 概要

`v-enter` トランジションクラスは `v-enter-from` に名称変更され、`v-leave` トランジションクラスは `v-leave-from` に名称変更されました。

## 2.x の構文

v2.1.8 以前は、トランジションの方向ごとに 2 つの遷移クラス（初期状態と活性状態）がありました。

v2.1.8 で、enter/leave のトランジション間のタイミングギャップに対応するため、`v-enter-to` を導入しました。しかし、後方互換性のために、`v-enter` という名前はそのまま残されています:

```css
.v-enter,
.v-leave-to {
  opacity: 0;
}

.v-leave,
.v-enter-to {
  opacity: 1;
}
```

_enter_ と _leave_ は幅広く、対応するクラスフックと同じ命名規則を使っていないため、これは混乱を招きました。

## 3.x の更新内容

より明示的で分かりやすくするために、これらの初期状態クラスの名前を変更しました:

```css
.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.v-leave-from,
.v-enter-to {
  opacity: 1;
}
```

これらの状態の違いがより明確になりました。

![Transition Diagram](/images/transitions.svg)

また、`<transition>` コンポーネントの関連プロパティの名前も変更されました:

- `leave-class` は `leave-from-class` に名称変更されます（レンダー関数や JSX では `leaveFromClass` と記述できます）
- `enter-class` は `enter-from-class` に名称変更されます（レンダー関数や JSX では `enterFromClass` と記述できます）

## 移行手順

1. `.v-enter` の使用箇所を `.v-enter-from` に置き換える。
2. `.v-leave` の使用箇所を `.v-leave-from` に置き換える。
3. 上述の、関連するプロパティ名の使用箇所を置き換える。

## 参照

- [ルートの `<Transition>` は、外部からトグルできなくなりました](./transition-as-root.html)
- [`<TransitionGroup>` はデフォルトでラッパー要素をレンダリングしなくなりました](./transition-group.html)
