---
badges:
  - new
---

# Асинхронні компоненти <MigrationBadges :badges="$frontmatter.badges" />

## Огляд

Ось короткий огляд того, що змінилося:

- Новий допоміжний метод `defineAsyncComponent`, який явно визначає асинхронні компоненти
- Опцію `component` перейменовано на `loader`
- Функція завантажувача в сутності не отримує аргументів `resolve` і `reject` і має повертати Promise

Щоб отримати подальші пояснення, читайте далі!

## Вступ

Раніше асинхронні компоненти створювали простим визначенням компонента як функції, яка повертала Promise, наприклад:

```js
const asyncModal = () => import('./Modal.vue')
```

Або, для більш просунутого синтаксису компонента з опціями:

```js
const asyncModal = {
  component: () => import('./Modal.vue'),
  delay: 200,
  timeout: 3000,
  error: ErrorComponent,
  loading: LoadingComponent
}
```

## Синтаксис 3.x

Тепер, у Vue 3, оскільки функціональні компоненти визначені як чисті функції, визначення асинхронних компонентів потрібно чітко визначати, обернувши їх у новий хелпер `defineAsyncComponent`:

```js
import { defineAsyncComponent } from 'vue'
import ErrorComponent from './components/ErrorComponent.vue'
import LoadingComponent from './components/LoadingComponent.vue'

// Асинхронний компонент без опцій
const asyncModal = defineAsyncComponent(() => import('./Modal.vue'))

// Асинхронний компонент із опціями
const asyncModalWithOptions = defineAsyncComponent({
  loader: () => import('./Modal.vue'),
  delay: 200,
  timeout: 3000,
  errorComponent: ErrorComponent,
  loadingComponent: LoadingComponent
})
```

::: tip Примітка
Vue Router підтримує подібний механізм для асинхронного завантаження маршрутних компонентів, відомий як *відкладене завантаження*. Незважаючи на схожість, ця функція відрізняється від підтримки Vue асинхронних компонентів. Вам **не** слід використовувати `defineAsyncComponent` під час налаштування компонентів маршруту за допомогою Vue Router. Ви можете прочитати більше про це в розділі [Маршрути відкладеного завантаження](https://router.vuejs.org/guide/advanced/lazy-loading.html) документації Vue Router.
:::

Ще одна зміна, яка була зроблена порівняно з 2.x, полягає в тому, що опція `component` тепер перейменована на `loader`, щоб точно повідомити, що визначення компонента не можна надати безпосередньо.

```js{4}
import { defineAsyncComponent } from 'vue'

const asyncModalWithOptions = defineAsyncComponent({
  loader: () => import('./Modal.vue'),
  delay: 200,
  timeout: 3000,
  errorComponent: ErrorComponent,
  loadingComponent: LoadingComponent
})
```

Крім того, на відміну від 2.x, функція завантажувача більше не отримує аргументи `resolve` і `reject` і має завжди повертати Promise.

```js
// Версія 2.x
const oldAsyncComponent = (resolve, reject) => {
  /* ... */
}

// Версія 3.x
const asyncComponent = defineAsyncComponent(
  () =>
    new Promise((resolve, reject) => {
      /* ... */
    })
)
```

Додаткову інформацію про використання асинхронних компонентів дивіться тут:

- [Посібник: Асинхронні компоненти](https://vuejs.org/guide/components/async.html)
- [Прапор збірки міграції: `COMPONENT_ASYNC`](../migration-build.html#compat-configuration)
