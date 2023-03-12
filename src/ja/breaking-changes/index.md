# 破壊的変更

このページでは、Vue 2 から Vue 3 の破壊的変更をすべてリストアップしています。

たくさん変わったように見えますが、Vue について皆さんが知っていることや気に入っていることの多くは変わりません。しかしできる限り徹底して、ドキュメント化されたすべての変更について詳細な説明と例を提供したいと考えました。

## 詳細

### グローバル API

- [グローバル Vue API はアプリケーションインスタンスを使用するように変更されました](./global-api.html)
- [グローバル API と内部 API が再構築され、ツリーシェイキングが可能になりました](./global-api-treeshaking.html)

### テンプレートディレクティブ

- [コンポーネントでの `v-model` の使用方法が見直され、`v-bind.sync` を置き換えます](./v-model.html)
- [`<template v-for>` や `v-for` でないノードでの `key` の使い方が変更されました](./key-attribute.html)
- [`v-if` と `v-for` を同じ要素で使用した場合の優先順位が変更されました](./v-if-v-for.html)
- [`v-bind="object"` は順序に依存するようになりました](./v-bind.html)
- [`v-on:event.native` 修飾子は削除されました](./v-on-native-modifier-removed.md)

### コンポーネント

- [関数型コンポーネントは普通の関数のみで作成できます](./functional-components.html)
- [単一ファイルコンポーネント（SFC）での `<template>` の `functional` 属性と、コンポーネントオプションの `functional` は非推奨です](./functional-components.html)
- [非同期コンポーネントを作成するには `defineAsyncComponent` メソッドが必要になりました](./async-components.html)
- [コンポーネントイベントは `emits` オプションで宣言する必要があります](./emits-option.md)

### レンダー関数

- [レンダー関数の API が変更されました](./render-function-api.html)
- [`$scopedSlots` プロパティーは削除され、すべてのスロットが `$slots` で関数として公開されます](./slots-unification.html)
- [`$listeners` は削除され、`$attrs` に統合されました](./listeners-removed)
- [`$attrs` には `class` と `style` 属性が含まれるようになりました](./attrs-includes-class-style.md)

### カスタム要素

- [テンプレートのコンパイル時に、カスタム要素のチェックが行われるようになりました](./custom-elements-interop.html)
- [特別な `is` 属性の使用は、予約済みである `<component>` タグのみに制限されます](./custom-elements-interop.html#customized-built-in-elements)

### その他の小さな変更

- ライフサイクルの `destroyed` オプションは `unmounted` に名称変更されました
- ライフサイクルの `beforeDestroy` オプションは `beforeUnmount` に名称変更されました
- [props の `default` ファクトリー関数は `this` コンテキストにアクセスできなくなりました](./props-default-this.html)
- [カスタムディレクティブ API は、コンポーネントのライフサイクルに合わせて変更され、`binding.expression` は削除されました](./custom-directives.html)
- [`data` オプションは、常に関数として宣言する必要があります](./data-option.html)
- [mixins の `data` オプションは浅くマージされるようになりました](./data-option.html#mixin-merge-behavior-change)
- [属性の型強制戦略が変更されました](./attribute-coercion.html)
- [一部のトランジションクラス名が変更されました](./transition.html)
- [`<TransitionGroup>` はデフォルトでラッパー要素をレンダリングしないようになりました](./transition-group.html)
- [配列を監視している場合、コールバックは配列が置換されたときにのみトリガーされます。変更時にトリガーする必要がある場合は、`deep` オプションを指定する必要があります。](./watch.html)
- 特別なディレクティブ（`v-if/else-if/else`, `v-for`, `v-slot`）を持たない `<template>` タグはプレーンな要素として扱われ、その内部コンテンツをレンダリングする代わりに、ネイティブの `<template>` 要素が生成されるようになりました。
- [マウントされたアプリケーションは、そこにマウントされている要素を置き換えません](./mount-changes.html)
- [ライフサイクルの `hook:` イベントプレフィックスが `vnode-` に変更されました](./vnode-lifecycle-events.html)

### 削除された API

- [`v-on` 修飾子としての `keyCode` サポート](./keycode-modifiers.html)
- [$on, $off, \$once インスタンスメソッド](./events-api.html)
- [フィルター](./filters.html)
- [インラインテンプレート属性](./inline-template-attribute.html)
- [`$children` インスタンスプロパティー](./children.html)
- [`propsData` オプション](./props-data.html)
- `$destroy` インスタンスメソッド。ユーザーは、個々の Vue コンポーネントのライフサイクルを手動で管理する必要がなくなりました。
- グローバル関数の `set` と `delete`、インスタンスメソッドの `$set` と `$delete` は削除されました。プロキシベースの変更検出では不要になりました。
