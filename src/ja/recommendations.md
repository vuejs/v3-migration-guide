# フレームワークレベルでの新しい推奨事項

Vue 3 をサポートするライブラリーが大幅に更新されました。新しいデフォルトの推奨ライブラリーの概要は以下のとおりです:

- Vue 3 をサポートした Router, Devtools, test utils の新バージョン
- ビルドツールチェーン: Vue CLI -> [Vite](https://ja.vitejs.dev//)
- 状態管理: Vuex -> [Pinia](https://pinia.vuejs.org/)
- IDE サポート: Vetur -> [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)
- 新しいコマンドライン TypeScript サポート: [vue-tsc](https://github.com/johnsoncodehk/volar/tree/master/vue-language-tools/vue-tsc)
- SSG: VuePress -> [VitePress](https://vitepress.vuejs.org/)
- JSX: `@vue/babel-preset-jsx` -> [`@vue/babel-plugin-jsx`](https://github.com/vuejs/jsx-next)

## 詳細

### ビルドツールチェーン

Vue 3 プロジェクトの新しいビルドツールチェーンとして、[Vite](https://ja.vitejs.dev/) を推奨することになりました。Vite は、非常に高速なサーバー起動とホットアップデートのパフォーマンスを提供する新しいビルドツールです。元々は Vue チームによって作られたものですが、現在はクロスフレームワークのツールとなっています。詳細は [Vite を推奨する理由](https://ja.vitejs.dev/guide/why.html)をご覧ください。

新しいスキャフォールディングツールである [`create-vue`](https://github.com/vuejs/create-vue) を使って、Vite を搭載した新しい Vue 3 プロジェクトを作成できます:

```sh
npm init vue@3
```

Vue CLI も Vue 3 をサポートするようアップグレードされましたが、現在はメンテナンス中であり、新しいプロジェクトには推奨されなくなりました。Vue CLI から Vite への移行に関する情報はこちら:

- [VueSchool.io による Vue CLI -> Vite の移行ガイド](https://vueschool.io/articles/vuejs-tutorials/how-to-migrate-from-vue-cli-to-vite/)
- [自動移行に役立つツールやプラグイン](https://github.com/vitejs/awesome-vite#vue-cli)

[新しいドキュメントのツールガイドの章](https://ja.vuejs.org/guide/scaling-up/tooling.html)も参照してください。

### Vue Router

Vue Router 4.0 は Vue 3 のサポートを提供し、多くの破壊的変更があります。詳細については、その[移行ガイド](https://router.vuejs.org/guide/migration/index.html)を確認してください。

- [ドキュメント](https://router.vuejs.org/)
- [GitHub](https://github.com/vuejs/router)
- [RFC](https://github.com/vuejs/rfcs/pulls?q=is%3Apr+is%3Amerged+label%3Arouter)

### 状態管理

[Pinia](https://pinia.vuejs.org/) は、新しく推奨される大規模な状態管理ソリューションです。Pinia は Vuex 5 のプロトタイプとして作成されましたが、現在では Vuex 5 で計画していたものの事実上の実装に発展しています。コアチームのメンバーである [Eduardo](https://github.com/posva) による作業量に敬意を表して、元の名前を残すことにしました。

- [ドキュメント](https://pinia.vuejs.org/)
- [GitHub](https://github.com/vuejs/pinia)
- [新しいドキュメントの状態管理の章](https://ja.vuejs.org/guide/scaling-up/state-management.html)

Vuex 4.0 は、3.x とほぼ同じ API で Vue 3 もサポートしており、既存の Vuex ストアを Vue 3 に移行する必要がある場合に利用できます。唯一の破壊的変更は、[プラグインのインストール方法](https://vuex.vuejs.org/guide/migrating-to-4-0-from-3-x.html#breaking-changes)です。

### IDE サポート

[Volar](https://github.com/johnsoncodehk/volar) は、テンプレート式の完全な型推論を含む、Vue SFC の TypeScript サポートが大幅に改善された、新しい公式 VSCode 拡張になりました。

Volar との競合を避けるため、Vetur をインストールしている場合は必ず無効にしてください。

### Devtools 拡張機能

Devtools 拡張機能は、Vue 2 と Vue 3 の両方をサポートするためのメジャーアップデート（v6 としてリリース）がありました。以前にベータチャンネル経由で v6 をインストールした場合は、それを削除して、安定版チャンネルから拡張機能をインストールできます。

- [ドキュメント](https://devtools.vuejs.org/guide/installation.html)
- [GitHub](https://github.com/vuejs/devtools)

### TypeScript のサポート

[vue-tsc](https://github.com/johnsoncodehk/volar/tree/master/vue-language-tools/vue-tsc) を使って、コマンドラインから Vue SFC の型チェックと定義ファイルの生成ができるようになりました。

[新しいドキュメントの TypeScript ガイド](https://ja.vuejs.org/guide/typescript/overview.html)も参照してください。

### 静的サイトジェネレーター

[VitePress](https://vitepress.vuejs.org/) は、VuePress の精神的後継で、Vue 3 + Vite で構築されています。はるかに優れた開発体験を提供し、より高速なサイトを作成できます。

### JSX

[`@vue/babel-plugin-jsx`](https://github.com/vuejs/babel-plugin-jsx) によって Vue 3 の JSX サポートが提供されるようになりました。
