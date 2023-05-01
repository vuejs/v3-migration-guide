---
badges:
  - breaking
---

# Transition як кореневий елемент <MigrationBadges :badges="$frontmatter.badges" />

## Огляд

Використання `<transition>` як кореневого компонента більше не запускатиме переходи, коли компонент перемикається ззовні.

## Поведінка 2.x

У Vue 2 було можливо ініціювати перехід ззовні компонента, використовуючи `<transition>` як кореневий компонент:

```html
<!-- модальний компонент -->
<template>
  <transition>
    <div class="modal"><slot/></div>
  </transition>
</template>
```

```html
<!-- використання -->
<modal v-if="showModal">привіт</modal>
```

Перемикання значення `showModal` призводить до переходу всередині модального компонента.

Це спрацьовує випадково, а не задумом. `<transition>` має ініціюватись змінами до його дочірніх елементів, а не перемиканням самого `<transition>`.

Зараз цю примху видалено.

## Стратегія міграції

Подібного ефекту можна досягти, якщо натомість передати реквізит компоненту:

```vue
<template>
  <transition>
    <div v-if="show" class="modal"><slot/></div>
  </transition>
</template>
<script>
export default {
  props: ['show']
}
</script>
```

```html
<!-- використання -->
<modal :show="showModal">привіт</modal>
```

## Дивіться також

- [Деякі імена класів переходів отримали зміни](./transition.html)
- [`<TransitionGroup>` тепер не рендерить елемент оболонки за замовчуванням](./transition-group.html)
