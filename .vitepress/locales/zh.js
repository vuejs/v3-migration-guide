export default {
  vitepressConfig: {
    title: 'Vue 3 迁移指南',
    lang: 'zh-CN',
    description: 'Guide on migrating from Vue 2 to Vue 3',
  },
  themeConfig: {
    localeLinks: {
      text: '简体中文',
      items: [
        { text: 'English', link: '/' },
      ]
    },

    nav: [
      { text: '指南', link: '/zh/' },
      {
        text: '相关链接',
        items: [
          {
            text: 'Vue 3 文档',
            link: 'https://vuejs.org',
          }
        ]
      }
    ],

    sidebar: [
      {
        text: '指南',
        items: [
          { text: '概览', link: '/zh/' },
          { text: '建议', link: '/zh/recommendations' },
          { text: '用于迁移的构建版本', link: '/zh/migration-build' },
          {
            text: '非兼容的变更',
            link: '/zh/breaking-changes/'
          }
        ]
      },
      {
        text: '全局 API',
        items: [
          {
            text: '全局 API',
            link: '/zh/breaking-changes/global-api'
          },
          {
            text: '全局 API Treeshaking',
            link: '/zh/breaking-changes/global-api-treeshaking'
          }
        ]
      },
      {
        text: '模板指令',
        items: [
          { text: 'v-model', link: '/zh/breaking-changes/v-model' },
          {
            text: 'key 用法改变',
            link: '/zh/breaking-changes/key-attribute'
          },
          {
            text: 'v-if 与 v-for 的优先级对比',
            link: '/zh/breaking-changes/v-if-v-for'
          },
          { text: 'v-bind 合并行为', link: '/zh/breaking-changes/v-bind' },
          {
            text: '移除 v-on.native 修饰符',
            link: '/zh/breaking-changes/v-on-native-modifier-removed'
          }
        ]
      },
      {
        text: '组件',
        items: [
          {
            text: '函数式组件',
            link: '/zh/breaking-changes/functional-components'
          },
          {
            text: '异步组件',
            link: '/zh/breaking-changes/async-components'
          },
          { text: 'emits 选项', link: '/zh/breaking-changes/emits-option' }
        ]
      },
      {
        text: '渲染函数',
        items: [
          {
            text: '渲染函数 API',
            link: '/zh/breaking-changes/render-function-api'
          },
          {
            text: '插槽统一',
            link: '/zh/breaking-changes/slots-unification'
          },
          {
            text: '$listeners 合并入 $attrs',
            link: '/zh/breaking-changes/listeners-removed'
          },
          {
            text: '$attrs 包含 class & style',
            link: '/zh/breaking-changes/attrs-includes-class-style'
          }
        ]
      },
      {
        text: '自定义元素',
        items: [
          {
            text: '与自定义元素的互操作性',
            link: '/zh/breaking-changes/custom-elements-interop'
          }
        ]
      },
      {
        text: '移除的 API',
        items: [
          {
            text: 'v-on 按键修饰符',
            link: '/zh/breaking-changes/keycode-modifiers'
          },
          { text: '事件 API', link: '/zh/breaking-changes/events-api' },
          { text: 'Filters', link: '/zh/breaking-changes/filters' },
          {
            text: '内联模板',
            link: '/zh/breaking-changes/inline-template-attribute'
          },
          { text: '$children', link: '/zh/breaking-changes/children' },
          { text: 'propsData 选项', link: '/zh/breaking-changes/props-data' }
        ]
      },
      {
        text: '其他细微改动',
        items: [
          {
            text: 'Attribute 强制行为',
            link: '/zh/breaking-changes/attribute-coercion'
          },
          {
            text: '自定义指令',
            link: '/zh/breaking-changes/custom-directives'
          },
          { text: 'Data 选项', link: '/zh/breaking-changes/data-option' },
          {
            text: '挂载 API 变化',
            link: '/zh/breaking-changes/mount-changes'
          },
          {
            text: '在 prop 的默认函数中访问 this',
            link: '/zh/breaking-changes/props-default-this'
          },
          {
            text: '过渡的 class 名更改',
            link: '/zh/breaking-changes/transition'
          },
          {
            text: 'Transition 作为根节点',
            link: '/zh/breaking-changes/transition-as-root'
          },
          {
            text: 'Transition Group 根元素',
            link: '/zh/breaking-changes/transition-group'
          },
          {
            text: 'VNode 生命周期事件',
            link: '/zh/breaking-changes/vnode-lifecycle-events'
          },
          { text: '侦听数组', link: '/zh/breaking-changes/watch' }
        ]
      }
    ]
  }
}
