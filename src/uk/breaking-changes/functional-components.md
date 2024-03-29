---
badges:
  - breaking
---

# Функціональні компоненти <MigrationBadges :badges="$frontmatter.badges" />

## Огляд

З точки зору того, що змінилося, на високому рівні:

- Підвищення продуктивності від 2.x для функціональних компонентів тепер незначне у 3.x, тому ми рекомендуємо просто використовувати компоненти зі збереженням стану
- Функціональні компоненти можна створити лише за допомогою простої функції, яка отримує `props` і `context` (тобто `slots`, `attrs`, `emit`)
- **НЕСУМІСНО:** Атрибут `functional` в одно-файловому компоненті (SFC) `<template>` видалено
- **НЕСУМІСНО:** Опцію `{ functional: true }` у компонентах, створених функціями, видалено

Щоб дізнатися більше, читайте далі!

## Вступ

У Vue 2 функціональні компоненти мали два основні варіанти використання:

- як оптимізація продуктивності, оскільки вони ініціалізуються набагато швидше, ніж компоненти зі збереженням стану
- щоб повернути кілька кореневих вузлів

Однак у Vue 3 продуктивність компонентів із збереженням стану покращилася настільки, що різниця стала незначною. Крім того, компоненти зі збереженням стану тепер також включають можливість повертати кілька кореневих вузлів.

У результаті єдиним варіантом використання функціональних компонентів є прості компоненти, такі як компонент для створення динамічного заголовка. В іншому випадку рекомендується використовувати компоненти зі збереженням стану, як зазвичай.

## Синтаксис 2.x

Використовуючи компонент `<dynamic-heading>`, який відповідає за візуалізацію відповідного заголовка (тобто `h1`, `h2`, `h3`, тощо), це можна було записати як одно-файловий компонент у 2.x як:

```js
// Приклад функціонального компонента Vue 2
export default {
  functional: true,
  props: ['level'],
  render(h, { props, data, children }) {
    return h(`h${props.level}`, data, children)
  }
}
```

Або для тих, хто надає перевагу `<template>` в одно-файловому компоненті:

```vue
<!-- Приклад функціонального компонента Vue 2 із <template> -->
<template functional>
  <component
    :is="`h${props.level}`"
    v-bind="attrs"
    v-on="listeners"
  />
</template>

<script>
export default {
  props: ['level']
}
</script>
```

## Синтаксис 3.x

### Компоненти, створені функціями

Тепер у Vue 3 усі функціональні компоненти створюються за допомогою простої функції. Іншими словами, немає необхідності визначати опцію компонента `{ functional: true }`.

Вони отримають два аргументи: `props` і `context`. Аргумент `context` - це об'єкт, який містить `attrs`, `slots` і `emit` властивості компонента.

Крім того, замість непрямого надання `h` у функції `render`, `h` тепер імпортується глобально.

Ось як виглядатиме зараз згаданий вище приклад використання компонента `<dynamic-heading>`.

```js
import { h } from 'vue'

const DynamicHeading = (props, context) => {
  return h(`h${props.level}`, context.attrs, context.slots)
}

DynamicHeading.props = ['level']

export default DynamicHeading
```

### Одно-файлові компоненти (SFCs)

У версії 3.x різниця в продуктивності між компонентами зі збереженням стану та функціональними компонентами була суттєво зменшена і в більшості випадків використання буде незначною. У результаті шлях міграції для розробників, які використовують `functional` на SFCs, полягає у видаленні атрибута та перейменуванні всіх посилань `props` на `$props` і `attrs` на `$attrs`.

Використовуючи наш попередній приклад `<dynamic-heading>`, ось як це виглядатиме зараз.

```vue{1,3,4}
<template>
  <component
    v-bind:is="`h${$props.level}`"
    v-bind="$attrs"
  />
</template>

<script>
export default {
  props: ['level']
}
</script>
```

Основні відмінності полягають у тому, що:

1. атрибут `functional` вилучено з `<template>`
2. `listeners` тепер передаються як частина `$attrs` і їх можна видалити

## Наступні кроки

Щоб отримати додаткові відомості про використання нових функціональних компонентів і зміни функцій рендерингу в цілому, дивіться:

- [Міграція: функції рендерингу](./render-function-api.html)
- [Посібник: функції рендерингу](https://vuejs.org/guide/extras/render-function.html#render-functions-jsx)
- [Прапор збірки міграції: `COMPONENT_FUNCTIONAL`](../migration-build.html#compat-configuration)
