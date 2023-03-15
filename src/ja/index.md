# Vue 3 移行ガイド

:::warning Vue 2 のサポートは 2023 年 12 月 31 日をもって終了します。
EOL の日付までに Vue 3 へのアップグレードが不可能な場合は、[Extended LTS](https://v2.vuejs.org/lts/) の詳細をご覧ください。
:::

このガイドは主に、Vue 2 の経験があり、Vue 3 との変更点について学びたいユーザーのためのものです。**Vue 3 を試す前に最初から最後まで読まなければならないものではありません。** Vue 3 を学ぶには、[新しいドキュメント](https://ja.vuejs.org)を読むのがおすすめです。

<!-- VueMastery Start -->
<script setup>
import VueMasteryWidget from '../VueMastery.vue'
</script>
<VueMasteryWidget/>
<!-- VueMastery End -->

## 注目すべき新機能

Vue 3 で注目すべき新機能には、以下のようなものがあります:

- [Composition API](https://ja.vuejs.org/guide/extras/composition-api-faq.html)<span class="note">\*</span>
- [SFC Composition API のシンタックスシュガー（`<script setup>`）](https://ja.vuejs.org/api/sfc-script-setup.html)<span class="note">\*</span>
- [Teleport](https://ja.vuejs.org/guide/built-ins/teleport.html)
- [フラグメント](./new/fragments.html)
- [コンポーネントオプション emits](https://ja.vuejs.org/api/options-state.html#emits)<span class="note">\*\*</span>
- カスタムレンダラーを作成するための [`createRenderer` API（`@vue/runtime-core` からエクスポート）](https://ja.vuejs.org/api/custom-renderer.html)
- [SFC 状態駆動型 CSS 変数（`<style>` 内の `v-bind`）](https://ja.vuejs.org/api/sfc-css-features.html#v-bind-in-css)<span class="note">\*</span>
- [SFC `<style scoped>` にグローバルルールやスロットコンテンツのみを対象としたルールを含めることができるようになりました](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0023-scoped-styles-changes.md)
- [Suspense](https://ja.vuejs.org/guide/built-ins/suspense.html) <sup class="warning">実験的な機能</sup>

<sub class="note"><b>\*</b> <a href="https://blog.vuejs.org/posts/vue-2-7-naruto.html" target="_blank">Vue 2.7</a> でもサポートされるようになりました</sub><br>
<sub class="note"><b>\*\*</b> Vue 2.7 でサポートされますが、型推論のみがサポートされます</sub>

## 破壊的変更

Vue 2 から Vue 3 の破壊的変更は[こちら](./breaking-changes/)に列挙されています。

## フレームワークレベルでの新しい推奨事項

フレームワークレベルでの新しい推奨事項は[こちら](./recommendations)に列挙されています。

## 移行ビルド

既存の Vue 2 プロジェクトやライブラリーをお持ちで、Vue 3 にアップグレードする予定がある場合、Vue 2 互換の API を提供する Vue 3 のビルドを提供します。詳しくは[移行ビルド](./migration-build.html)のページをご確認ください。

<style>
.note {
  color: #476582;
}
</style>
