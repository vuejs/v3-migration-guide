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
          { text: 'Огляд', link: '/uk/' },
          { text: 'Нові рекомендації', link: '/uk/recommendations' },
          { text: 'Міграційна збірка', link: '/uk/migration-build' },
          {
            text: 'Несумісні зміни',
            link: '/uk/breaking-changes/'
          }
        ]
      },
      {
        text: 'Глобальний API',
        items: [
          {
            text: 'Екземпляр програми глобального API',
            link: '/uk/breaking-changes/global-api'
          },
          {
            text: 'Treeshaking глобального API ',
            link: '/uk/breaking-changes/global-api-treeshaking'
          }
        ]
      },
      {
        text: 'Шаблон директив',
        items: [
          { text: 'v-model', link: '/uk/breaking-changes/v-model' },
          {
            text: 'Зміни використання key',
            link: '/uk/breaking-changes/key-attribute'
          },
          {
            text: 'Пріоритет v-if проти v-for',
            link: '/uk/breaking-changes/v-if-v-for'
          },
          { text: 'Поведінка злиття v-bind', link: '/uk/breaking-changes/v-bind' },
          {
            text: 'Модифікатор v-on.native видалено',
            link: '/uk/breaking-changes/v-on-native-modifier-removed'
          }
        ]
      },
      {
        text: 'Компоненти',
        items: [
          {
            text: 'Функціональні компоненти',
            link: '/uk/breaking-changes/functional-components'
          },
          {
            text: 'Асинхронні компоненти',
            link: '/uk/breaking-changes/async-components'
          },
          { text: 'Опція emits', link: '/uk/breaking-changes/emits-option' }
        ]
      },
      {
        text: 'Функції рендерингу',
        items: [
          {
            text: 'API функцій рендерингу',
            link: '/uk/breaking-changes/render-function-api'
          },
          {
            text: 'Уніфікація слотів',
            link: '/uk/breaking-changes/slots-unification'
          },
          {
            text: '$listeners об\'єднано з $attrs',
            link: '/uk/breaking-changes/listeners-removed'
          },
          {
            text: '$attrs включає class & style',
            link: '/uk/breaking-changes/attrs-includes-class-style'
          }
        ]
      },
      {
        text: 'Спеціальні елементи',
        items: [
          {
            text: 'Зміни взаємодії',
            link: '/uk/breaking-changes/custom-elements-interop'
          }
        ]
      },
      {
        text: 'Видалені API',
        items: [
          {
            text: 'Модифікатор v-on keyCode',
            link: '/uk/breaking-changes/keycode-modifiers'
          },
          { text: 'API подій', link: '/uk/breaking-changes/events-api' },
          { text: 'Фільтри', link: '/uk/breaking-changes/filters' },
          {
            text: 'inline-template',
            link: '/uk/breaking-changes/inline-template-attribute'
          },
          { text: '$children', link: '/uk/breaking-changes/children' },
          { text: 'propsData option', link: '/uk/breaking-changes/props-data' }
        ]
      },
      {
        text: 'Інші незначні зміни',
        items: [
          {
            text: 'Атрибут примусової поведінки',
            link: '/uk/breaking-changes/attribute-coercion'
          },
          {
            text: 'Спеціальні директиви',
            link: '/uk/breaking-changes/custom-directives'
          },
          { text: 'Опція Data', link: '/uk/breaking-changes/data-option' },
          {
            text: 'Зміни в API монтування',
            link: '/uk/breaking-changes/mount-changes'
          },
          {
            text: 'Доступ до this в функції реквізитів',
            link: '/uk/breaking-changes/props-default-this'
          },
          {
            text: 'Зміни класів в Transition',
            link: '/uk/breaking-changes/transition'
          },
          {
            text: 'Transition як кореневий елемент',
            link: '/uk/breaking-changes/transition-as-root'
          },
          {
            text: 'Transition Group як кореневий елемент',
            link: '/uk/breaking-changes/transition-group'
          },
          {
            text: 'Життєвий цикл VNode',
            link: '/uk/breaking-changes/vnode-lifecycle-events'
          },
          { text: 'Спостерігачі за масивами', link: '/uk/breaking-changes/watch' }
        ]
      }
    ]
  }
}
