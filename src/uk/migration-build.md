# Міграційна збірка

## Огляд

`@vue/compat` (така ж «міграційна збірка») — це збірка Vue 3, яка забезпечує настроювану поведінку, сумісну з Vue 2.

Міграційна збірка виконується в режимі Vue 2 за замовчуванням - більшість загальнодоступних API поводяться так само, як Vue 2, лише за кількома винятками. Використання функцій, які були змінені або застарілі у Vue 3, видасть попередження під час виконання. Сумісність функції також можна ввімкнути/вимкнути для кожного компонента.

### Випадки використання за призначенням

- Оновлення програми Vue 2 до Vue 3 (з [обмеженнями](#known-limitations))
- Перенесення бібліотеки на Vue 3
- Досвідчені розробники Vue 2, які ще не пробували Vue 3, можуть використовувати збірку міграції замість Vue 3, щоб допомогти дізнатися різницю між версіями.

### Відомі обмеження

Попри те, що ми докладаємо всіх зусиль, щоб збірка для міграції якомога більше імітувала поведінку Vue 2, є деякі обмеження, через які ваш додаток не можна оновити:

- Залежності, які покладаються на внутрішні API Vue 2 або недокументовану поведінку. Найпоширенішим випадком є використання приватних властивостей у `VNodes`. Якщо ваш проєкт покладається на такі бібліотеки компонентів, як [Vuetify](https://vuetifyjs.com/en/), [Quasar](https://quasar.dev/) або [ElementUI](https://element.eleme.io/#/en-US), найкраще дочекатися їхніх версій, сумісних з Vue 3.

- Підтримка Internet Explorer 11: [Vue 3 офіційно відмовився від плану підтримки IE11](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0038-vue3-ie11-support.md). Якщо вам все ще потрібна підтримка IE11 або нижче, вам доведеться залишитися на Vue 2.

- Візуалізація на стороні сервера: збірку міграції можна використовувати для SSR, але міграція користувацьких налаштувань SSR набагато складніша. Загальна ідея полягає в тому, щоб замінити `vue-server-renderer` на [`@vue/server-renderer`](https://github.com/vuejs/core/tree/master/packages/server-renderer). Vue 3 більше не надає пакетний рендерер, тому рекомендується використовувати Vue 3 SSR із [Vite](https://vitejs.dev/guide/ssr.html). Якщо ви використовуєте [Nuxt.js](https://nuxtjs.org/), можливо, краще дочекатися Nuxt 3.

### Очікування

Зауважте, що збірка міграції має на меті охопити лише публічно задокументовані API та поведінку Vue 2. Якщо ваша програма не запускається в збірці міграції через незадокументовану поведінку, малоймовірно, що ми налаштуємо збірку міграції відповідно до вашого конкретного випадку. Натомість подумайте про рефакторинг, щоб усунути залежність від розглянутої поведінки.

Застереження: якщо ваша програма є великою та складною, міграція, ймовірно, буде проблемою навіть зі збіркою міграції. Якщо ваш додаток, на жаль, не підходить для оновлення, зверніть увагу, що ми плануємо резервно перенести композиційний API та деякі інші функції Vue 3 у випуск 2.7 (приблизно наприкінці третього кварталу 2021 року).

Якщо ви запустите свою програму на збірці для міграції, ви **можете** відправити її в робочу версію до завершення міграції. Хоча є невеликі накладні витрати на продуктивність/розмір, це не повинно помітно вплинути на робочий UX. Можливо, вам доведеться це зробити, якщо у вас є залежності, які залежать від поведінки Vue 2 і не можуть бути оновлені/замінені.

Міграційна збірка надаватиметься, починаючи з версії 3.1, і продовжуватиме публікуватися разом із версією версії 3.2. Зрештою ми плануємо припинити публікацію збірки для міграції в майбутній проміжній версії (не раніше кінця 2021 року), тому ви все одно повинні прагнути перейти на стандартну збірку до цього.

## Процес оновлення

У наведеному нижче робочому процесі описано етапи міграції фактичної програми Vue 2 (Vue HackerNews 2.0) до Vue 3. Повні коміти можна знайти [тут](https://github.com/vuejs/vue-hackernews-2.0/compare/migration). Зауважте, що фактичні кроки, необхідні для вашого проєкту, можуть відрізнятися, і ці кроки слід розглядати як загальне керівництво, а не суворі інструкції.

### Приготування

- Якщо ви все ще використовуєте [застарілий синтаксис іменованого/облаштованого слота](https://v2.vuejs.org.ua/v2/guide/components-slots.html#Застарілий-синтаксис), спочатку оновіть його до найновішого синтаксису (який вже підтримується у версії 2.6).

### Встановлення

1. Оновіть інструменти, якщо це можливо.

   - Якщо використовується спеціальне налаштування webpack: оновіть `vue-loader` до `^16.0.0`.
   - Якщо використовується `vue-cli`: оновіть до останньої версії `@vue/cli-service` за допомогою `vue upgrade`
   - (Альтернатива) перейдіть на [Vite](https://vitejs.dev/) + [vite-plugin-vue2](https://github.com/underfin/vite-plugin-vue2). [[Приклад коміту](https://github.com/vuejs/vue-hackernews-2.0/commit/565b948919eb58f22a32afca7e321b490cb3b074)]

2. В `package.json`, оновіть `vue` до 3.1, встановіть `@vue/compat` тієї ж версії та замініть `vue-template-compiler` (якщо є) на `@vue/compiler-sfc`:

   ```diff
   "dependencies": {
   -  "vue": "^2.6.12",
   +  "vue": "^3.1.0",
   +  "@vue/compat": "^3.1.0"
      ...
   },
   "devDependencies": {
   -  "vue-template-compiler": "^2.6.12"
   +  "@vue/compiler-sfc": "^3.1.0"
   }
   ```

   [Приклад змін](https://github.com/vuejs/vue-hackernews-2.0/commit/14f6f1879b43f8610add60342661bf915f5c4b20)

3. У налаштуваннях збірки додайте псевдонім `vue` до `@vue/compat` і ввімкніть режим сумісності за допомогою параметрів компілятора Vue.

   **Приклади конфігурацій**

   <details>
     <summary><b>vue-cli</b></summary>

   ```js
   // vue.config.js
   module.exports = {
     chainWebpack: (config) => {
       config.resolve.alias.set('vue', '@vue/compat')

       config.module
         .rule('vue')
         .use('vue-loader')
         .tap((options) => {
           return {
             ...options,
             compilerOptions: {
               compatConfig: {
                 MODE: 2
               }
             }
           }
         })
     }
   }
   ```

   </details>

   <details>
     <summary><b>"Чистий" webpack</b></summary>

   ```js
   // webpack.config.js
   module.exports = {
     resolve: {
       alias: {
         vue: '@vue/compat'
       }
     },
     module: {
       rules: [
         {
           test: /\.vue$/,
           loader: 'vue-loader',
           options: {
             compilerOptions: {
               compatConfig: {
                 MODE: 2
               }
             }
           }
         }
       ]
     }
   }
   ```

   </details>

   <details>
     <summary><b>Vite</b></summary>

   ```js
   // vite.config.js
   export default {
     resolve: {
       alias: {
         vue: '@vue/compat'
       }
     },
     plugins: [
       vue({
         template: {
           compilerOptions: {
             compatConfig: {
               MODE: 2
             }
           }
         }
       })
     ]
   }
   ```

   </details>

4. Якщо ви використовуєте TypeScript, вам також потрібно змінити набір тексту `vue`, щоб відобразити експорт за замовчуванням (якого більше немає у Vue 3), додавши файл `*.d.ts` із таким:

   ```ts
   declare module 'vue' {
     import { CompatVue } from '@vue/runtime-dom'
     const Vue: CompatVue
     export default Vue
     export * from '@vue/runtime-dom'
     const { configureCompat } = Vue
     export { configureCompat }
   }
   ```

5. На цьому етапі ваша програма може зіткнутися з деякими помилками/попередженнями під час компіляції (наприклад, використання фільтрів). Спочатку виправте їх. Якщо всі попередження компілятора зникли, ви також можете встановити компілятор у режим Vue 3.

   [Приклад змін](https://github.com/vuejs/vue-hackernews-2.0/commit/b05d9555f6e115dea7016d7e5a1a80e8f825be52)

6. Після виправлення помилок програма має працювати, якщо на неї не поширюються [обмеження](#known-limitations), згадані вище.

   Ймовірно, ви побачите БАГАТО попереджень як з командного рядка, так і з консолі браузера. Ось кілька загальних порад:

   - Ви можете фільтрувати певні попередження в консолі браузера. Бажано використовувати фільтр і зосереджуватися на виправленні одного елемента за раз. Ви також можете використовувати негативні фільтри, такі як `-GLOBAL_MOUNT`.

   - Ви можете скасувати певні застарілі параметри за допомогою [налаштувань сумісності](#compat-configuration).

   - Деякі попередження можуть бути викликані залежністю, яку ви використовуєте (наприклад, `vue-router`). Ви можете перевірити це в трасуванні компонента попередження або трасуванні стека (розгортається після клацання). Спершу зосередьтеся на виправленні попереджень, які походять із вашого власного вихідного коду.

   - Якщо ви використовуєте `vue-router`, зауважте, `<transition>` і `<keep-alive>` не працюватимуть з `<router-view>`, доки ви не оновите до `vue-router` v4.

7. Оновіть [назви класів в `<transition>`](./breaking-changes/transition). Це єдина функція, яка не має попередження під час виконання. Ви можете виконати пошук у всьому проєкті за назвами класів CSS `.*-enter` і `.*-leave`.

   [Приклад змін](https://github.com/vuejs/vue-hackernews-2.0/commit/d300103ba622ae26ac26a82cd688e0f70b6c1d8f)

8. Оновіть запис програми, щоб використовувати [новий глобальний API монтування](./breaking-changes/global-api#a-new-global-api-createapp).

   [Приклад змін](https://github.com/vuejs/vue-hackernews-2.0/commit/a6e0c9ac7b1f4131908a4b1e43641f608593f714)

9. [Оновіть `vuex` до v4](https://vuex.vuejs.org/guide/migrating-to-4-0-from-3-x.html).

   [Приклад змін](https://github.com/vuejs/vue-hackernews-2.0/commit/5bfd4c61ee50f358cd5daebaa584f2c3f91e0205)

10. [Оновіть `vue-router` до v4](https://router.vuejs.org/index.html). Якщо ви також використовуєте `vuex-router-sync`, ви можете замінити його засобом отримання сховища vuex.

    Після оновлення для використання `<transition>` і `<keep-alive>` з `<router-view>` потрібен новий [синтаксис на основі області дії](https://router.vuejs.org/guide/migration/#router-view-keep-alive-and-transition).

    [Приклад змін](https://github.com/vuejs/vue-hackernews-2.0/commit/758961e73ac4089890079d4ce14996741cf9344b)

11. Виділіть окремі попередження. Зауважте, що деякі функції мають конфліктну поведінку між Vue 2 і Vue 3 - наприклад, API функції візуалізації або зміна функціонального компонента проти асинхронного компонента. Щоб перейти на API Vue 3, не впливаючи на решту програми, ви можете вибрати поведінку Vue 3 для кожного компонента за допомогою параметра [`compatConfig`](#per-component-config).

    [Приклад змін](https://github.com/vuejs/vue-hackernews-2.0/commit/d0c7d3ae789be71b8fd56ce79cb4cb1f921f893b)

12. Коли всі попередження виправлено, ви можете видалити збірку міграції та переключитися на належну Vue 3. Зауважте, що ви, можливо, не зможете це зробити, якщо у вас все ще є залежності, які покладаються на поведінку Vue 2.

    [Приклад змін](https://github.com/vuejs/vue-hackernews-2.0/commit/9beb45490bc5f938c9e87b4ac1357cfb799565bd)

## Конфігурація суміснності

### Глобальна конфігурація

Функції сумісності можна вимкнути окремо:

```js
import { configureCompat } from 'vue'

// вимкнути сумісність для певних функцій
configureCompat({
  FEATURE_ID_A: false,
  FEATURE_ID_B: false
})
```

Крім того, уся програма може за замовчуванням використовувати поведінку Vue 3, увімкнувши лише певні функції сумісності:

```js
import { configureCompat } from 'vue'

// за замовчуванням все працює як Vue 3 і вмикає лише сумісність
// для певних особливостей
configureCompat({
  MODE: 3,
  FEATURE_ID_A: true,
  FEATURE_ID_B: true
})
```

### Покомпонентна конфігурація

Компонент може використовувати параметр `compatConfig`, який очікує тих самих параметрів, що й глобальний метод `configureCompat`:

```js
export default {
  compatConfig: {
    MODE: 3, // увімкнути поведінку Vue 3 лише для цього компонента
    FEATURE_ID_A: true // функції також можна перемикати на рівні компонентів
  }
  // ...
}
```

### Конфігурація компілятора

Функції, які починаються з `COMPILER_`, залежать від компілятора: якщо ви використовуєте повну збірку (з компілятором у браузері), їх можна налаштувати під час виконання. Однак якщо використовується налаштування збірки, їх потрібно налаштувати за допомогою `compilerOptions` у конфігурації збірки (див. приклади конфігурацій вище).

## Посилання на функції

### Типи сумісності

- ✔ Повністю сумісний
- ◐ Частково сумісний із застереженнями
- ⨂ Несумісний (лише попередження)
- ⭘ Тільки режим сумісності (без попередження)

### Несумісний

> Має бути виправлено заздалегідь, інакше, ймовірно, призведе до помилок

| ID                                    | Тип | Опис                                                                         | Документація                                                                               |
| ------------------------------------- |-----|------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------|
| GLOBAL_MOUNT_CONTAINER                | ⨂   | Змонтована програма не замінює елемент, до якого вона змонтована             | [link](./breaking-changes/mount-changes.html)                                              |
| CONFIG_DEVTOOLS                       | ⨂   | production devtools тепер є прапором під час збірки                          | [link](https://github.com/vuejs/core/tree/master/packages/vue#bundler-build-feature-flags) |
| COMPILER_V_IF_V_FOR_PRECEDENCE        | ⨂   | Пріоритет `v-if` і `v-for` при використанні для того самого елемента змінено | [link](./breaking-changes/v-if-v-for.html)                                                 |
| COMPILER_V_IF_SAME_KEY                | ⨂   | Гілки `v-if` більше не можуть мати однаковий ключ                            | [link](./breaking-changes/key-attribute.html#on-conditional-branches)                      |
| COMPILER_V_FOR_TEMPLATE_KEY_PLACEMENT | ⨂   | Ключ `<template v-for>` тепер має бути поміщений у `<template>`              | [link](./breaking-changes/key-attribute.html#with-template-v-for)                          |
| COMPILER_SFC_FUNCTIONAL               | ⨂   | `<template functional>` більше не підтримується в однофайлових компонентах   | [link](./breaking-changes/functional-components.html#single-file-components-sfcs)          |

### Частково сумісний із застереженнями

| ID                       | Тип | Опис                                                                                                                                                                                                               | Документація                                                                                                           |
| ------------------------ | ---- |---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------| -------------------------------------------------------------------------------------------------------------- |
| CONFIG_IGNORED_ELEMENTS  | ◐    | `config.ignoredElements` тепер є `config.compilerOptions.isCustomElement` (лише у збірці компілятора браузера). Якщо використовується налаштування збірки, `isCustomElement` має бути передано через конфігурацію збірки. | [link](./breaking-changes/global-api.html#config-ignoredelements-is-now-config-compileroptions-iscustomelement) |
| COMPILER_INLINE_TEMPLATE | ◐    | `inline-template` видалено (сумісність підтримується лише у збірці компілятора браузера)                                                                                                                                  | [link](./breaking-changes/inline-template-attribute.html)                                                       |
| PROPS_DEFAULT_THIS       | ◐    | реквізити фабрики за замовчанням більше не мають доступу до `this` (у режимі compat `this` не є реальним екземпляром - він надає лише властивості, `$options` та ін’єкції)                                 | [link](./breaking-changes/props-default-this.html)                                                              |
| INSTANCE_DESTROY         | ◐    | Видалено метод екземпляра $destroy (у режимі сумісності, підтримується лише в кореневому екземплярі)                                                                                                                                      |                                                                                                                |
| GLOBAL_PRIVATE_UTIL      | ◐    | `Vue.util` є приватним і більше не доступний                                                                                                                                                                           |                                                                                                                |
| CONFIG_PRODUCTION_TIP    | ◐    | `config.productionTip` більше не потрібен                                                                                                                                                                                | [link](./breaking-changes/global-api.html#config-productiontip-removed)                                         |
| CONFIG_SILENT            | ◐    | `config.silent` видалено                                                                                                                                                                                                   |                                                                                                                |

### Тільки режим сумісності (без попередження)

| ID                 | Тип | Опис                            | Документація                                      |
| ------------------ | ---- | -------------------------------------- | ----------------------------------------- |
| TRANSITION_CLASSES | ⭘    | Перехід до занять/залишення змінено | [link](./breaking-changes/transition.html) |

### Повністю сумісний

| ID                           | Тип | Опис                                                                           | Документація                                                                                 |
| ---------------------------- | ---- |--------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------|
| GLOBAL_MOUNT                 | ✔    | new Vue() -> createApp                                                         | [link](./breaking-changes/global-api.html#mounting-app-instance)                             |
| GLOBAL_EXTEND                | ✔    | Vue.extend видалено (використовуйте опцію `defineComponent` або `extends`)     | [link](./breaking-changes/global-api.html#vue-extend-removed)                                |
| GLOBAL_PROTOTYPE             | ✔    | `Vue.prototype` -> `app.config.globalProperties`                               | [link](./breaking-changes/global-api.html#vue-prototype-replaced-by-config-globalproperties) |
| GLOBAL_SET                   | ✔    | `Vue.set` видалено (більше не потрібен)                                        |                                                                                              |
| GLOBAL_DELETE                | ✔    | `Vue.delete` видалено (більше не потрібен)                                     |                                                                                              |
| GLOBAL_OBSERVABLE            | ✔    | `Vue.observable` видалено (використовуйте `reactive`)                          | [link](https://ua.vuejs.org/api/reactivity-core.html#reactive)                               |
| CONFIG_KEY_CODES             | ✔    | config.keyCodes видалено                                                       | [link](./breaking-changes/keycode-modifiers.html)                                            |
| CONFIG_WHITESPACE            | ✔    | У Vue 3 пробіл за замовчуванням `"condense".                                   |                                                                                              |
| INSTANCE_SET                 | ✔    | `vm.$set` видалено (більше не потрібен)                                        |                                                                                              |
| INSTANCE_DELETE              | ✔    | `vm.$delete` видалено (більше не потрібен)                                     |                                                                                              |
| INSTANCE_EVENT_EMITTER       | ✔    | `vm.$on`, `vm.$off`, `vm.$once` видалено                                       | [link](./breaking-changes/events-api.html)                                                   |
| INSTANCE_EVENT_HOOKS         | ✔    | Екземпляр більше не генерує події `hook:x`                                     | [link](./breaking-changes/vnode-lifecycle-events.html)                                       |
| INSTANCE_CHILDREN            | ✔    | `vm.$children` видалено                                                        | [link](./breaking-changes/children.html)                                                     |
| INSTANCE_LISTENERS           | ✔    | `vm.$listeners` видалено                                                       | [link](./breaking-changes/listeners-removed.html)                                            |
| INSTANCE_SCOPED_SLOTS        | ✔    | `vm.$scopedSlots` видалено; `vm.$slots` тепер відкриває функції                | [link](./breaking-changes/slots-unification.html)                                            |
| INSTANCE_ATTRS_CLASS_STYLE   | ✔    | `$attrs` тепер включає `class` і `style`                                       | [link](./breaking-changes/attrs-includes-class-style.html)                                   |
| OPTIONS_DATA_FN              | ✔    | `data` має бути функцією в усіх випадках                                       | [link](./breaking-changes/data-option.html)                                                  |
| OPTIONS_DATA_MERGE           | ✔    | `data` з mixin або розширення тепер неглибоко об’єднані                        | [link](./breaking-changes/data-option.html)                                                  |
| OPTIONS_BEFORE_DESTROY       | ✔    | `beforeDestroy` -> `beforeUnmount`                                             |                                                                                              |
| OPTIONS_DESTROYED            | ✔    | `destroyed` -> `unmounted`                                                     |                                                                                              |
| WATCH_ARRAY                  | ✔    | перегляд масиву більше не запускає мутацію, якщо вона не глибока               | [link](./breaking-changes/watch.html)                                                        |
| V_ON_KEYCODE_MODIFIER        | ✔    | `v-on` більше не підтримує модифікатори keyCode                                | [link](./breaking-changes/keycode-modifiers.html)                                            |
| CUSTOM_DIR                   | ✔    | Назви користувацьких директив змінено                                          | [link](./breaking-changes/custom-directives.html)                                            |
| ATTR_FALSE_VALUE             | ✔    | Більше не видаляється атрибут, якщо значення прив’язки є логічним `false`      | [link](./breaking-changes/attribute-coercion.html)                                           |
| ATTR_ENUMERATED_COERCION     | ✔    | Більше не перераховуються атрибути спеціального регістру                       | [link](./breaking-changes/attribute-coercion.html)                                           |
| TRANSITION_GROUP_ROOT        | ✔    | `<transition-group>` більше не рендерить кореневий елемент за замовчуванням    | [link](./breaking-changes/transition-group.html)                                             |
| COMPONENT_ASYNC              | ✔    | API асинхронного компонента змінено (тепер потрібен `defineAsyncComponent`)    | [link](./breaking-changes/async-components.html)                                             |
| COMPONENT_FUNCTIONAL         | ✔    | Змінено API функціонального компонента (тепер мають бути звичайні функції)     | [link](./breaking-changes/functional-components.html)                                        |
| COMPONENT_V_MODEL            | ✔    | v-model компонента перероблено                                                 | [link](./breaking-changes/v-model.html)                                                      |
| RENDER_FUNCTION              | ✔    | API рендер функції змінено                                                     | [link](./breaking-changes/render-function-api.html)                                          |
| FILTERS                      | ✔    | Фільтри видалено (цей параметр впливає лише на API фільтрів під час виконання) | [link](./breaking-changes/filters.html)                                                      |
| COMPILER_IS_ON_ELEMENT       | ✔    | Використання `is` обмежено лише до `<component>`                               | [link](./breaking-changes/custom-elements-interop.html)                                      |
| COMPILER_V_BIND_SYNC         | ✔    | `v-bind.sync` замінено на `v-model` з аргументами                              | [link](./breaking-changes/v-model.html)                                                      |
| COMPILER_V_BIND_PROP         | ✔    | Модифікатор `v-bind.prop` видалено                                             |                                                                                              |
| COMPILER_V_BIND_OBJECT_ORDER | ✔    | `v-bind="object"` тепер чутливий до порядку                                    | [link](./breaking-changes/v-bind.html)                                                       |
| COMPILER_V_ON_NATIVE         | ✔    | Модифікатор `v-on.native` видалено                                             | [link](./breaking-changes/v-on-native-modifier-removed.html)                                 |
| COMPILER_V_FOR_REF           | ✔    | `ref` в `v-for` (підтримка компілятора)                                             |                                                                                              |
| COMPILER_NATIVE_TEMPLATE     | ✔    | `<template>` без спеціальних директив тепер відображається як рідний елемент          |                                                                                              |
| COMPILER_FILTERS             | ✔    | фільтри (підтримка компілятора)                                                     |                                                                                              |
