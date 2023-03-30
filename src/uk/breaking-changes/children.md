---
badges:
  - removed
---

# $children <MigrationBadges :badges="$frontmatter.badges" />

## Огляд

Властивість екземпляра `$children` було видалено з Vue 3.0 і більше не підтримується.

## 2.x Синтаксис

У версії 2.x розробники могли отримати доступ до  дочірніх компонентів поточного екземпляра за допомогою `this.$children`:

```vue
<template>
  <div>
    <img alt="Vue logo" src="./assets/logo.png">
    <my-button>Змінити логотип</my-button>
  </div>
</template>

<script>
import MyButton from './MyButton'

export default {
  components: {
    MyButton
  },
  mounted() {
    console.log(this.$children) // [VueComponent]
  }
}
</script>
```

## 3.x Оновлення

У версії 3.x властивість `$children` видалено і більше не підтримується. Замість цього, якщо вам потрібно отримати доступ до екземпляра дочірнього компонента, ми рекомендуємо використовувати референції шаблону.

## Стратегія міграції

[Прапор збірки міграції: `INSTANCE_CHILDREN`](../migration-build.html#compat-configuration)
