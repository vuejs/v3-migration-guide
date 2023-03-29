---
badges:
  - breaking
---

# API функції рендерингу <MigrationBadges :badges="$frontmatter.badges" />

## Огляд

Ця зміна не вплине на користувачів `<template>`.

Ось короткий огляд того, що змінилося:

- `h` тепер імпортується глобально замість того, щоб передаватися функціям рендерингу як аргумент
- змінено аргументи функції рендерингу для більшої узгодженості між компонентами зі збереженням стану та функціональними компонентами
- VNode тепер має пласку структуру реквізитів

Щоб дізнатися більше, читайте далі!

## Аргумент функції рендерингу

### 2.x Синтаксис

У версії 2.x функція `render` автоматично отримувала функцію `h` (яка є умовним псевдонімом для `createElement`) як аргумент:

```js
// Vue 2 Приклад функції рендерингу
export default {
  render(h) {
    return h('div')
  }
}
```

### 3.x Синтаксис

У версії 3.x `h` тепер імпортується глобально, а не автоматично передається як аргумент.

```js
// Vue 3 Приклад функції рендерингу
import { h } from 'vue'

export default {
  render() {
    return h('div')
  }
}
```

## Формат реквізитів VNode

### 2.x Синтаксис

У версії 2.x `domProps` містив вкладений список у реквізитах VNode:

```js
// 2.x
{
  staticClass: 'button',
  class: {'is-outlined': isOutlined },
  staticStyle: { color: '#34495E' },
  style: { backgroundColor: buttonColor },
  attrs: { id: 'submit' },
  domProps: { innerHTML: '' },
  on: { click: submitForm },
  key: 'submit-button'
}
```

### 3.x Синтаксис

У версії 3.x всю структуру реквізитів VNode було спрощено. Використовуючи приклад вище, ось як це виглядатиме зараз.

```js
// 3.x Синтаксис
{
  class: ['button', { 'is-outlined': isOutlined }],
  style: [{ color: '#34495E' }, { backgroundColor: buttonColor }],
  id: 'submit',
  innerHTML: '',
  onClick: submitForm,
  key: 'submit-button'
}
```

## Зареєстрований компонент

### 2.x Синтаксис

У версії 2.x, коли компонент було зареєстровано, функція рендерингу добре працювала при передачі імені компонента у вигляді рядка як першого аргументу:

```js
// 2.x
Vue.component('button-counter', {
  data() {
    return {
      count: 0
    }
  }
  template: `
    <button @click="count++">
      Натиснено {{ count }} разів.
    </button>
  `
})

export default {
  render(h) {
    return h('button-counter')
  }
}
```

### 3.x Синтаксис

У версії 3.x, оскільки VNodes є контекстно-вільними, ми більше не можемо використовувати рядковий ідентифікатор для безпосереднього пошуку зареєстрованих компонентів. Замість цього нам потрібно використовувати імпортований метод `resolveComponent`:

```js
// 3.x
import { h, resolveComponent } from 'vue'

export default {
  setup() {
    const ButtonCounter = resolveComponent('button-counter')
    return () => h(ButtonCounter)
  }
}
```

Більш детальну інформацію можна знайти у документі про [зміну API функції рендерингу RFC](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0008-render-function-api-change.md#context-free-vnodes).

## Стратегія міграції

[Прапор збірки міграції: `RENDER_FUNCTION`](../migration-build.html#compat-configuration)

### Автори бібліотеки

Глобально імпортована функція `h` означає, що будь-яка бібліотека, яка містить компоненти Vue, буде мати `import { h } from 'vue'`. В результаті, це створює певні труднощі, оскільки вимагає від авторів бібліотек належним чином налаштувати екстерналізацію Vue у налаштуваннях збірки:

- Vue не повинен бути включений до бібліотеки
- Для збірок модулів імпорт варто залишити в стороні, і він буде оброблятися кінцевим користувацьким пакувальником
- Для UMD/браузерних збірок слід спочатку спробувати глобальний Vue.h, а потім зробити резервний варіант, щоб забезпечити виклики

## Наступні кроки

Більш детальну інформацію дивіться у [гіді про функію рендерингу](https://ua.vuejs.org/guide/extras/render-function.html)!
