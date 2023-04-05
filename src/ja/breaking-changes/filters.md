---
badges:
  - removed
---

# フィルター <MigrationBadges :badges="$frontmatter.badges" />

## 概要

Vue 3.0 からフィルターは削除され、サポートされなくなりました。

## 2.x の構文

2.x では、開発者はフィルターを使用して、共通のテキストフォーマットを適用できました。

例えば:

```html
<template>
  <h1>Bank Account Balance</h1>
  <p>{{ accountBalance | currencyUSD }}</p>
</template>

<script>
  export default {
    props: {
      accountBalance: {
        type: Number,
        required: true
      }
    },
    filters: {
      currencyUSD(value) {
        return '$' + value
      }
    }
  }
</script>
```

これは一見便利ですが、中括弧内の式が「ただの JavaScript」であるという前提を崩すカスタム構文が必要で、学習コストと実装コストの両方がかかります。

## 3.x の更新内容

3.x ではフィルターは削除され、サポートされなくなりました。代わりに、メソッド呼び出しや算出プロパティに置き換えることをお勧めします。

上記の例を用いて、これを実装する方法の一例を紹介します。

```html
<template>
  <h1>Bank Account Balance</h1>
  <p>{{ accountInUSD }}</p>
</template>

<script>
  export default {
    props: {
      accountBalance: {
        type: Number,
        required: true
      }
    },
    computed: {
      accountInUSD() {
        return '$' + this.accountBalance
      }
    }
  }
</script>
```

## 移行手順

フィルターを使用する代わりに、算出プロパティやメソッドに置き換えることをお勧めします。

[移行ビルドのフラグ:](../migration-build.html#compat-configuration)

- `FILTERS`
- `COMPILER_FILTERS`

### グローバルなフィルター

グローバルに登録され、アプリ全体で使用されるフィルターを使用している場合、個々のコンポーネントごとに算出プロパティやメソッドに置き換えるのは不便な場合があります。

その代わりに [globalProperties](https://ja.vuejs.org/api/application.html#app-config-globalproperties) を使って、グローバルなフィルターをすべてのコンポーネントで利用できるようにできます:

```js
// main.js
const app = createApp(App)

app.config.globalProperties.$filters = {
  currencyUSD(value) {
    return '$' + value
  }
}
```

そして以下のように、この `$filters` オブジェクトを使ってすべてのテンプレートを修正できます:

```html
<template>
  <h1>Bank Account Balance</h1>
  <p>{{ $filters.currencyUSD(accountBalance) }}</p>
</template>
```

この方法では算出プロパティは使用できず、メソッドのみを使用できることに注意してください。算出プロパティは個々のコンポーネントの文脈で定義されたときにのみ意味を持つからです。
