---
badges:
  - breaking
---

# カスタムディレクティブ <MigrationBadges :badges="$frontmatter.badges" />

## 概要

ディレクティブのフック関数は、コンポーネントのライフサイクルに合わせて名称が変更されました。

さらに、`expression` の文字列は、`binding` オブジェクトの一部として渡されなくなりました。

## 2.x の構文

Vue 2 では、カスタムディレクティブは要素のライフサイクルを対象とする、以下に示すフックを使用して作成されました。これらはすべて省略可能です:

- **bind** - ディレクティブが要素にバインドされた時点で呼び出されます。一度だけ呼び出されます。
- **inserted** - 要素が親 DOM に挿入されると呼び出されます。
- **update** - このフックは、要素が更新されたが、子がまだ更新されていないときに呼び出されます。
- **componentUpdated** - このフックは、コンポーネントと子が更新された時点で呼び出されます。
- **unbind** - このフックはディレクティブが削除されると呼び出されます。また、一度だけ呼ばれます。

その一例を紹介します:

```html
<p v-highlight="'yellow'">Highlight this text bright yellow</p>
```

```js
Vue.directive('highlight', {
  bind(el, binding, vnode) {
    el.style.background = binding.value
  }
})
```

ここでは、この要素の初期設定において、ディレクティブは値を渡すことでスタイルをバインドします。この値は適用によって異なる値に更新できます。

## 3.x の構文

しかし、Vue 3 では、カスタムディレクティブのための、よりまとまりのある API が作成されました。ご覧のように、同様のイベントにフックしているにもかかわらず、コンポーネントのライフサイクルメソッドとは大きく異なっています。そこで、このような形で統一しました:

- **created** - 新機能！　要素の属性やイベントリスナーが適用される前に呼び出されます。
- bind → **beforeMount**
- inserted → **mounted**
- **beforeUpdate**: 新機能！　コンポーネントのライフサイクルフックと同様に、要素自体が更新される前に呼び出されます。
- update → 削除！　`updated` との類似点が多すぎて冗長でした。代わりに `updated` を使用してください。
- componentUpdated → **updated**
- **beforeUnmount**: 新機能！　コンポーネントのライフサイクルフックと同様に、エレメントがアンマウントされる直前に呼び出されます。
- unbind -> **unmounted**

最終的な API は以下の通りです:

```js
const MyDirective = {
  created(el, binding, vnode, prevVnode) {}, // 新機能
  beforeMount() {},
  mounted() {},
  beforeUpdate() {}, // 新機能
  updated() {},
  beforeUnmount() {}, // 新機能
  unmounted() {}
}
```

出来上がった API は、先ほどの例と同じように、次のように使用できます:

```html
<p v-highlight="'yellow'">Highlight this text bright yellow</p>
```

```js
const app = Vue.createApp({})

app.directive('highlight', {
  beforeMount(el, binding, vnode) {
    el.style.background = binding.value
  }
})
```

カスタムディレクティブのライフサイクルフックは、コンポーネント自体のライフサイクルフックと同じであるため、推測や覚えるのが簡単になりました！

### エッジケース: コンポーネントインスタンスへのアクセス

一般的にディレクティブは、使用されるコンポーネントインスタンスから独立していることが推奨されます。カスタムディレクティブの中からインスタンスにアクセスすることは、ディレクティブがむしろコンポーネントそのものであるべきというサインであることが多いのです。しかし、これが実際に理にかなっている状況もあります。

Vue 2 では、コンポーネントのインスタンスは `vnode` 引数を通してアクセスする必要がありました:

```js
bind(el, binding, vnode) {
  const vm = vnode.context
}
```

Vue 3 では、インスタンスは `binding` の一部となりました:

```js
mounted(el, binding, vnode) {
  const vm = binding.instance
}
```

:::warning
[フラグメント](../new/fragments.html#overview)のサポートにより、コンポーネントは複数のルートノードを持つ可能性があります。マルチルートノードのコンポーネントに適用した場合、カスタムディレクティブは無視され、警告がログに出力されます。
:::

## 移行手順

[移行ビルドのフラグ: `CUSTOM_DIR`](../migration-build.html#compat-configuration)
