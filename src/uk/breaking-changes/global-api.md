---
badges:
  - breaking
---

# Екземпляр програми Global API<MigrationBadges :badges="$frontmatter.badges" />

Vue 2.x має низку глобальних API та конфігурацій, які глобально змінюють поведінку Vue. Наприклад, щоб зареєструвати глобальний компонент, ви повинні використати API `Vue.component` так:

```js
Vue.component('button-counter', {
  data: () => ({
    count: 0
  }),
  template: '<button @click="count++">Клацнуто {{ count }} разів.</button>'
})
```

Аналогічно ось як оголошується глобальна директива:

```js
Vue.directive('focus', {
  inserted: (el) => el.focus()
})
```

Хоча цей підхід зручний, він призводить до кількох проблем. Технічно Vue 2 не має поняття «додаток». Те, що ми визначаємо як програму, — це просто кореневий екземпляр Vue, створений за допомогою `new Vue()`. Кожен кореневий екземпляр, створений з того самого конструктора Vue, **спільно використовує ту саму глобальну конфігурацію**. В результаті:

- Глобальна конфігурація дозволяє легко випадково забруднити інші тестові випадки під час тестування. Користувачам потрібно ретельно зберігати початкову глобальну конфігурацію та відновлювати її після кожного тесту (наприклад, скидання `Vue.config.errorHandler`). Деякі API, такі як `Vue.use` і `Vue.mixin`, навіть не мають способу повернути свої ефекти. Це робить тестування із застосуванням плагінів особливо складним. Фактично, vue-test-utils має реалізувати спеціальний API `createLocalVue`, щоб впоратися з цим:

  ```js
  import { createLocalVue, mount } from '@vue/test-utils'

  // створити розширений конструктор `Vue`
  const localVue = createLocalVue()

  // встановити плагін «глобально» на «локальний» конструктор Vue
  localVue.use(MyPlugin)

  // передайте `localVue` до параметрів монтування
  mount(Component, { localVue })
  ```

- Глобальна конфігурація ускладнює спільний доступ до однієї копії Vue між декількома «додатками» на одній сторінці, але з різними глобальними конфігураціями.

  ```js
  // це стосується обох кореневих екземплярів
  Vue.mixin({
    /* ... */
  })

  const app1 = new Vue({ el: '#app-1' })
  const app2 = new Vue({ el: '#app-2' })
  ```

Щоб уникнути цих проблем, у Vue 3 ми представляємо…

## Новий глобальний API: `createApp`

Виклик `createApp` повертає _екземпляр програми_, нову концепцію у Vue 3.

```js
import { createApp } from 'vue'

const app = createApp({})
```

Якщо ви використовуєте збірку CDN Vue, тоді `createApp` відкривається через глобальний об’єкт `Vue`:

```js
const { createApp } = Vue

const app = createApp({})
```

Екземпляр програми надає підмножину глобальних API Vue 2. Емпіричне правило таке: _будь-які API, які глобально змінюють поведінку Vue, тепер переміщуються в екземпляр програми_. Ось таблиця глобальних API Vue 2 і відповідних API екземплярів:

| 2.x Глобальний API         | 3.x API екземпляра (`app`)                                                                                                       |
| -------------------------- |----------------------------------------------------------------------------------------------------------------------------------|
| Vue.config                 | app.config                                                                                                                       |
| Vue.config.productionTip   | _видалено_ ([див. нижче](#config-productiontip-removed))                                                                         |
| Vue.config.ignoredElements | app.config.compilerOptions.isCustomElement ([див. нижче](#config-ignoredelements-is-now-config-compileroptions-iscustomelement)) |
| Vue.component              | app.component                                                                                                                    |
| Vue.directive              | app.directive                                                                                                                    |
| Vue.mixin                  | app.mixin                                                                                                                        |
| Vue.use                    | app.use ([див. нижче](#a-note-for-plugin-authors))                                                                               |
| Vue.prototype              | app.config.globalProperties ([див. нижче](#vue-prototype-replaced-by-config-globalproperties))                                   |
| Vue.extend                 | _видалено_ ([див. нижче](#vue-extend-removed))                                                                                   |

Усі інші глобальні API, які глобально не змінюють поведінку, тепер називаються експортами, як зазначено в [Global API Treeshaking](./global-api-treeshaking.html).

### `config.productionTip` Видалено

У Vue 3.x підказка «використовувати робочу збірку» з’являтиметься лише під час використання «dev + повна збірка» (збірка, яка включає компілятор середовища виконання та має попередження).

Для збірок модулів ES, оскільки вони використовуються з бандлерами, і в більшості випадків CLI або шаблон правильно налаштували б робоче середовище, ця підказка більше не відображатиметься.

[Позначка збірки міграції: `CONFIG_PRODUCTION_TIP`](../migration-build.html#compat-configuration)

### `config.ignoredElements` тепер `config.compilerOptions.isCustomElement`

Цей параметр конфігурації було введено з метою підтримки власних користувацьких елементів, тому перейменування краще передає те, що він робить. Нова опція також передбачає функцію, яка забезпечує більшу гнучкість, ніж старий підхід string/RegExp:

```js
// до
Vue.config.ignoredElements = ['my-el', /^ion-/]

// після
const app = createApp({})
app.config.compilerOptions.isCustomElement = (tag) => tag.startsWith('ion-')
```

::: tip Важливо

У Vue 3 перевірку того, чи є елемент компонентом, було перенесено на етап компіляції шаблону, тому цей параметр конфігурації враховується лише під час використання компілятора часу виконання. Якщо ви використовуєте збірку лише під час виконання, натомість `isCustomElement` потрібно передати в `@vue/compiler-dom` у налаштуваннях збірки - наприклад, через параметр [`compilerOptions` у vue-loader](https:/ /vue-loader.vuejs.org/options.html#compileroptions).

- Якщо `config.compilerOptions.isCustomElement` призначено під час використання збірки лише під час виконання, буде випущено попередження, яке вказує користувачеві передати цей параметр у налаштуваннях збірки замість цього;
- Це буде нова опція верхнього рівня в конфігурації Vue CLI.
  :::

[Позначка збірки міграції: `CONFIG_IGNORED_ELEMENTS`](../migration-build.html#compat-configuration)

### `Vue.prototype` замінено на `config.globalProperties`

У Vue 2 `Vue.prototype` зазвичай використовувався для додавання властивостей, які будуть доступні в усіх компонентах.

Еквівалентом у Vue 3 є [`config.globalProperties`](https://vuejs.org/api/application.html#app-config-globalproperties). Ці властивості буде скопійовано в рамках створення екземпляра компонента в програмі:

```js
// до - Vue 2
Vue.prototype.$http = () => {}
```

```js
// після - Vue 3
const app = createApp({})
app.config.globalProperties.$http = () => {}
```

Використання `provide` (обговорюється [нижче](#provide-inject)) також слід розглядати як альтернативу `globalProperties`.

[Позначка збірки міграції: `GLOBAL_PROTOTYPE`](../migration-build.html#compat-configuration)

### `Vue.extend` Видалено

У Vue 2.x `Vue.extend` використовувався для створення «підкласу» базового конструктора Vue з аргументом, який повинен бути об’єктом, що містить параметри компонента. У Vue 3.x ми більше не маємо концепції конструкторів компонентів. Монтування компонента має завжди використовувати глобальний API `createApp`:

```js
// до - Vue 2

// створення конструктору
const Profile = Vue.extend({
  template: '<p>{{firstName}} {{lastName}} також відомий як {{alias}}</p>',
  data() {
    return {
      firstName: 'Волтер',
      lastName: 'Вайт',
      alias: 'Гайзенберг'
    }
  }
})
// create an instance of Profile and mount it on an element
new Profile().$mount('#mount-point')
```

```js
// після - Vue 3
const Profile = {
  template: '<p>{{firstName}} {{lastName}} також відомий як {{alias}}</p>',
  data() {
    return {
      firstName: 'Волтер',
      lastName: 'Вайт',
      alias: 'Гайзенберг'
    }
  }
}

Vue.createApp(Profile).mount('#mount-point')
```

#### Визначення типу

У Vue 2 `Vue.extend` також використовувався для визначення типу TypeScript для опцій компонента. У Vue 3 глобальний API `defineComponent` можна використовувати замість `Vue.extend` для тієї ж мети.

Зауважте, що хоча тип повернення `defineComponent` є типом, подібним до конструктора, він використовується лише для висновку TSX. Під час виконання `defineComponent` є здебільшого noop і повертає об’єкт параметрів як є.

#### Успадкування компонентів

У Vue 3 ми наполегливо рекомендуємо віддавати перевагу композиції через [API композиції](https://vuejs.org/guide/reusability/composables.html) замість успадкування та міксинів. Якщо з якоїсь причини вам усе ще потрібне успадкування компонентів, ви можете використовувати параметр [`extends`](https://vuejs.org/api/options-composition.html#extends) замість `Vue.extend`.

[Позначка збірки міграції: `GLOBAL_EXTEND`](../migration-build.html#compat-configuration)

### Примітка для авторів плагінів

Автори плагінів зазвичай встановлюють плагіни у своїх збірках UMD за допомогою `Vue.use`. Наприклад, ось як офіційний плагін `vue-router` встановлюється в середовищі браузера:

```js
var inBrowser = typeof window !== 'undefined'
/* … */
if (inBrowser && window.Vue) {
  window.Vue.use(VueRouter)
}
```

Оскільки глобальний API `use` більше не доступний у Vue 3, цей метод перестане працювати, і виклик `Vue.use()` тепер ініціюватиме попередження. Натомість кінцевий користувач тепер повинен буде явно вказати використання плагіна в екземплярі програми:

```js
const app = createApp(MyApp)
app.use(VueRouter)
```

## Монтування екземпляра програми

Після ініціалізації за допомогою `createApp(/* options */)` екземпляр програми `app` можна використовувати для монтування екземпляра кореневого компонента за допомогою `app.mount(domTarget)`:

```js
import { createApp } from 'vue'
import MyApp from './MyApp.vue'

const app = createApp(MyApp)
app.mount('#app')
```

З усіма цими змінами компонент і директива, які ми маємо на початку посібника, будуть переписані приблизно так:

```js
const app = createApp(MyApp)

app.component('button-counter', {
  data: () => ({
    count: 0
  }),
  template: '<button @click="count++">Клікнуто {{ count }} разів.</button>'
})

app.directive('focus', {
  mounted: (el) => el.focus()
})

// тепер кожен екземпляр програми, змонтований за допомогою app.mount(),
// разом із деревом компонентів матиме той самий компонент «button-counter» і директиву «focus»,
// не забруднюючи глобальне середовище

app.mount('#app')
```

[Прапор збірки міграції: `GLOBAL_MOUNT`](../migration-build.html#compat-configuration)

## Надати / Ввести

Подібно до використання опції `provide` в кореневому екземплярі 2.x, екземпляр програми Vue 3 також може надавати залежності, які можуть бути введені будь-яким компонентом усередині програми:

```js
// у записі
app.provide('guide', 'Vue 3 Guide')

// у дочірньому компоненті
export default {
  inject: {
    book: {
      from: 'guide'
    }
  },
  template: `<div>{{ book }}</div>`
}
```

Використання `provide` особливо корисне під час написання плагіна, як альтернатива `globalProperties`.

## Поділитися конфігураціями серед програм

Один зі способів обміну конфігураціями, напр. компонентів або директив серед додатків — створити фабричну функцію, як-от:

```js
import { createApp } from 'vue'
import Foo from './Foo.vue'
import Bar from './Bar.vue'

const createMyApp = (options) => {
  const app = createApp(options)
  app.directive('focus' /* ... */)

  return app
}

createMyApp(Foo).mount('#foo')
createMyApp(Bar).mount('#bar')
```

Тепер директива `focus` буде доступна як в екземплярах `Foo`, так і в `Bar` та їхніх нащадках.
