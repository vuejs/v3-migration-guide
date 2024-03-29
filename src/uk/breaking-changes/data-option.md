---
title: Опція data
badges:
  - breaking
---

# {{ $frontmatter.title }} <MigrationBadges :badges="$frontmatter.badges" />

## Огляд

- **НЕСУМІСНО**: оголошення опції компонента `data` більше не приймає звичайний JavaScript об'єкт і очікує оголошення за допомогою функції.

- **НЕСУМІСНО**: при об'єднанні декількох значень, що повертаються `data` з міксинів або розширювачів, злиття тепер є поверхневим, а не поглибленим (об'єднуються лише властивості кореневого рівня).

## 2.x Синтаксис

У версії 2.x розробники могли оголошувати опцію `data` за допомогою об'єкта або функції.

Наприклад:

```html
<!-- Декларація за допомогою об'єкта -->
<script>
  const app = new Vue({
    data: {
      apiKey: 'a1b2c3'
    }
  })
</script>

<!-- Декларація за допомогою функції -->
<script>
  const app = new Vue({
    data() {
      return {
        apiKey: 'a1b2c3'
      }
    }
  })
</script>
```

Хоча це забезпечило певну зручність з точки зору того, що кореневі екземпляри мають спільний стан, це призвело до плутанини через те, що це можливо лише для кореневого екземпляра.

## 3.x Оновлення

У версії 3.x опцію `data` було стандартизовано так, щоб вона приймала лише функцію, яка повертає об'єкт.

Беручи до уваги вище наведенний приклад, тут буде можлива лише одна реалізація коду:

```html
<script>
  import { createApp } from 'vue'

  createApp({
    data() {
      return {
        apiKey: 'a1b2c3'
      }
    }
  }).mount('#app')
</script>
```

## Зміна поведінки при злитті міксинів

Крім того, коли об'єднуються `data()` та міксини в компоненті, злиття тепер виконується *неглибоко*:

```js
const Mixin = {
  data() {
    return {
      user: {
        name: 'Jack',
        id: 1
      }
    }
  }
}

const CompA = {
  mixins: [Mixin],
  data() {
    return {
      user: {
        id: 2
      }
    }
  }
}
```

У версії Vue 2.x результатом `$data` є:

```json
{
  "user": {
    "id": 2,
    "name": "Jack"
  }
}
```

У версії 3.0 результатом `$data` буде:

```json
{
  "user": {
    "id": 2
  }
}
```

[Прапорець збірки міграції: `OPTIONS_DATA_FN`](../migration-build.html#compat-configuration)

## Стратегія міграції

Користувачам, які звикли до оголошення об'єктів, ми рекомендуємо:

- Вилучення спільних даних у зовнішній об'єкт і використання його як властивості в `data`
- Переписати посилання на спільні дані, щоб вони вказували на новий загальний об'єкт

Користувачам, які звикли до глибокого злиття міксинів, ми рекомендуємо рефакторинг вашого коду, щоб уникнути такої залежності, оскільки глибоке злиття міксинів є дуже неявним і може ускладнити логіку коду для розуміння та налагодження.

[Прапорці збірки міграції:](../migration-build.html#compat-configuration)

- `OPTIONS_DATA_FN`
- `OPTIONS_DATA_MERGE`
