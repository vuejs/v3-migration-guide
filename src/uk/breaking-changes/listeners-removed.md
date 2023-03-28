---
title: $listeners видалено
badges:
  - breaking
---

# `$listeners` видалено <MigrationBadges :badges="$frontmatter.badges" />

## Огляд

Об'єкт `$listeners` було видалено у Vue 3. Слухачі подій тепер є частиною об'єкта `$attrs`:

```js
{
  text: 'Це атрибут.',
  onClose: () => console.log('Подію "close" було викликано.')
}
```

## 2.x Синтаксис

У Vue 2 ви можете отримати доступ до атрибутів, що передаються вашим компонентам, за допомогою `this.$attrs`, а до слухачів подій за допомогою `this.$listeners`. 
У поєднанні з `inheritAttrs: false` вони дозволяють розробнику застосувати ці атрибути і слухачі до якогось іншого елемента замість кореневого:

```html
<template>
  <label>
    <input type="text" v-bind="$attrs" v-on="$listeners" />
  </label>
</template>
<script>
  export default {
    inheritAttrs: false
  }
</script>
```

## 3.x Синтаксис

У віртуальному DOM Vue 3 слухачі подій тепер є просто атрибутами з префіксом `on`, і як такі є частиною об'єкта `$attrs`, тому `$listeners` було видалено.

```vue
<template>
  <label>
    <input type="text" v-bind="$attrs" />
  </label>
</template>
<script>
export default {
  inheritAttrs: false
}
</script>
```

Якщо цей компонент отримав атрибут `id` і слухача `v-on:close`, об'єкт `$attrs` тепер матиме такий вигляд:

```js
{
  id: 'my-input',
  onClose: () => console.log('Подію "close" було викликано.')
}
```

## Стратегія міграції

Видаліть усі використання `$listeners`.

[Migration build flag: `INSTANCE_LISTENERS`](../migration-build.html#compat-configuration)

## Дивіться також

- [Відповідний RFC](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0031-attr-fallthrough.md)
- [Гід з міграції - `$attrs` включає `class` та `style` ](./attrs-includes-class-style.md)
- [Гід з міграції - зміни в API функцій рендерингу](./render-function-api.md)
- [Гід з міграції - нова опція випромінювань](./emits-option.md)
- [Гід з міграції - видалено модифікатор `.native`](./v-on-native-modifier-removed.md)
