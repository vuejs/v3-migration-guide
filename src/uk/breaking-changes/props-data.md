---
badges:
  - removed
---

# `propsData` <MigrationBadges :badges="$frontmatter.badges" />

## Огляд

Опцію `propsData`, яка раніше використовувалася для передачі реквізитів до екземпляра Vue під час його створення, видалено. Щоб передати реквізити кореневому компоненту застосунку Vue 3, використовуйте другий аргумент функції [createApp](https://vuejs.org/api/application.html#createapp).

## 2.x Синтаксис

У версії 2.x ми могли передавати реквізити екземпляру Vue під час його створення:

```js
const Comp = Vue.extend({
  props: ['username'],
  template: '<div>{{ username }}</div>'
})

new Comp({
  propsData: {
    username: 'Еван'
  }
})
```

## 3.x Оновлення

Опцію `propsData` видалено. Якщо вам потрібно передати реквізити кореневому екземпляру компонента під час його створення, використовуйте другий аргумент функції `createApp`:

```js
const app = createApp(
  {
    props: ['username'],
    template: '<div>{{ username }}</div>'
  },
  { username: 'Evan' }
)
```
