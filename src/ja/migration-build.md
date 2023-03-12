# 移行ビルド

## 概要

`@vue/compat`（別名「移行ビルド」）は、設定可能な Vue 2 互換の動作を提供する、Vue 3 のビルドです。

移行ビルドはデフォルトで Vue 2 モードで動作します。ほとんどの公開 API はいくつかの例外を除いて、Vue 2 とまったく同じように動作します。Vue 3 で変更または非推奨となった機能を使用すると、実行時警告が表示されます。機能の互換性はコンポーネント単位で有効化/無効化できます。

### 想定しているユースケース

- Vue 2 アプリケーションを Vue 3 にアップグレードする（[制限](#known-limitations)あり）
- Vue 3 に対応するためのライブラリーの移行
- Vue 3 をまだ試していない経験豊富な Vue 2 開発者にとって、Vue 3 の代わりに移行ビルドを使用することで、バージョン間の違いを学ぶことができます。

### 既知の制限

移行ビルドは Vue 2 の動作をできるだけ模倣するよう努力していますが、いくつかの制限があるため、アプリをアップグレードの対象にできない場合があります:

- Vue 2 の内部 API やドキュメントにはない動作に依存する依存関係。最も一般的なケースは、`VNodes` のプライベートプロパティの使用です。あなたのプロジェクトが [Vuetify](https://vuetifyjs.com/en/), [Quasar](https://quasar.dev/), [ElementUI](https://element.eleme.io/#/en-US) のようなコンポーネントライブラリーに依存している場合、それらの Vue 3 互換バージョンを待つのが最善です。

- Internet Explorer 11 対応: [Vue 3 は IE11 対応の計画を正式に取りやめました](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0038-vue3-ie11-support.md)。まだ IE11 以下のサポートが必要な場合は、Vue 2 のままにしておく必要があります。

- サーバーサイドレンダリング: 移行ビルドは SSR にも使えますが、カスタム SSR セットアップの移行はもっと複雑です。`vue-server-renderer` を [`@vue/server-renderer`](https://github.com/vuejs/core/tree/master/packages/server-renderer) に置き換えるのが一般的です。Vue 3 ではバンドルレンダラーが提供されなくなったので、Vue 3 の SSR を [Vite](https://ja.vitejs.dev/guide/ssr.html) で使用することが推奨されています。[Nuxt.js](https://nuxtjs.org/ja/) を使用している場合は、Nuxt 3 を待つ方がよいでしょう。

### 期待されること

移行ビルドは、公開されている Vue 2 の API と動作のみをカバーすることを目的としていることにご注意ください。ドキュメントにはない動作に依存していることにより移行ビルドでアプリケーションが実行できない場合、その特定のケースに対応するために移行ビルドを調整することはまずありません。代わりに、問題のある動作への依存を取り除くためのリファクタリングを検討してください。

注意: アプリケーションが大規模で複雑な場合、移行ビルドを使用しても移行は困難である可能性が高いです。もしあなたのアプリが残念ながらアップグレードに適さない場合、Composition API と他のいくつかの Vue 3 機能を 2.7 リリースでバックポートする予定であることに注意してください（2021 年第 3 四半期後半に予定）。

移行ビルドでアプリを動作させる場合でも、移行が完了する前にプロダクション環境へ出荷**できます**。パフォーマンスやサイズのオーバーヘッドが若干発生しますが、プロダクション環境の UX に顕著な影響を与えることはないでしょう。Vue 2 の動作に依存する依存関係があってアップグレードや置き換えができない場合は、そのようにする必要があるかもしれません。

移行用ビルドは 3.1 から提供され、3.2 のリリースラインと同時に公開され続けます。将来のマイナーバージョン（2021 年末以降）で移行用ビルドの公開を終了する予定ですので、それまでに標準ビルドへの移行を目指す必要があります。

## アップグレードのワークフロー

以下のワークフローでは、実際の Vue 2 アプリ（Vue HackerNews 2.0）を Vue 3 に移行するステップを説明します。完全なコミットは、[こちら](https://github.com/vuejs/vue-hackernews-2.0/compare/migration)で見ることができます。あなたのプロジェクトに必要な実際の手順は異なる可能性があり、これらの手順は厳密な指示ではなく、一般的なガイダンスとして扱われるべきであることに注意してください。

### 準備

- 非推奨の[名前付き/スコープ付きスロット構文](https://jp.vuejs.org/v2/guide/components-slots.html#%E9%9D%9E%E6%8E%A8%E5%A5%A8%E3%81%AE%E6%A7%8B%E6%96%87)をまだ使用している場合は、まず最新の構文にアップデートしてください（2.6 ですでにサポートされています）。

### インストール

1. 該当する場合はツールをアップグレードします。

   - カスタム webpack セットアップを使用している場合: `vue-loader` を `^16.0.0` にアップグレードしてください。
   - `vue-cli` を使用している場合: `vue upgrade` を使って、最新の `@vue/cli-service` にアップグレードしてください
   - （代替）[Vite](https://ja.vitejs.dev/) + [vite-plugin-vue2](https://github.com/underfin/vite-plugin-vue2) に移行する。[[コミットの例](https://github.com/vuejs/vue-hackernews-2.0/commit/565b948919eb58f22a32afca7e321b490cb3b074)]

2. `package.json` で `vue` を 3.1 に更新し、同じバージョンの `@vue/compat` をインストールし、もし `vue-template-compiler` が存在すれば `@vue/compiler-sfc` で置き換えます:

   ```diff
   "dependencies": {
   -  "vue": "^2.6.12",
   +  "vue": "^3.1.0",
   +  "@vue/compat": "^3.1.0"
      ...
   },
   "devDependencies": {
   -  "vue-template-compiler": "^2.6.12"
   +  "@vue/compiler-sfc": "^3.1.0"
   }
   ```

   [コミットの例](https://github.com/vuejs/vue-hackernews-2.0/commit/14f6f1879b43f8610add60342661bf915f5c4b20)

3. ビルド設定で `vue` を `@vue/compat` にエイリアスし、Vue コンパイラーオプションで互換モードを有効にします。

   **設定の例**

   <details>
     <summary><b>vue-cli</b></summary>

   ```js
   // vue.config.js
   module.exports = {
     chainWebpack: (config) => {
       config.resolve.alias.set('vue', '@vue/compat')

       config.module
         .rule('vue')
         .use('vue-loader')
         .tap((options) => {
           return {
             ...options,
             compilerOptions: {
               compatConfig: {
                 MODE: 2
               }
             }
           }
         })
     }
   }
   ```

   </details>

   <details>
     <summary><b>Plain webpack</b></summary>

   ```js
   // webpack.config.js
   module.exports = {
     resolve: {
       alias: {
         vue: '@vue/compat'
       }
     },
     module: {
       rules: [
         {
           test: /\.vue$/,
           loader: 'vue-loader',
           options: {
             compilerOptions: {
               compatConfig: {
                 MODE: 2
               }
             }
           }
         }
       ]
     }
   }
   ```

   </details>

   <details>
     <summary><b>Vite</b></summary>

   ```js
   // vite.config.js
   export default {
     resolve: {
       alias: {
         vue: '@vue/compat'
       }
     },
     plugins: [
       vue({
         template: {
           compilerOptions: {
             compatConfig: {
               MODE: 2
             }
           }
         }
       })
     ]
   }
   ```

   </details>

4. TypeScript を使用している場合は、以下のように `*.d.ts` ファイルを追加して、（Vue 3 では存在しなくなった）デフォルトエクスポートを公開するよう `vue` の型付けを変更する必要があります:

   ```ts
   declare module 'vue' {
     import { CompatVue } from '@vue/runtime-dom'
     const Vue: CompatVue
     export default Vue
     export * from '@vue/runtime-dom'
     const { configureCompat } = Vue
     export { configureCompat }
   }
   ```

5. この時点で、アプリケーションはいくつかのコンパイル時のエラーや警告（例: フィルタの使用）に遭遇するかもしれません。まずそれらを修正します。すべてのコンパイラーの警告が消えたら、コンパイラーを Vue 3 モードに設定することもできます。

   [コミットの例](https://github.com/vuejs/vue-hackernews-2.0/commit/b05d9555f6e115dea7016d7e5a1a80e8f825be52)

6. エラーの修正後、上記の[制限](#known-limitations)に該当しなければ、アプリは実行できるはずです。

   コマンドラインとブラウザのコンソールの両方から、多くの警告が表示されるでしょう。ここでは、一般的なヒントをいくつか紹介します:

   - ブラウザコンソールで特定の警告をフィルタリングできます。フィルターを使い、一度に 1 つの項目を修正するのがよいでしょう。また、`-GLOBAL_MOUNT` のような否定的なフィルターも使用できます。

   - [互換性の設定](#compat-configuration)を使って、特定の非推奨を抑制できます。

   - 一部の警告は、使用している依存関係（例: `vue-router`）が原因となっている場合があります。これは、警告のコンポーネントトレースやスタックトレース（クリックすると展開されます）から確認できます。まずは自分のソースコードに起因する警告を修正することに専念してください。

   - `vue-router` を使用している場合、`<transition>` と `<keep-alive>` は `vue-router` v4 にアップグレードするまで `<router-view>` で動作しないので注意してください。

7. [`<transition>` のクラス名](./breaking-changes/transition.html)を更新します。これは実行時の警告がない唯一の機能です。`.*-enter` と `.*-leave` の CSS クラス名をプロジェクト全体で検索できます。

   [コミットの例](https://github.com/vuejs/vue-hackernews-2.0/commit/d300103ba622ae26ac26a82cd688e0f70b6c1d8f)

8. [新しいグローバルマウント API](./breaking-changes/global-api.html#a-new-global-api-createapp) を使用するようにアプリのエントリーを更新します。

   [コミットの例](https://github.com/vuejs/vue-hackernews-2.0/commit/a6e0c9ac7b1f4131908a4b1e43641f608593f714)

9. [`vuex` を v4 にアップグレード](https://vuex.vuejs.org/guide/migrating-to-4-0-from-3-x.html)します。

   [コミットの例](https://github.com/vuejs/vue-hackernews-2.0/commit/5bfd4c61ee50f358cd5daebaa584f2c3f91e0205)

10. [`vue-router` を v4 にアップグレード](https://router.vuejs.org/index.html)します。`vuex-router-sync` も使っている場合は、ストアゲッターに置き換えることができます。

    アップグレード後、`<transition>` と `<keep-alive>` を `<router-view>` で使用するには、新しい[スコープ付きスロットベースの構文](https://router.vuejs.org/guide/migration/#router-view-keep-alive-and-transition)を使用する必要があります。

    [コミットの例](https://github.com/vuejs/vue-hackernews-2.0/commit/758961e73ac4089890079d4ce14996741cf9344b)

11. 個々の警告を取り除きます。一部の機能では、Vue 2 と Vue 3 との間で矛盾する動作があることに注意してください - 例えば、レンダー関数 API または関数型コンポーネントと非同期コンポーネントの変更などです。アプリケーションの残りの部分に影響を与えずに Vue 3 の API へ移行するには、[`compatConfig` オプション](#per-component-config)を使用してコンポーネントごとに Vue 3 の動作にオプトインできます。

    [コミットの例](https://github.com/vuejs/vue-hackernews-2.0/commit/d0c7d3ae789be71b8fd56ce79cb4cb1f921f893b)

12. すべての警告が修正されたら、移行ビルドを削除して Vue 3 に正しく切り替えることができます。ただし、Vue 2 の動作に依存する依存関係が残っている場合は、切り替えができない可能性があることに注意してください。

    [コミットの例](https://github.com/vuejs/vue-hackernews-2.0/commit/9beb45490bc5f938c9e87b4ac1357cfb799565bd)

## 互換性の設定 {#compat-configuration}

### グローバル設定

互換機能は個別に無効化できます:

```js
import { configureCompat } from 'vue'

// 特定の機能の互換性を無効化
configureCompat({
  FEATURE_ID_A: false,
  FEATURE_ID_B: false
})
```

または、特定の互換機能のみを有効化し、アプリケーション全体はデフォルトで Vue 3 の動作にできます:

```js
import { configureCompat } from 'vue'

// デフォルトですべてを Vue 3 の動作にして、特定の機能の
// 互換性のみを有効化
configureCompat({
  MODE: 3,
  FEATURE_ID_A: true,
  FEATURE_ID_B: true
})
```

### コンポーネントごとの設定

コンポーネントで `compatConfig` オプションを使用できます。このオプションはグローバルの `configureCompat` メソッドと同じオプションを受け付けます:

```js
export default {
  compatConfig: {
    MODE: 3, // このコンポーネントのみ Vue 3 の動作にオプトイン
    FEATURE_ID_A: true // 機能はコンポーネントレベルでも切り替え可能
  }
  // ...
}
```

### コンパイラー固有の設定

`COMPILER_` で始まる機能は、コンパイラー固有のものです。フルビルド（ブラウザ内コンパイラーつき）を使用している場合、実行時に設定できます。ただしビルドセットアップを使用している場合は、代わりにビルド設定の `compilerOptions` を使用して設定する必要があります（上記の設定例を参照）。

## 機能リファレンス

### 互換性の種類

- ✔ 完全に互換
- ◐ 部分的な互換性（注意事項あり）
- ⨂ 互換性なし（警告のみ）
- ⭘ 互換性のみ（警告なし）

### 互換性なし

> 事前に修正すべきで、そうしないとエラーが発生する可能性が高いです

| ID                                    | Type | Description                                                             | Docs                                                                                       |
| ------------------------------------- | ---- | ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| GLOBAL_MOUNT_CONTAINER                | ⨂    | マウントされたアプリケーションは、そこにマウントされている要素を置き換えません        | [link](./breaking-changes/mount-changes.html)                                               |
| CONFIG_DEVTOOLS                       | ⨂    | production devtools はビルド時のフラグになりました                            | [link](https://github.com/vuejs/core/tree/master/packages/vue#bundler-build-feature-flags) |
| COMPILER_V_IF_V_FOR_PRECEDENCE        | ⨂    | 同じ要素で使用した場合の `v-if` と `v-for` の優先順位は変更されました | [link](./breaking-changes/v-if-v-for.html)                                                  |
| COMPILER_V_IF_SAME_KEY                | ⨂    | `v-if` のブランチは同じキーを持つことができなくなりました                         | [link](./breaking-changes/key-attribute.html#on-conditional-branches)                       |
| COMPILER_V_FOR_TEMPLATE_KEY_PLACEMENT | ⨂    | `<template v-for>` のキーは `<template>` に配置するようになりました            | [link](./breaking-changes/key-attribute.html#with-template-v-for)                           |
| COMPILER_SFC_FUNCTIONAL               | ⨂    | `<template functional>` は SFC でサポートされなくなりました                  | [link](./breaking-changes/functional-components.html#single-file-components-sfcs)           |

### 部分的な互換性（注意事項あり）

| ID                       | Type | Description                                                                                                                                                                                | Docs                                                                                                           |
| ------------------------ | ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------- |
| CONFIG_IGNORED_ELEMENTS  | ◐    | `config.ignoredElements` は `config.compilerOptions.isCustomElement` になりました（ブラウザコンパイラビルドのみ）。ビルドセットアップを使用している場合、`isCustomElement` はビルド設定で渡す必要があります。 | [link](./breaking-changes/global-api.html#config-ignoredelements-is-now-config-compileroptions-iscustomelement) |
| COMPILER_INLINE_TEMPLATE | ◐    | `inline-template` は削除されました（ブラウザコンパイラビルドでのみ互換性がサポートされます）                                                                                                                | [link](./breaking-changes/inline-template-attribute.html)                                                       |
| PROPS_DEFAULT_THIS       | ◐    | props の default ファクトリーは `this` にアクセスできなくなりました（互換モードでは、`this` は実際のインスタンスではありません - props, `$options` とインジェクションだけを公開します）                                   | [link](./breaking-changes/props-default-this.html)                                                              |
| INSTANCE_DESTROY         | ◐    | インスタンスメソッド `$destroy` は削除されました（互換モードではルートインスタンスでのみサポート）                                                                                                       |                                                                                                                |
| GLOBAL_PRIVATE_UTIL      | ◐    | `Vue.util` は非公開になり利用できなくなりました                                                                                                                                              |                                                                                                                |
| CONFIG_PRODUCTION_TIP    | ◐    | `config.productionTip` は不要になりました                                                                                                                                                 | [link](./breaking-changes/global-api.html#config-productiontip-removed)                                         |
| CONFIG_SILENT            | ◐    | `config.silent` は削除されました                                                                                                                                                                    |                                                                                                                |

###  互換性のみ（警告なし）

| ID                 | Type | Description                            | Docs                                      |
| ------------------ | ---- | -------------------------------------- | ----------------------------------------- |
| TRANSITION_CLASSES | ⭘    | トランジションの enter/leave クラスの変更 | [link](./breaking-changes/transition.html) |

### 完全に互換

| ID                           | Type | Description                                                           | Docs                                                                                        |
| ---------------------------- | ---- | --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| GLOBAL_MOUNT                 | ✔    | new Vue() -> createApp                                                | [link](./breaking-changes/global-api.html#mounting-app-instance)                             |
| GLOBAL_EXTEND                | ✔    | Vue.extend は削除されました（`defineComponent` か `extends` オプションを使用してください）        | [link](./breaking-changes/global-api.html#vue-extend-removed)                                |
| GLOBAL_PROTOTYPE             | ✔    | `Vue.prototype` -> `app.config.globalProperties`                      | [link](./breaking-changes/global-api.html#vue-prototype-replaced-by-config-globalproperties) |
| GLOBAL_SET                   | ✔    | `Vue.set` は削除されました（不要になりました）                                  |                                                                                             |
| GLOBAL_DELETE                | ✔    | `Vue.delete` は削除されました（不要になりました）                               |                                                                                             |
| GLOBAL_OBSERVABLE            | ✔    | `Vue.observable` は削除されました（`reactive` を使用してください）                             | [link](https://ja.vuejs.org/api/reactivity-core.html#reactive)                                 |
| CONFIG_KEY_CODES             | ✔    | config.keyCodes は削除されました                                               | [link](./breaking-changes/keycode-modifiers.html)                                            |
| CONFIG_WHITESPACE            | ✔    | Vue 3 では空白のデフォルトは `"condense"` です                          |                                                                                             |
| INSTANCE_SET                 | ✔    | `vm.$set` は削除されました（不要になりました）                                  |                                                                                             |
| INSTANCE_DELETE              | ✔    | `vm.$delete` は削除されました（不要になりました）                               |                                                                                             |
| INSTANCE_EVENT_EMITTER       | ✔    | `vm.$on`, `vm.$off`, `vm.$once` は削除されました                               | [link](./breaking-changes/events-api.html)                                                   |
| INSTANCE_EVENT_HOOKS         | ✔    | インスタンスは `hook:x` イベントを発行しなくなりました                              | [link](./breaking-changes/vnode-lifecycle-events.html)                                       |
| INSTANCE_CHILDREN            | ✔    | `vm.$children` は削除されました                                                | [link](./breaking-changes/children.html)                                                     |
| INSTANCE_LISTENERS           | ✔    | `vm.$listeners` は削除されました                                               | [link](./breaking-changes/listeners-removed.html)                                            |
| INSTANCE_SCOPED_SLOTS        | ✔    | `vm.$scopedSlots` は削除されました。`vm.$slots` は関数を公開するようになりました          | [link](./breaking-changes/slots-unification.html)                                            |
| INSTANCE_ATTRS_CLASS_STYLE   | ✔    | `$attrs` に `class` と `style` が含まれるようになりました                             | [link](./breaking-changes/attrs-includes-class-style.html)                                   |
| OPTIONS_DATA_FN              | ✔    | `data` はどんな場合でも関数にする必要があります                                | [link](./breaking-changes/data-option.html)                                                  |
| OPTIONS_DATA_MERGE           | ✔    | mixins や extends からの `data` は浅いマージになりました                  | [link](./breaking-changes/data-option.html)                                                  |
| OPTIONS_BEFORE_DESTROY       | ✔    | `beforeDestroy` -> `beforeUnmount`                                    |                                                                                             |
| OPTIONS_DESTROYED            | ✔    | `destroyed` -> `unmounted`                                            |                                                                                             |
| WATCH_ARRAY                  | ✔    | 配列の監視をする際、deep でなければ配列の変更でトリガーされなくなりました          | [link](./breaking-changes/watch.html)                                                        |
| V_ON_KEYCODE_MODIFIER        | ✔    | `v-on` は keyCode 修飾子をサポートしなくなりました                           | [link](./breaking-changes/keycode-modifiers.html)                                            |
| CUSTOM_DIR                   | ✔    | カスタムディレクティブのフック名が変更されました                                   | [link](./breaking-changes/custom-directives.html)                                            |
| ATTR_FALSE_VALUE             | ✔    | バインドしている値が `false` でも、属性は削除されなくなりました       | [link](./breaking-changes/attribute-coercion.html)                                           |
| ATTR_ENUMERATED_COERCION     | ✔    | 列挙型属性の特殊ケースは廃止                          | [link](./breaking-changes/attribute-coercion.html)                                           |
| TRANSITION_GROUP_ROOT        | ✔    | `<transition-group>` はデフォルトではルート要素をレンダリングしなくなりました      | [link](./breaking-changes/transition-group.html)                                             |
| COMPONENT_ASYNC              | ✔    | 非同期コンポーネントの API 変更（`defineAsyncComponent` が必要になりました）     | [link](./breaking-changes/async-components.html)                                             |
| COMPONENT_FUNCTIONAL         | ✔    | 関数型コンポーネントの API 変更（普通の関数にする必要があります）        | [link](./breaking-changes/functional-components.html)                                        |
| COMPONENT_V_MODEL            | ✔    | コンポーネントの v-model 改訂                                            | [link](./breaking-changes/v-model.html)                                                      |
| RENDER_FUNCTION              | ✔    | レンダー関数の API 変更                                           | [link](./breaking-changes/render-function-api.html)                                          |
| FILTERS                      | ✔    | フィルターは削除されました（このオプションは実行時のフィルター API のみに影響）        | [link](./breaking-changes/filters.html)                                                      |
| COMPILER_IS_ON_ELEMENT       | ✔    | `is` の使用は `<component>` のみに制限されました                    | [link](./breaking-changes/custom-elements-interop.html)                                      |
| COMPILER_V_BIND_SYNC         | ✔    | `v-bind.sync` は引数つきの `v-model` に置き換わりました                    | [link](./breaking-changes/v-model.html)                                                      |
| COMPILER_V_BIND_PROP         | ✔    | `v-bind.prop` 修飾子は削除されました                                        |                                                                                             |
| COMPILER_V_BIND_OBJECT_ORDER | ✔    | `v-bind="object"` は順序に依存するようになりました                              | [link](./breaking-changes/v-bind.html)                                                       |
| COMPILER_V_ON_NATIVE         | ✔    | `v-on.native` 修飾子は削除されました                                        | [link](./breaking-changes/v-on-native-modifier-removed.html)                                 |
| COMPILER_V_FOR_REF           | ✔    | `v-for` 内の `ref`（コンパイラーサポート）                                   |                                                                                             |
| COMPILER_NATIVE_TEMPLATE     | ✔    | 特別なディレクティブなしの `<template>` は、ネイティブ要素としてレンダリングされるようになりました |                                                                                             |
| COMPILER_FILTERS             | ✔    | フィルター（コンパイラーサポート）                                            |                                                                                             |
