export default {
  vitepressConfig: {
    title: 'Vue 3 移行ガイド',
    description: 'Vue 2 から Vue 3 への移行に関するガイド',
    lang: 'ja-JP',
  },
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
        text: 'Guide',
        items: [
          { text: 'Overview', link: '/ja/' },
          { text: 'New Recommendations', link: '/ja/recommendations' },
          { text: 'Migration Build', link: '/ja/migration-build' },
          {
            text: 'Breaking Changes',
            link: '/ja/breaking-changes/'
          }
        ]
      },
      {
        text: 'Global API',
        items: [
          {
            text: 'Global API Application Instance',
            link: '/ja/breaking-changes/global-api'
          },
          {
            text: 'Global API Treeshaking',
            link: '/ja/breaking-changes/global-api-treeshaking'
          }
        ]
      },
      {
        text: 'Template Directives',
        items: [
          { text: 'v-model', link: '/ja/breaking-changes/v-model' },
          {
            text: 'key Usage Change',
            link: '/ja/breaking-changes/key-attribute'
          },
          {
            text: 'v-if vs. v-for Precedence',
            link: '/ja/breaking-changes/v-if-v-for'
          },
          { text: 'v-bind Merge Behavior', link: '/ja/breaking-changes/v-bind' },
          {
            text: 'v-on.native modifier removed',
            link: '/ja/breaking-changes/v-on-native-modifier-removed'
          }
        ]
      },
      {
        text: 'Components',
        items: [
          {
            text: 'Functional Components',
            link: '/ja/breaking-changes/functional-components'
          },
          {
            text: 'Async Components',
            link: '/ja/breaking-changes/async-components'
          },
          { text: 'emits Option', link: '/ja/breaking-changes/emits-option' }
        ]
      },
      {
        text: 'Render Function',
        items: [
          {
            text: 'Render Function API',
            link: '/ja/breaking-changes/render-function-api'
          },
          {
            text: 'Slots Unification',
            link: '/ja/breaking-changes/slots-unification'
          },
          {
            text: '$listeners merged into $attrs',
            link: '/ja/breaking-changes/listeners-removed'
          },
          {
            text: '$attrs includes class & style',
            link: '/ja/breaking-changes/attrs-includes-class-style'
          }
        ]
      },
      {
        text: 'Custom Elements',
        items: [
          {
            text: 'Custom Elements Interop Changes',
            link: '/ja/breaking-changes/custom-elements-interop'
          }
        ]
      },
      {
        text: 'Removed APIs',
        items: [
          {
            text: 'v-on keyCode Modifiers',
            link: '/ja/breaking-changes/keycode-modifiers'
          },
          { text: 'Events API', link: '/ja/breaking-changes/events-api' },
          { text: 'Filters', link: '/ja/breaking-changes/filters' },
          {
            text: 'inline-template',
            link: '/ja/breaking-changes/inline-template-attribute'
          },
          { text: '$children', link: '/ja/breaking-changes/children' },
          { text: 'propsData option', link: '/ja/breaking-changes/props-data' }
        ]
      },
      {
        text: 'Other Minor Changes',
        items: [
          {
            text: 'Attribute Coercion Behavior',
            link: '/ja/breaking-changes/attribute-coercion'
          },
          {
            text: 'Custom Directives',
            link: '/ja/breaking-changes/custom-directives'
          },
          { text: 'Data Option', link: '/ja/breaking-changes/data-option' },
          {
            text: 'Mount API changes',
            link: '/ja/breaking-changes/mount-changes'
          },
          {
            text: 'Props Default Function this Access',
            link: '/ja/breaking-changes/props-default-this'
          },
          {
            text: 'Transition Class Change',
            link: '/ja/breaking-changes/transition'
          },
          {
            text: 'Transition as Root',
            link: '/ja/breaking-changes/transition-as-root'
          },
          {
            text: 'Transition Group Root Element',
            link: '/ja/breaking-changes/transition-group'
          },
          {
            text: 'VNode lifecycle events',
            link: '/ja/breaking-changes/vnode-lifecycle-events'
          },
          { text: 'Watch on Arrays', link: '/ja/breaking-changes/watch' }
        ]
      }
    ]
  }
}
