export default {
  vitepressConfig: {
    title: 'Міграція з Vue 3',
    description: 'Гід з міграції з Vue 2 на Vue 3',
    lang: 'ua-UK'
  },
  themeConfig: {
    nav: [
      { text: 'Документація по Vue 3', link: 'https://ua.vuejs.org' },
    ],

    sidebar: [
      {
        text: 'Гід',
        items: [
          { text: 'Огляд', link: '/' },
          { text: 'Нові рекомендації', link: '/recommendations' },
          { text: 'Міграційна збірка', link: '/migration-build' },
          {
            text: 'Несумісні зміни',
            link: '/breaking-changes/'
          }
        ]
      },
      {
        text: 'Глобальний API',
        items: [
          {
            text: 'Екземпляр програми глобального API',
            link: '/breaking-changes/global-api'
          },
          {
            text: 'Treeshaking глобального API ',
            link: '/breaking-changes/global-api-treeshaking'
          }
        ]
      },
      {
        text: 'Шаблон директив',
        items: [
          { text: 'v-model', link: '/breaking-changes/v-model' },
          {
            text: 'Зміни використання key',
            link: '/breaking-changes/key-attribute'
          },
          {
            text: 'Пріоритет v-if проти v-for',
            link: '/breaking-changes/v-if-v-for'
          },
          { text: 'Поведінка злиття v-bind', link: '/breaking-changes/v-bind' },
          {
            text: 'Модифікатор v-on.native видалено',
            link: '/breaking-changes/v-on-native-modifier-removed'
          }
        ]
      },
      {
        text: 'Компоненти',
        items: [
          {
            text: 'Функціональні компоненти',
            link: '/breaking-changes/functional-components'
          },
          {
            text: 'Асинхронні компоненти',
            link: '/breaking-changes/async-components'
          },
          { text: 'Опція emits', link: '/breaking-changes/emits-option' }
        ]
      },
      {
        text: 'Функції рендерингу',
        items: [
          {
            text: 'API функцій рендерингу',
            link: '/breaking-changes/render-function-api'
          },
          {
            text: 'Уніфікація слотів',
            link: '/breaking-changes/slots-unification'
          },
          {
            text: '$listeners об\'єднано з $attrs',
            link: '/breaking-changes/listeners-removed'
          },
          {
            text: '$attrs включає class & style',
            link: '/breaking-changes/attrs-includes-class-style'
          }
        ]
      },
      {
        text: 'Спеціальні елементи',
        items: [
          {
            text: 'Зміни взаємодії',
            link: '/breaking-changes/custom-elements-interop'
          }
        ]
      },
      {
        text: 'Видалені API',
        items: [
          {
            text: 'Модифікатор v-on keyCode',
            link: '/breaking-changes/keycode-modifiers'
          },
          { text: 'API подій', link: '/breaking-changes/events-api' },
          { text: 'Фільтри', link: '/breaking-changes/filters' },
          {
            text: 'inline-template',
            link: '/breaking-changes/inline-template-attribute'
          },
          { text: '$children', link: '/breaking-changes/children' },
          { text: 'propsData option', link: '/breaking-changes/props-data' }
        ]
      },
      {
        text: 'Інші незначні зміни',
        items: [
          {
            text: 'Атрибут примусової поведінки',
            link: '/breaking-changes/attribute-coercion'
          },
          {
            text: 'Спеціальні директиви',
            link: '/breaking-changes/custom-directives'
          },
          { text: 'Опція Data', link: '/breaking-changes/data-option' },
          {
            text: 'Зміни в API монтування',
            link: '/breaking-changes/mount-changes'
          },
          {
            text: 'Доступ до this в функції реквізитів',
            link: '/breaking-changes/props-default-this'
          },
          {
            text: 'Зміни класів в Transition',
            link: '/breaking-changes/transition'
          },
          {
            text: 'Transition як кореневий елемент',
            link: '/breaking-changes/transition-as-root'
          },
          {
            text: 'Transition Group як кореневий елемент',
            link: '/breaking-changes/transition-group'
          },
          {
            text: 'Життєвий цикл VNode',
            link: '/breaking-changes/vnode-lifecycle-events'
          },
          { text: 'Спостерігачі за масивами', link: '/breaking-changes/watch' }
        ]
      }
    ]
  }
}
