---
badges:
  - new
---

# 非同期コンポーネント <MigrationBadges :badges="$frontmatter.badges" />

## 概要

変更点の概要は次のとおりです:

- 非同期コンポーネントを明示的に定義する新しいヘルパーメソッド `defineAsyncComponent`
- `component` オプションは `loader` に名称変更されました
- ローダー関数は `resolve` と `reject` の引数を受け取らず、Promise を返す必要があります

より詳しい説明は続きをお読みください！

## はじめに

以前は、以下のように promise を返す関数としてコンポーネントを定義するだけで、非同期コンポーネントが作成できました:

```js
const asyncModal = () => import('./Modal.vue')
```

もしくはオプションのついた、より高度なコンポーネント構文の場合は:

```js
const asyncModal = {
  component: () => import('./Modal.vue'),
  delay: 200,
  timeout: 3000,
  error: ErrorComponent,
  loading: LoadingComponent
}
```

## 3.x の構文

Vue 3 では、関数型コンポーネントは純粋な関数として定義されるため、非同期コンポーネントの定義は、新しい `defineAsyncComponent` ヘルパーでラップして明示的に定義する必要があります:

```js
import { defineAsyncComponent } from 'vue'
import ErrorComponent from './components/ErrorComponent.vue'
import LoadingComponent from './components/LoadingComponent.vue'

// オプションなし非同期コンポーネント
const asyncModal = defineAsyncComponent(() => import('./Modal.vue'))

// オプションあり非同期コンポーネント
const asyncModalWithOptions = defineAsyncComponent({
  loader: () => import('./Modal.vue'),
  delay: 200,
  timeout: 3000,
  errorComponent: ErrorComponent,
  loadingComponent: LoadingComponent
})
```

::: tip 注意
Vue Router は、ルート（route）コンポーネントを非同期にロードするための同様のメカニズムをサポートしており、*lazy loading* として知られています。類似しているとはいえ、この機能は Vue の非同期コンポーネントのサポートとは異なるものです。Vue Router でルートコンポーネントを設定する際、`defineAsyncComponent` は**使用しないで**ください。これについては、Vue Router ドキュメントの [Lazy Loading Routes](https://router.vuejs.org/guide/advanced/lazy-loading.html) セクションで詳しく説明されています。
:::

2.x からのもう 1 つの変更点は、コンポーネント定義を直接提供できないことを正確に伝えるために、`component` オプションが `loader` に名称変更されたことです。

```js{4}
import { defineAsyncComponent } from 'vue'

const asyncModalWithOptions = defineAsyncComponent({
  loader: () => import('./Modal.vue'),
  delay: 200,
  timeout: 3000,
  errorComponent: ErrorComponent,
  loadingComponent: LoadingComponent
})
```

また、2.x とは異なり、loader 関数は `resolve` と `reject` の引数を受け取らなくなり、常に Promise を返す必要があります。

```js
// 2.x バージョン
const oldAsyncComponent = (resolve, reject) => {
  /* ... */
}

// 3.x バージョン
const asyncComponent = defineAsyncComponent(
  () =>
    new Promise((resolve, reject) => {
      /* ... */
    })
)
```

非同期コンポーネントの使用方法の詳細については、こちらをご覧ください:

- [ガイド: 非同期コンポーネント](https://ja.vuejs.org/guide/components/async.html)
- [移行ビルドのフラグ: `COMPONENT_ASYNC`](../migration-build.html#compat-configuration)
