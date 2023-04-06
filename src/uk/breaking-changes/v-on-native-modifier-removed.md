---
title: Модифікатор v-on.native видалено
badges:
  - breaking
---

# `v-on.native` modifier removed <MigrationBadges :badges="$frontmatter.badges" />

## Огляд

Модифікатор `.native` для `v-on` було видалено.

## Синтаксис 2.x

Слухачі подій, передані компоненту за допомогою `v-on`, за замовчуванням ініціюються лише випромінюванням події за допомогою `this.$emit`. Щоб замість цього додати власний слухач DOM до кореневого елемента дочірнього компонента, можна використати модифікатор `.native`:

```html
<my-component
  v-on:close="handleComponentEvent"
  v-on:click.native="handleNativeClickEvent"
/>
```

## Синтаксис 3.x

Модифікатор `.native` для `v-on` було видалено. У той же час, [нова опція `emits`](./emits-option.md) дозволяє дочірньому компоненту визначати, які події він дійсно випромінює.

Отже, Vue тепер додаватиме всі слухачі подій, які у дочірньому компоненті _не_ визначені як події, які випромінюються компонентом, як рідні слухачі подій до кореневого елемента цього дочірнього компонента (якщо `inheritAttrs: false` не встановлено в опціях дочірнього елемента).

```html
<my-component
  v-on:close="handleComponentEvent"
  v-on:click="handleNativeClickEvent"
/>
```

`MyComponent.vue`

```html
<script>
  export default {
    emits: ['close']
  }
</script>
```

## Стратегія міграції

- видалити всі екземпляри модифікатора `.native`.
- переконатися, що всі ваші компоненти документують свої події за допомогою опції `emits`.

[Прапор збірки міграції: `COMPILER_V_ON_NATIVE`](../migration-build.html#compat-configuration)

## Дивіться також

- [Відповідний RFC](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0031-attr-fallthrough.md#v-on-listener-fallthrough)
- [Посібник з міграції - Нова опція випромінювань](./emits-option.md)
- [Посібник з міграції - `$listeners` видалено](./listeners-removed.md)
- [Посібник з міграції - Зміни в API функцій рендерингу](./render-function-api.md)
