---
badges:
  - breaking
---

# Поведінка приведення атрибутів <MigrationBadges :badges="$frontmatter.badges" />

::: info Інформація
Це низькорівнева внутрішня зміна API, яка не впливає на більшість розробників.
:::

## Огляд

Ось короткий підсумок змін:

- Відмова від внутрішньої концепції перерахованих атрибутів і обробка цих атрибутів так само, як і звичайних не булевих атрибутів
- **НЕСУМІСНО**: більше не видаляється атрибут, якщо його значенням є логічне значення `false`. Замість цього він встановлюється як attr="false". Щоб видалити атрибут, використовуйте `null` або `undefined`.

Щоб дізнатися більше, читайте далі!

## Синтаксис 2.x

У версії 2.x, у нас були наступні стратегії для приведення значень `v-bind`:

- Для деяких пар атрибут/елемент Vue завжди використовує відповідний IDL атрибут (властивість): [наприклад, `value` для `<input>`, `<select>`, `<progress>`, тощо](https://github.com/vuejs/vue/blob/bad3c326a3f8b8e0d3bcf07917dc0adf97c32351/src/platforms/web/util/attrs.js#L11-L18).

- Для "[булевих атрибутів](https://github.com/vuejs/vue/blob/bad3c326a3f8b8e0d3bcf07917dc0adf97c32351/src/platforms/web/util/attrs.js#L33-L40)" та [xlinks](https://github.com/vuejs/vue/blob/bad3c326a3f8b8e0d3bcf07917dc0adf97c32351/src/platforms/web/util/attrs.js#L44-L46), Vue видаляє їх, якщо вони "хибні" ([`undefined`, `null` або `false`](https://github.com/vuejs/vue/blob/bad3c326a3f8b8e0d3bcf07917dc0adf97c32351/src/platforms/web/util/attrs.js#L52-L54)) і додає їх в інакшому випадку (дивіться [тут](https://github.com/vuejs/vue/blob/bad3c326a3f8b8e0d3bcf07917dc0adf97c32351/src/platforms/web/runtime/modules/attrs.js#L66-L77) і [тут](https://github.com/vuejs/vue/blob/bad3c326a3f8b8e0d3bcf07917dc0adf97c32351/src/platforms/web/runtime/modules/attrs.js#L81-L85)).

- Для "[перерахованих атрибутів](https://github.com/vuejs/vue/blob/bad3c326a3f8b8e0d3bcf07917dc0adf97c32351/src/platforms/web/util/attrs.js#L20)" (наразі `contenteditable`, `draggable` і `spellcheck`), Vue намагається [привести](https://github.com/vuejs/vue/blob/bad3c326a3f8b8e0d3bcf07917dc0adf97c32351/src/platforms/web/util/attrs.js#L24-L31) їх до рядків (зі спеціальною обробкою для `contenteditable` наразі, щоб виправити [vuejs/vue#9397](https://github.com/vuejs/vue/issues/9397)).

- Для інших атрибутів ми видаляємо "хибні" значення (`undefined`, `null`, або `false`) і встановлюємо інші значення як є (дивіться [тут](https://github.com/vuejs/vue/blob/bad3c326a3f8b8e0d3bcf07917dc0adf97c32351/src/platforms/web/runtime/modules/attrs.js#L92-L113)).

У наведеній нижче таблиці описано, як Vue по-різному приводить "перераховані атрибути" зі звичайними не булевими атрибутами:

| Вираз прив'язування  | `foo` <sup>звичайний</sup> | `draggable` <sup>перерахований</sup> |
| ------------------- | ----------------------- | --------------------------------- |
| `:attr="null"`      | -                       | `draggable="false"`               |
| `:attr="undefined"` | -                       | -                                 |
| `:attr="true"`      | `foo="true"`            | `draggable="true"`                |
| `:attr="false"`     | -                       | `draggable="false"`               |
| `:attr="0"`         | `foo="0"`               | `draggable="true"`                |
| `attr=""`           | `foo=""`                | `draggable="true"`                |
| `attr="foo"`        | `foo="foo"`             | `draggable="true"`                |
| `attr`              | `foo=""`                | `draggable="true"`                |

З таблиці вище ми бачимо, що поточна реалізація приводить `true` до `'true'`, але видаляє атрибут, якщо він `false`. Це також призвело до неузгодженості та вимагало від користувачів вручну примусово використовувати логічні значення для рядків у дуже поширених випадках використання, як-от атрибути `aria-*`, як от `aria-selected`, `aria-hidden`, тощо.

## Синтаксис 3.x

Ми маємо намір відмовитися від цієї внутрішньої концепції "перерахованих атрибутів" і розглядати їх як звичайні не булеві атрибути HTML.

- Це вирішує невідповідність між звичайними не булевими атрибутами та “перерахованими атрибутами”
- Це також дає можливість використовувати значення, відмінні від `'true'` і `'false'`, або навіть ключові слова, які ще не впроваджено, для таких атрибутів, як `contenteditable`

Для не булевих атрибутів Vue припинить видаляти їх, якщо вони мають значення `false`, і приведе їх до `'false'` натомість.

- Це вирішує невідповідність між `true` і `false` і полегшує виведення атрибутів `aria-*`

У наступній таблиці описано нову поведінку:

| Вираз прив'язування  | `foo` <sup>звичайний</sup>    | `draggable` <sup>перерахований</sup> |
| ------------------- | -------------------------- | --------------------------------- |
| `:attr="null"`      | -                          | - <sup>*</sup>                    |
| `:attr="undefined"` | -                          | -                                 |
| `:attr="true"`      | `foo="true"`               | `draggable="true"`                |
| `:attr="false"`     | `foo="false"` <sup>*</sup> | `draggable="false"`               |
| `:attr="0"`         | `foo="0"`                  | `draggable="0"` <sup>*</sup>      |
| `attr=""`           | `foo=""`                   | `draggable=""` <sup>*</sup>       |
| `attr="foo"`        | `foo="foo"`                | `draggable="foo"` <sup>*</sup>    |
| `attr`              | `foo=""`                   | `draggable=""` <sup>*</sup>       |

<small>*: змінено</small>

Приведення для булевих атрибутів залишається як є.

## Стратегія міграції

### Перераховані атрибути

Відсутність перерахованого атрибута та `attr="false"` може призвести до різних значень атрибуту IDL (які відображатимуть фактичний стан), описано таким чином:

| Відсутній перерахований атрибут | Атрибут і значення IDL                     |
| ---------------------- | ------------------------------------ |
| `contenteditable`      | `contentEditable` &rarr; `'inherit'` |
| `draggable`            | `draggable` &rarr; `false`           |
| `spellcheck`           | `spellcheck` &rarr; `true`           |

Оскільки ми більше не приводимо `null` до `'false'` для “перерахованих властивостей” у 3.x, у випадку `contenteditable` і `spellcheck`, розробникам потрібно буде змінити ті вирази `v-bind`, які використовувалися для повернення `null`, на повернення `false` або `'false'`, щоб підтримувати таку саму поведінку, як 2.x.

У версії 2.x, недійсні значення було приведено до `'true'` для перерахованих атрибутів. Зазвичай це було ненавмисно, і навряд чи можна було покладатися на це у великих масштабах. У 3.x `true` або `'true'` має бути вказано явно.

### Приведення `false` до `'false'` замість видалення атрибута

У версії 3.x `null` або `undefined` слід використовувати для явного видалення атрибута.

### Порівняння поведінки між 2.x і 3.x

<table>
  <thead>
    <tr>
      <th>Атрибут</th>
      <th><code>v-bind</code> значення <sup>2.x</sup></th>
      <th><code>v-bind</code> значення <sup>3.x</sup></th>
      <th>HTML вивід</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowspan="3">2.x “Перераховані атрибути”<br><small>тобто <code>contenteditable</code>, <code>draggable</code> та <code>spellcheck</code>.</small></td>
      <td><code>undefined</code></td>
      <td><code>undefined</code>, <code>null</code></td>
      <td><i>видалено</i></td>
    </tr>
    <tr>
      <td>
        <code>true</code>, <code>'true'</code>, <code>''</code>, <code>1</code>,
        <code>'foo'</code>
      </td>
      <td><code>true</code>, <code>'true'</code></td>
      <td><code>"true"</code></td>
    </tr>
    <tr>
      <td><code>null</code>, <code>false</code>, <code>'false'</code></td>
      <td><code>false</code>, <code>'false'</code></td>
      <td><code>"false"</code></td>
    </tr>
    <tr>
      <td rowspan="2">Інші не булеві атрибути<br><small>наприклад <code>aria-checked</code>, <code>tabindex</code>, <code>alt</code>, тощо</small></td>
      <td><code>undefined</code>, <code>null</code>, <code>false</code></td>
      <td><code>undefined</code>, <code>null</code></td>
      <td><i>видалено</i></td>
    </tr>
    <tr>
      <td><code>'false'</code></td>
      <td><code>false</code>, <code>'false'</code></td>
      <td><code>"false"</code></td>
    </tr>
  </tbody>
</table>

[Прапори збірки міграції:](../migration-build.html#compat-configuration)

- `ATTR_FALSE_VALUE`
- `ATTR_ENUMERATED_COERCION`
