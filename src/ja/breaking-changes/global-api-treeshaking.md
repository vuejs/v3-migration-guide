---
badges:
  - breaking
---

# グローバル API ツリーシェイキング <MigrationBadges :badges="$frontmatter.badges" />

## 2.x の構文

Vue で DOM を手動で操作したことがある人は、次のパターンに出くわしたことがあるかもしれません:

```js
import Vue from 'vue'

Vue.nextTick(() => {
  // DOM 関連の何か
})
```

あるいは、非同期コンポーネントを含むアプリケーションをユニットテストしている場合、次のようなことを書いたことがあるのではないでしょうか:

```js
import { shallowMount } from '@vue/test-utils'
import { MyComponent } from './MyComponent.vue'

test('an async feature', async () => {
  const wrapper = shallowMount(MyComponent)

  // DOM に関連するいくつかのタスクを実行

  await wrapper.vm.$nextTick()

  // アサーション実行
})
```

`Vue.nextTick()` は、単一の Vue オブジェクト上で直接公開されるグローバル API です - 実際のところ、インスタンスメソッド `$nextTick()` は `Vue.nextTick()` の便利なラッパーに過ぎず、コールバックの `this` コンテキストは便宜上、現在のインスタンスに自動的に結合されます。

しかし、手動で DOM を操作する必要がなく、アプリで非同期コンポーネントを使用したりテストしたりすることもない場合はどうでしょうか？　あるいは、何らかの理由で、代わりに古き良き `window.setTimeout()` を使いたい場合はどうでしょうか？　このような場合、`nextTick()` のコードはデッドコード、つまり、書かれているが使われないコードになってしまいます。特に、1 キロバイト単位が重要なクライアントサイドの文脈では、デッドコードは良いことではありません。

webpack や（Vite のベースとなっている）Rollup のようなモジュールバンドラーは、[ツリーシェイキング](https://webpack.js.org/guides/tree-shaking/)をサポートしています。これは「デッドコードの排除」を意味する装飾的な用語です。残念ながら以前の Vue バージョンではコードの記述方法が原因で、`Vue.nextTick()` のようなグローバル API はツリーシェイクされず、実際に使われる場所や使わない場所に関係なく最終的にバンドルに含まれます。

## 3.x の構文

Vue 3 では、ツリーシェイキングのサポートを念頭に置いて、グローバル API と内部 API が再構築されました。その結果、グローバル API は、ES モジュールビルドの名前付きエクスポートとしてのみアクセスできるようになりました。例えば、上記のスニペットは次のようになります:

```js
import { nextTick } from 'vue'

nextTick(() => {
  // DOM 関連の何か
})
```

さらに

```js
import { shallowMount } from '@vue/test-utils'
import { MyComponent } from './MyComponent.vue'
import { nextTick } from 'vue'

test('an async feature', async () => {
  const wrapper = shallowMount(MyComponent)

  // DOM に関連するいくつかのタスクを実行

  await nextTick()

  // アサーション実行
})
```

`Vue.nextTick()` を直接呼び出すと、悪名高い `undefined is not a function` エラーが発生するようになりました。

この変更により、モジュールバンドラーがツリーシェイキングをサポートしている場合、Vue アプリケーションで使用されないグローバル API は最終的なバンドルから排除され、最適なファイルサイズになります。

## 影響を受ける API

以下の Vue 2.x のグローバル API は、この変更の影響を受けます:

- `Vue.nextTick`
- `Vue.observable`（`Vue.reactive` に置き換え）
- `Vue.version`
- `Vue.compile`（フルビルドのみ）
- `Vue.set`（互換ビルドのみ）
- `Vue.delete`（互換ビルドのみ）

## 内部ヘルパー

パブリック API に加え、内部コンポーネントやヘルパーの多くも名前付きエクスポートとして公開されるようになりました。これにより、コンパイラーは、機能が使用されるときだけインポートするコードを出力できます。例えば次のテンプレートは:

```html
<transition>
  <div v-show="ok">hello</div>
</transition>
```

以下のようなものにコンパイルされます:

```js
import { h, Transition, withDirectives, vShow } from 'vue'

export function render() {
  return h(Transition, [withDirectives(h('div', 'hello'), [[vShow, this.ok]])])
}
```

つまり、`Transition` コンポーネントは、アプリケーションが実際に使用するときにのみインポートされます。言い換えれば、アプリケーションが `<transition>` コンポーネントを持たない場合、この機能をサポートするコードは最終的なバンドルには含まれません。

グローバルのツリーシェイキングでは、ユーザーは実際に使用する機能に対してのみ「支払う」ことになります。さらに良いことに、オプション機能を使用しないアプリケーションではバンドルサイズが大きくならないことが分かっているため、将来的にコア機能を追加する場合でも、フレームワークのサイズについて懸念することは少なくなっています。

::: warning 重要
上記は、ツリーシェイキング可能なバンドラーで使用するための [ES モジュールビルド](https://github.com/vuejs/core/tree/master/packages/vue#which-dist-file-to-use)にのみ適用されます。UMD ビルドは依然としてすべての機能を含み、Vue グローバル変数ですべてを公開します（そしてコンパイラーは、インポートする代わりにグローバルから API を使用するように適切な出力を生成します）。
:::

## プラグインでの使用

あなたのプラグインが、影響を受ける Vue 2.x のグローバル API に依存している場合、例えば:

```js
const plugin = {
  install: Vue => {
    Vue.nextTick(() => {
      // ...
    })
  }
}
```

Vue 3 では、明示的にインポートする必要があります:

```js
import { nextTick } from 'vue'

const plugin = {
  install: app => {
    nextTick(() => {
      // ...
    })
  }
}
```

webpack のようなモジュールバンドルを使っている場合、Vue のソースコードがプラグインにバンドルされてしまうことがあり、それはほとんどが期待するものではないです。これを防ぐための一般的な方法は、最終的なバンドルから Vue を除外するようにモジュールバンドラーを設定することです。webpack の場合、[`externals`](https://webpack.js.org/configuration/externals/) という設定オプションを使用します:

```js
// webpack.config.js
module.exports = {
  /*...*/
  externals: {
    vue: 'Vue'
  }
}
```

これは webpack に、Vue モジュールを外部ライブラリーとして扱い、バンドルしないように指示します。

モジュールバンドラーに [Rollup](https://rollupjs.org/) を選択した場合、基本的には何もせずに同じ効果を得られます。デフォルトでは Rollup は絶対モジュール ID（この例では `'vue'`）を外部依存関係として扱い、最終バンドルに含めないからです。しかし、バンドル中に ["Treating vue as external dependency"](https://rollupjs.org/guide/en/#warning-treating-module-as-external-dependency) という警告が出ることがありますが、これは `external` オプションで抑制できます:

```js
// rollup.config.js
export default {
  /*...*/
  external: ['vue']
}
```
