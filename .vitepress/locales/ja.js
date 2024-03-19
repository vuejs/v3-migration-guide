export default {
  title: 'Vue 3 移行ガイド',
  description: 'Vue 2 から Vue 3 への移行に関するガイド',
  lang: 'ja-JP',
  themeConfig: {
    docFooter: {
      prev: '前のページ',
      next: '次のページ',
    },
    outlineTitle: 'ページの内容',
    nav: [
      { text: 'Vue 3 ドキュメント', link: 'https://ja.vuejs.org' },
    ],

    sidebar: [
      {
        text: 'ガイド',
        items: [
          { text: '概要', link: '/ja/' },
          { text: '新しい推奨事項', link: '/ja/recommendations' },
          { text: '移行ビルド', link: '/ja/migration-build' },
          {
            text: '破壊的変更',
            link: '/ja/breaking-changes/'
          }
        ]
      },
      {
        text: 'グローバル API',
        items: [
          {
            text: 'グローバル API アプリケーションインスタンス',
            link: '/ja/breaking-changes/global-api'
          },
          {
            text: 'グローバル API ツリーシェイキング',
            link: '/ja/breaking-changes/global-api-treeshaking'
          }
        ]
      },
      {
        text: 'テンプレートディレクティブ',
        items: [
          { text: 'v-model', link: '/ja/breaking-changes/v-model' },
          {
            text: 'key の使用方法の変更',
            link: '/ja/breaking-changes/key-attribute'
          },
          {
            text: 'v-if と v-for の優先順位',
            link: '/ja/breaking-changes/v-if-v-for'
          },
          { text: 'v-bind のマージ動作', link: '/ja/breaking-changes/v-bind' },
          {
            text: 'v-on.native 修飾子の削除',
            link: '/ja/breaking-changes/v-on-native-modifier-removed'
          }
        ]
      },
      {
        text: 'コンポーネント',
        items: [
          {
            text: '関数型コンポーネント',
            link: '/ja/breaking-changes/functional-components'
          },
          {
            text: '非同期コンポーネント',
            link: '/ja/breaking-changes/async-components'
          },
          { text: 'emits オプション', link: '/ja/breaking-changes/emits-option' }
        ]
      },
      {
        text: 'レンダー関数',
        items: [
          {
            text: 'レンダー関数 API',
            link: '/ja/breaking-changes/render-function-api'
          },
          {
            text: 'スロットの統一',
            link: '/ja/breaking-changes/slots-unification'
          },
          {
            text: '$listeners は $attrs に合併',
            link: '/ja/breaking-changes/listeners-removed'
          },
          {
            text: '$attrs が class と style を包含',
            link: '/ja/breaking-changes/attrs-includes-class-style'
          }
        ]
      },
      {
        text: 'カスタム要素',
        items: [
          {
            text: 'カスタム要素の相互運用性の変更',
            link: '/ja/breaking-changes/custom-elements-interop'
          }
        ]
      },
      {
        text: '削除された API',
        items: [
          {
            text: 'v-on の keyCode 修飾子',
            link: '/ja/breaking-changes/keycode-modifiers'
          },
          { text: 'イベント API', link: '/ja/breaking-changes/events-api' },
          { text: 'フィルター', link: '/ja/breaking-changes/filters' },
          {
            text: 'インラインテンプレート',
            link: '/ja/breaking-changes/inline-template-attribute'
          },
          { text: '$children', link: '/ja/breaking-changes/children' },
          { text: 'propsData オプション', link: '/ja/breaking-changes/props-data' }
        ]
      },
      {
        text: 'その他の細かい変更',
        items: [
          {
            text: '属性の強制変換',
            link: '/ja/breaking-changes/attribute-coercion'
          },
          {
            text: 'カスタムディレクティブ',
            link: '/ja/breaking-changes/custom-directives'
          },
          { text: 'data オプション', link: '/ja/breaking-changes/data-option' },
          {
            text: 'マウント API の変更',
            link: '/ja/breaking-changes/mount-changes'
          },
          {
            text: 'プロパティ default 関数の this アクセス',
            link: '/ja/breaking-changes/props-default-this'
          },
          {
            text: 'トランジションクラスの変更',
            link: '/ja/breaking-changes/transition'
          },
          {
            text: 'ルートのトランジション',
            link: '/ja/breaking-changes/transition-as-root'
          },
          {
            text: 'トランジショングループのルート要素',
            link: '/ja/breaking-changes/transition-group'
          },
          {
            text: 'VNode ライフサイクルイベント',
            link: '/ja/breaking-changes/vnode-lifecycle-events'
          },
          { text: '配列の監視', link: '/ja/breaking-changes/watch' }
        ]
      }
    ]
  }
}
