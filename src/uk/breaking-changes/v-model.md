---
badges:
  - breaking
---

# `v-model` <MigrationBadges :badges="$frontmatter.badges" />

## Огляд

Огляд змін на високому рівні:

- **НЕСУМІСНО:** При використанні на користувальницьких компонентах типові назви реквізитів і подій `v-model` змінюються:
  - реквізит: `value` -> `modelValue`;
  - поді': `input` -> `update:modelValue`;
- **НЕСУМІСНО:** Модифікатор `.sync` і параметр `model` компонента `v-bind` видалено та замінено аргументом `v-model`;
- **НОВЕ:** Тепер можливі кілька прив'язок `v-model` до одного компонента;
- **НОВЕ:** Додано можливість створювати власні модифікатори `v-model`.

Щоб дізнатися більше, читайте далі!

## Введення

Коли було випущено Vue 2.0, директива `v-model` вимагала від розробників завжди використовувати властивість `value`. І якби розробникам потрібні були різні властивості для різних цілей, їм довелося б вдатися до використання `v-bind.sync`. Крім того, цей жорстко закодований зв'язок між `v-model` і `value` призводив до проблем із тим, як оброблялися нативні та користувацькі елементи.

У версії 2.2 ми представили опцію компонента `model`, яка дозволяє компоненту налаштовувати властивість і подію для використання в `v-model`. Однак це все ще дозволяло використовувати лише одну `v-модель` для компонента.

У Vue 3 API двостороннє зв'язування даних стандартизовано, щоб зменшити плутанину та надати розробникам більше гнучкості за допомогою директиви `v-model`.

## Синтакс 2.x

У 2.x використання `v-model` для компонента було еквівалентом передачі реквізиту `value` і випромінювання події `input`:

```html
<ChildComponent v-model="pageTitle" />

<!-- було б скороченням для: -->

<ChildComponent :value="pageTitle" @input="pageTitle = $event" />
```

Якщо ми хочемо змінити назви реквізитів або подій на щось інше, нам потрібно буде додати опцію `model` до компонента `ChildComponent`:

```html
<!-- ParentComponent.vue -->

<ChildComponent v-model="pageTitle" />
```

```js
// ChildComponent.vue

export default {
  model: {
    prop: 'title',
    event: 'change'
  },
  props: {
    // це дозволяє використовувати реквізит `value` для іншої мети
    value: String,
    // використовуйте `title` як реквізит, який займає місце `value`
    title: {
      type: String,
      default: 'Назва за замовчуванням'
    }
  }
}
```

Отже, `v-model` у цьому випадку буде скороченням до

```html
<ChildComponent :title="pageTitle" @change="pageTitle = $event" />
```

### Використання `v-bind.sync`

У деяких випадках нам може знадобитися «двостороннє прив'язування» для реквізиту (іноді на додаток до існуючої `v-model` для іншого реквізиту). Для цього ми рекомендуємо видавати події за шаблоном `update:myPropName`. Наприклад, для `ChildComponent` з попереднього прикладу з атрибутом `title` ми могли б повідомити намір призначити нове значення за допомогою:

```js
this.$emit('update:title', newValue)
```

Тоді батьківський компонент може прослухати цю подію та оновити властивість локальних даних, якщо захоче. Наприклад:

```html
<ChildComponent :title="pageTitle" @update:title="pageTitle = $event" />
```

Для зручності ми мали скорочення цього шаблону з модифікатором `.sync`:

```html
<ChildComponent :title.sync="pageTitle" />
```

## Синтаксис 3.x

У версії 3.x `v-model` для спеціального компонента є еквівалентом передачі реквізиту `modelValue` і випромінювання події `update:modelValue`:

```html
<ChildComponent v-model="pageTitle" />

<!-- було б скороченням для: -->

<ChildComponent
  :modelValue="pageTitle"
  @update:modelValue="pageTitle = $event"
/>
```

### Аргументи `v-model`

Щоб змінити назву моделі, замість опції компонента `model`, тепер ми можемо передати _аргумент_ до `v-model`:

```html
<ChildComponent v-model:title="pageTitle" />

<!-- було б скороченням для: -->

<ChildComponent :title="pageTitle" @update:title="pageTitle = $event" />
```

![Анатомія v-bind](/images/v-bind-instead-of-sync.png)

Це також слугує заміною модифікатора `.sync` і дозволяє нам мати кілька `v-model` у користувацькому компоненті.

```html
<ChildComponent v-model:title="pageTitle" v-model:content="pageContent" />

<!-- було б скороченням для: -->

<ChildComponent
  :title="pageTitle"
  @update:title="pageTitle = $event"
  :content="pageContent"
  @update:content="pageContent = $event"
/>
```

### Модифікатори `v-model`

На додаток до жорстко закодованих модифікаторів `v-model` 2.x, таких як `.trim`, тепер 3.x підтримує спеціальні модифікатори:

```html
<ChildComponent v-model.capitalize="pageTitle" />
```

Докладніше про [спеціальні модифікатори `v-model` в компонентах](https://ua.vuejs.org/guide/components/v-model.html#handling-v-model-modifiers).

## Стратегія міграції

Ми рекомендуємо:

- перевірити кодову базу на використання `.sync` і замінити його на `v-model`:

  ```html
  <ChildComponent :title.sync="pageTitle" />

  <!-- замінити на -->

  <ChildComponent v-model:title="pageTitle" />
  ```

- для всіх `v-model` без аргументів переконайтеся, що змінено реквізити та назви подій на `modelValue` та `update:modelValue` відповідно

  ```html
  <ChildComponent v-model="pageTitle" />
  ```

  ```js
  // ChildComponent.vue

  export default {
    props: {
      modelValue: String // раніше було `value: String`
    },
    emits: ['update:modelValue'],
    methods: {
      changePageTitle(title) {
        this.$emit('update:modelValue', title) // раніше було `this.emit('input', title)`
      }
    }
  }
  ```

[Прапори збірки міграції:](../migration-build.html#compat-configuration)

- `COMPONENT_V_MODEL`
- `COMPILER_V_BIND_SYNC`

## Наступні кроки

Додаткову інформацію про новий синтаксис `v-model` див.

- [Використання `v-model` в компонентах](https://ua.vuejs.org/guide/components/v-model.html)
- [Аргументи `v-model`](https://ua.vuejs.org/guide/components/v-model.html#v-model-arguments)
- [Обробка модифікаторів `v-model`](https://ua.vuejs.org/guide/components/v-model.html#handling-v-model-modifiers)
