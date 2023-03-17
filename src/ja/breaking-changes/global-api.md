---
badges:
  - breaking
---

# グローバル API アプリケーションインスタンス<MigrationBadges :badges="$frontmatter.badges" />

Vue 2.x には、Vue の動作をグローバルに変更するグローバル API や設定が多数用意されています。例えばグローバルコンポーネントを登録するには、次のように `Vue.component` API を使用します:

```js
Vue.component('button-counter', {
  data: () => ({
    count: 0
  }),
  template: '<button @click="count++">Clicked {{ count }} times.</button>'
})
```

同様に、グローバルディレクティブもこのように宣言します:

```js
Vue.directive('focus', {
  inserted: (el) => el.focus()
})
```

この方法は便利ですが、いくつかの問題を引き起こします。技術的には、Vue 2 には「アプリ」という概念がありません。私たちがアプリと定義しているのは、単に `new Vue()` によって作成されたルート Vue インスタンスです。同じ Vue コンストラクターから作成されたすべてのルートインスタンスは、**同じグローバル設定を共有します**。その結果、以下のようになります:

- グローバル設定は、テスト中に誤って他のテストケースを汚染しやすくなります。ユーザーは慎重に元のグローバル設定を保存し、テストのたびにそれを復元（例えば `Vue.config.errorHandler` をリセット）する必要があります。`Vue.use` や `Vue.mixin` のような一部の API は、その作用を元に戻す方法さえ持っていません。このため、プラグインを含むテストは特にやっかいです。実際、vue-test-utils はこれに対処するため、特別な API の `createLocalVue` を実行する必要があります:

  ```js
  import { createLocalVue, mount } from '@vue/test-utils'

  // 拡張された `Vue` コンストラクターを作成
  const localVue = createLocalVue()

  // 「ローカル」の Vue コンストラクターへ、プラグインを「グローバル」にインストール
  localVue.use(MyPlugin)

  // mount のオプションに `localVue` を渡す
  mount(Component, { localVue })
  ```

- グローバル設定によって、同じページ上にありながらグローバル設定が異なる複数の「アプリ」間で、同じ Vue のコピーを共有することが難しくなります。

  ```js
  // これは両方のルートインスタンスに影響する
  Vue.mixin({
    /* ... */
  })

  const app1 = new Vue({ el: '#app-1' })
  const app2 = new Vue({ el: '#app-2' })
  ```

このような問題を回避するために、Vue 3 では…

## 新しいグローバル API: `createApp` {#a-new-global-api-createapp}

`createApp` を呼び出すと、Vue 3 の新しい概念である**app インスタンス**が返されます。

```js
import { createApp } from 'vue'

const app = createApp({})
```

Vue の CDN ビルドを使用している場合、`createApp` はグローバルな `Vue` オブジェクトを通じて公開されます:

```js
const { createApp } = Vue

const app = createApp({})
```

アプリインスタンスは、Vue 2 のグローバル API のサブセットを公開します。基本的に、Vue の動作をグローバルに変更する API は、すべてアプリインスタンスに移動されました。以下は、Vue 2 のグローバル API とそれに対応するインスタンス API の表です:

| 2.x のグローバル API             | 3.x のインスタンス API (`app`)                                                                                                        |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| Vue.config                 | app.config                                                                                                                      |
| Vue.config.productionTip   | 削除されました（[下記参照](#config-productiontip-removed)）                                                                          |
| Vue.config.ignoredElements | app.config.compilerOptions.isCustomElement（[下記参照](#config-ignoredelements-is-now-config-compileroptions-iscustomelement)） |
| Vue.component              | app.component                                                                                                                   |
| Vue.directive              | app.directive                                                                                                                   |
| Vue.mixin                  | app.mixin                                                                                                                       |
| Vue.use                    | app.use（[下記参照](#a-note-for-plugin-authors)）                                                                               |
| Vue.prototype              | app.config.globalProperties（[下記参照](#vue-prototype-replaced-by-config-globalproperties)）                                   |
| Vue.extend                 | 削除されました（[下記参照](#vue-extend-removed)）                                                                                    |

[グローバル API ツリーシェイキング](./global-api-treeshaking.html)に記載されているように、動作をグローバルに変更しない他のすべてのグローバル API は named exports されるようになりました。

### `config.productionTip` は削除されました {#config-productiontip-removed}

Vue 3.x では、「開発 + フルビルド」（ランタイムコンパイラを含み、警告があるビルド）を使用する場合にのみ、「use production build」というヒントが表示されます。

ES モジュールのビルドの場合、バンドラーと共に使用されて、CLI やボイラープレートによってプロダクション環境を適切に設定できる場合がほとんどなので、このヒントは表示されなくなりました。

[移行ビルドのフラグ: `CONFIG_PRODUCTION_TIP`](../migration-build.html#compat-configuration)

### `config.ignoredElements` は `config.compilerOptions.isCustomElement` になりました {#config-ignoredelements-is-now-config-compileroptions-iscustomelement}

この設定オプションは、ネイティブのカスタム要素をサポートする目的で導入されたもので、名称を変更することで、その役割をより明確に伝えることができます。新しいオプションは、以前の文字列や正規表現のアプローチよりも柔軟性を提供する関数も受け付けます:

```js
// 変更前
Vue.config.ignoredElements = ['my-el', /^ion-/]

// 変更後
const app = createApp({})
app.config.compilerOptions.isCustomElement = (tag) => tag.startsWith('ion-')
```

::: tip 重要

Vue 3 では、要素がコンポーネントかどうかのチェックはテンプレートのコンパイルフェーズに移されたため、この設定オプションはランタイムコンパイラーを使用する場合にのみ考慮されます。ランタイムのみのビルドを使用する場合、`isCustomElement` はビルドの設定で `@vue/compiler-dom` に渡す必要があります。例えば、vue-loader の [`compilerOptions` オプション](https://vue-loader.vuejs.org/options.html#compileroptions)で渡します。

- ランタイムのみのビルドを使用しているときに `config.compilerOptions.isCustomElement` が割り当てられた場合、代わりにビルド設定でオプションを渡すように指示する警告が表示されます。
- これは、Vue CLI 設定の新しいトップレベルオプションとなります。
  :::

[移行ビルドのフラグ: `CONFIG_IGNORED_ELEMENTS`](../migration-build.html#compat-configuration)

### `Vue.prototype` は `config.globalProperties` に置き換わりました {#vue-prototype-replaced-by-config-globalproperties}

Vue 2 では一般的に、すべてのコンポーネントでアクセス可能なプロパティを追加するために `Vue.prototype` が使用されました。

Vue 3 でこれに相当するのは [`config.globalProperties`](https://ja.vuejs.org/api/application.html#app-config-globalproperties) です。これらのプロパティは、アプリケーション内でコンポーネントをインスタンス化する際に、その一部としてコピーされることになります:

```js
// 変更前 - Vue 2
Vue.prototype.$http = () => {}
```

```js
// 変更後 - Vue 3
const app = createApp({})
app.config.globalProperties.$http = () => {}
```

また、`globalProperties` の代替として、`provide`（[後述](#provide-inject)）の使用も検討する必要があります。

[移行ビルドのフラグ: `GLOBAL_PROTOTYPE`](../migration-build.html#compat-configuration)

### `Vue.extend` は削除されました {#vue-extend-removed}

Vue 2.x では、`Vue.extend` を使用して、コンポーネントオプションを含むオブジェクトを引数とするベース Vue コンストラクターの「サブクラス」を作成しました。Vue 3.x では、コンポーネントコンストラクターという概念はなくなりました。コンポーネントをマウントするには、常にグローバル API の `createApp` を使用する必要があります:

```js
// 変更前 - Vue 2

// コンストラクター作成
const Profile = Vue.extend({
  template: '<p>{{firstName}} {{lastName}} aka {{alias}}</p>',
  data() {
    return {
      firstName: 'Walter',
      lastName: 'White',
      alias: 'Heisenberg'
    }
  }
})
// Profile のインスタンスを生成し、要素にマウント
new Profile().$mount('#mount-point')
```

```js
// 変更後 - Vue 3
const Profile = {
  template: '<p>{{firstName}} {{lastName}} aka {{alias}}</p>',
  data() {
    return {
      firstName: 'Walter',
      lastName: 'White',
      alias: 'Heisenberg'
    }
  }
}

Vue.createApp(Profile).mount('#mount-point')
```

#### 型推論

Vue 2 では、`Vue.extend` はコンポーネントオプションの TypeScript 型推論を提供するためにも使用されました。Vue 3 では、同じ目的で `Vue.extend` の代わりにグローバル API の `defineComponent` を使用できます。

`defineComponent` の戻り値はコンストラクターのような型ですが、TSX 推論にのみ使用されることに注意してください。実行時には、`defineComponent` はほとんど何もせず、オプションオブジェクトをそのまま返します。

#### コンポーネントの継承

Vue 3 では、継承やミックスインよりも、[Composition API](https://ja.vuejs.org/guide/reusability/composables.html) によるコンポジションを強く推奨しています。何らかの理由でコンポーネントの継承が必要な場合は、`Vue.extend` の代わりに [`extends` オプション](https://ja.vuejs.org/api/options-composition.html#extends)を使用できます。

[移行ビルドのフラグ: `GLOBAL_EXTEND`](../migration-build.html#compat-configuration)

### プラグイン作者への注意事項

プラグイン作者は、UMD ビルドの際に `Vue.use` を使ってプラグインを自動的にインストールするのが一般的なやり方です。例えば、公式の `vue-router` プラグインは、以下のようにブラウザー環境にインストールされます:

```js
var inBrowser = typeof window !== 'undefined'
/* … */
if (inBrowser && window.Vue) {
  window.Vue.use(VueRouter)
}
```

Vue 3 ではグローバル API である `use` が利用できなくなったため、このやり方は機能しなくなり、`Vue.use()` を呼び出すと警告が表示されるようになりました。代わりに、エンドユーザーはアプリのインスタンスでプラグインの使用を明示的に指定する必要があります:

```js
const app = createApp(MyApp)
app.use(VueRouter)
```

## アプリインスタンスのマウント {#mounting-app-instance}

`createApp(/* オプション */)` で初期化した後、アプリのインスタンス `app` を使って `app.mount(domTarget)` でルートコンポーネントのインスタンスをマウントできます:

```js
import { createApp } from 'vue'
import MyApp from './MyApp.vue'

const app = createApp(MyApp)
app.mount('#app')
```

これらの変更により、このガイドの冒頭にあるコンポーネントとディレクティブは、次のようなものに書き直されます:

```js
const app = createApp(MyApp)

app.component('button-counter', {
  data: () => ({
    count: 0
  }),
  template: '<button @click="count++">Clicked {{ count }} times.</button>'
})

app.directive('focus', {
  mounted: (el) => el.focus()
})

// これで、app.mount() でマウントされたすべてのアプリケーションインスタンスと
// そのコンポーネントツリーは、グローバル環境を汚染することなく、
// 同じ button-counter コンポーネントと focus ディレクティブを持つことになります
app.mount('#app')
```

[移行ビルドのフラグ: `GLOBAL_MOUNT`](../migration-build.html#compat-configuration)

## Provide / Inject

2.x のルートインスタンスで `provide` オプションを使用するのと同様に、Vue 3 アプリインスタンスは、アプリ内の任意のコンポーネントによって注入される依存関係を提供できます:

```js
// エントリー内
app.provide('guide', 'Vue 3 Guide')

// 子コンポーネント内
export default {
  inject: {
    book: {
      from: 'guide'
    }
  },
  template: `<div>{{ book }}</div>`
}
```

`provide` の使用は `globalProperties` の代わりとして、特にプラグインを作成する際に便利です。

## アプリ間で設定を共有する

コンポーネントやディレクティブなどの設定をアプリ間で共有する方法のひとつに、次のようなファクトリー関数を作成する方法があります:

```js
import { createApp } from 'vue'
import Foo from './Foo.vue'
import Bar from './Bar.vue'

const createMyApp = (options) => {
  const app = createApp(options)
  app.directive('focus' /* ... */)

  return app
}

createMyApp(Foo).mount('#foo')
createMyApp(Bar).mount('#bar')
```

これで `focus` ディレクティブは `Foo` と `Bar` の両方のインスタンスとその子孫で利用できるようになりました。
