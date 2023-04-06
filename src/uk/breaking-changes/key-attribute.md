---
badges:
  - breaking
---

# `key` атрибут <MigrationBadges :badges="$frontmatter.badges" />

## Огляд

- **НОВЕ:** `key` більше не потрібні в гілках `v-if`/`v-else`/`v-else-if`, оскільки Vue тепер автоматично генерує унікальні `key`.
  - **НЕСУМІСНО:** Якщо ви надаєте `key` вручну, тоді кожна гілка має використовувати унікальний `key`. Ви більше не можете навмисно використовувати той самий `key` для примусового повторного використання гілки.
- **НЕСУМІСНО:** `<template v-for>` `key` слід помістити в тег `<template>` (а не в його дочірні).

## Обґрунтування

Спеціальний атрибут `key` використовується як підказка для віртуального DOM-алгоритму Vue, щоб відстежувати ідентичність вузла. Таким чином, Vue знає, коли він може повторно використовувати та виправляти існуючі вузли, а коли потрібно змінити порядок або створити їх заново. Для отримання додаткової інформації перегляньте наступні розділи:

- [Рендеринг списку: Підтримка стану](https://vuejs.org/guide/essentials/list.html#maintaining-state-with-key)
- [Довідник API: Спеціальний атрибут `key`](https://vuejs.org/api/built-in-special-attributes.html#key)

## На умовних гілках

У Vue 2.x, було рекомендовано використовувати `key` у гілках `v-if`/`v-else`/`v-else-if`.

```html
<!-- Vue 2.x -->
<div v-if="condition" key="yes">Так</div>
<div v-else key="no">Ні</div>
```

Приклад вище все ще працює в Vue 3.x. Однак ми більше не рекомендуємо використовувати атрибут `key` у гілках `v-if`/`v-else`/`v-else-if`, оскільки унікальні `key` тепер автоматично генеруються в умовних гілках, якщо ви не надаєте їх.

```html
<!-- Vue 3.x -->
<div v-if="condition">Так</div>
<div v-else>Ні</div>
```

Головною зміною є те, що якщо ви вручну надаєте `key`, кожна гілка має використовувати унікальний `key`. У більшості випадків ви можете видалити ці `key`.

```html
<!-- Vue 2.x -->
<div v-if="condition" key="a">Так</div>
<div v-else key="a">Ні</div>

<!-- Vue 3.x (рекомендоване рішення: видаліть ключі) -->
<div v-if="condition">Так</div>
<div v-else>Ні</div>

<!-- Vue 3.x (альтернативне рішення: переконайтеся, що ключі завжди унікальні) -->
<div v-if="condition" key="a">Так</div>
<div v-else key="b">Ні</div>
```

## З `<template v-for>`

У Vue 2.x тег `<template>` не міг мати `key`. Натомість, ви могли розмістити `key` на кожному з його дочірніх елементів.

```html
<!-- Vue 2.x -->
<template v-for="item in list">
  <div :key="'heading-' + item.id">...</div>
  <span :key="'content-' + item.id">...</span>
</template>
```

У Vue 3.x `key` натомість слід розмістити в тегу `<template>`.

```html
<!-- Vue 3.x -->
<template v-for="item in list" :key="item.id">
  <div>...</div>
  <span>...</span>
</template>
```

Подібним чином, коли використовується `<template v-for>` з дочірнім елементом, який використовує `v-if`, `key` має бути переміщений до тегу `<template>`.

```html
<!-- Vue 2.x -->
<template v-for="item in list">
  <div v-if="item.isVisible" :key="item.id">...</div>
  <span v-else :key="item.id">...</span>
</template>

<!-- Vue 3.x -->
<template v-for="item in list" :key="item.id">
  <div v-if="item.isVisible">...</div>
  <span v-else>...</span>
</template>
```
