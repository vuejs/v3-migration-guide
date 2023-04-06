---
title: Доступ до this в функції реквізитів
badges:
  - breaking
---

# Доступ до `this` в функції реквізитів <MigrationBadges :badges="$frontmatter.badges" />

Фабричні функції значення реквізитів за замовчуванням більше не мають доступу до `this`.

Натомість:

- Необроблені реквізити, отримані компонентом, передаються функцію за замовчуванням як аргумент;

- API [inject](https://vuejs.org/api/composition-api-dependency-injection.html#inject) можна використовувати у функціях за замовчуванням.

```js
import { inject } from 'vue'

export default {
  props: {
    theme: {
      default (props) {
        // `props` - це необроблені значення, передані компоненту,
        // до будь-якого типу / приведення по замовчуванню
        // також може використовувати `inject` для доступу до
        // введених властивостей
        return inject('theme', 'default-theme')
      }
    }
  }
}
```

## Стратегія міграції

[Прапор збірки міграції: `PROPS_DEFAULT_THIS`](../migration-build.html#compat-configuration)
