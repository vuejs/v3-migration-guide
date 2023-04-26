export default {
  vitepressConfig: {
    title: 'Vue 3 Migration Guide',
    description: 'Guide on migrating from Vue 2 to Vue 3',
    lang: 'en-US'
  },
  themeConfig: {
    nav: [
      { text: 'Vue 3 Docs', link: 'https://vuejs.org' },
    ],

    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Overview', link: '/' },
          { text: 'New Recommendations', link: '/recommendations' },
          { text: 'Migration Build', link: '/migration-build' },
          {
            text: 'Breaking Changes',
            link: '/breaking-changes/'
          }
        ]
      },
      {
        text: 'Global API',
        items: [
          {
            text: 'Global API Application Instance',
            link: '/breaking-changes/global-api'
          },
          {
            text: 'Global API Treeshaking',
            link: '/breaking-changes/global-api-treeshaking'
          }
        ]
      },
      {
        text: 'Template Directives',
        items: [
          { text: 'v-model', link: '/breaking-changes/v-model' },
          {
            text: 'key Usage Change',
            link: '/breaking-changes/key-attribute'
          },
          {
            text: 'v-if vs. v-for Precedence',
            link: '/breaking-changes/v-if-v-for'
          },
          { text: 'v-bind Merge Behavior', link: '/breaking-changes/v-bind' },
          {
            text: 'v-on.native modifier removed',
            link: '/breaking-changes/v-on-native-modifier-removed'
          }
        ]
      },
      {
        text: 'Components',
        items: [
          {
            text: 'Functional Components',
            link: '/breaking-changes/functional-components'
          },
          {
            text: 'Async Components',
            link: '/breaking-changes/async-components'
          },
          { text: 'emits Option', link: '/breaking-changes/emits-option' }
        ]
      },
      {
        text: 'Render Function',
        items: [
          {
            text: 'Render Function API',
            link: '/breaking-changes/render-function-api'
          },
          {
            text: 'Slots Unification',
            link: '/breaking-changes/slots-unification'
          },
          {
            text: '$listeners merged into $attrs',
            link: '/breaking-changes/listeners-removed'
          },
          {
            text: '$attrs includes class & style',
            link: '/breaking-changes/attrs-includes-class-style'
          }
        ]
      },
      {
        text: 'Custom Elements',
        items: [
          {
            text: 'Custom Elements Interop Changes',
            link: '/breaking-changes/custom-elements-interop'
          }
        ]
      },
      {
        text: 'Removed APIs',
        items: [
          {
            text: 'v-on keyCode Modifiers',
            link: '/breaking-changes/keycode-modifiers'
          },
          { text: 'Events API', link: '/breaking-changes/events-api' },
          { text: 'Filters', link: '/breaking-changes/filters' },
          {
            text: 'inline-template',
            link: '/breaking-changes/inline-template-attribute'
          },
          { text: '$children', link: '/breaking-changes/children' },
          { text: 'propsData option', link: '/breaking-changes/props-data' }
        ]
      },
      {
        text: 'Other Minor Changes',
        items: [
          {
            text: 'Attribute Coercion Behavior',
            link: '/breaking-changes/attribute-coercion'
          },
          {
            text: 'Custom Directives',
            link: '/breaking-changes/custom-directives'
          },
          { text: 'Data Option', link: '/breaking-changes/data-option' },
          {
            text: 'Mount API changes',
            link: '/breaking-changes/mount-changes'
          },
          {
            text: 'Props Default Function this Access',
            link: '/breaking-changes/props-default-this'
          },
          {
            text: 'Transition Class Change',
            link: '/breaking-changes/transition'
          },
          {
            text: 'Transition as Root',
            link: '/breaking-changes/transition-as-root'
          },
          {
            text: 'Transition Group Root Element',
            link: '/breaking-changes/transition-group'
          },
          {
            text: 'VNode lifecycle events',
            link: '/breaking-changes/vnode-lifecycle-events'
          },
          { text: 'Watch on Arrays', link: '/breaking-changes/watch' }
        ]
      }
    ]
  }
}