
export default {
  vitepressConfig: {
    title: 'Vue 3 迁移指南',
    description: '从Vue 2迁移到Vue 3的指南',
    lang: 'zh-CN',
    base: '/zh/',
  },
  themeConfig: {
    docFooter: {
      prev: '上一页',
      next: '下一页',
    },
    nav: [
      { text: 'Vue 3 文档', link: 'https://cn.vuejs.org' },
    ],
    sidebar: [
      {
        text: '指南',
        items: [
          { text: '概览', link: '/zh/' },
          { text: '新的推荐', link: '/zh/recommendations' },
          { text: '迁移构建', link: '/zh/migration-build' },
          {
            text: '破坏性改变',
            link: '/zh/breaking-changes/'
          }
        ]
      },
      {
        text: '全局 API',
        items: [
          {
            text: '全局 API 应用实例',
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
            text: 'key 使用改变',
            link: '/zh/breaking-changes/key-attribute'
          },
          {
            text: 'v-if 与 v-for 优先级',
            link: '/zh/breaking-changes/v-if-v-for'
          },
          { text: 'v-bind 合并行为', link: '/zh/breaking-changes/v-bind' },
          {
            text: 'v-on.native 移除',
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
            text: '$listeners 合并到 $attrs',
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
            text: '与自定义标签的互操作性',
            link: '/zh/breaking-changes/custom-elements-interop'
          }
        ]
      },
      {
        text: '移除的 APIs',
        items: [
          {
            text: '按键修饰符',
            link: '/zh/breaking-changes/keycode-modifiers'
          },
          { text: '事件 API', link: '/zh/breaking-changes/events-api' },
          { text: '过滤器', link: '/zh/breaking-changes/filters' },
          {
            text: '内联模板',
            link: '/zh/breaking-changes/inline-template-attribute'
          },
          { text: '$children', link: '/zh/breaking-changes/children' },
          { text: 'propsData 选项', link: '/zh/breaking-changes/props-data' }
        ]
      },
      {
        text: '其他一些小的变化',
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
            text: 'Mount API 的改变',
            link: '/zh/breaking-changes/mount-changes'
          },
          {
            text: 'Props 的默认函数访问 this',
            link: '/zh/breaking-changes/props-default-this'
          },
          {
            text: 'Transition class 名更改 ',
            link: '/zh/breaking-changes/transition'
          },
          {
            text: 'Transition 作为根节点',
            link: '/zh/breaking-changes/transition-as-root'
          },
          {
            text: 'TransitionGroup 根元素',
            link: '/zh/breaking-changes/transition-group'
          },
          {
            text: 'VNode 声明周期事件',
            link: '/zh/breaking-changes/vnode-lifecycle-events'
          },
          { text: 'Watch 侦听数组', link: '/zh/breaking-changes/watch' }
        ]
      }
    ]
  }
}