---
title: $attrs включає class та style
badges:
- breaking
---

# `$attrs` включає `class` та `style` <MigrationBadges :badges="$frontmatter.badges" />

## Огляд

`$attrs` тепер включає _всі_ атрибути, що передаються до компонента, включаючи `class` та `style`.

## 2.x Поведінка

атрибути `class` та `style` мають особливу обробку у реалізації віртуального DOM у Vue 2. З цієї причини вони _не_ включені до `$attrs`, в той час як всі інші атрибути включені.

Побічний ефект цього проявляється при використанні `inheritAttrs: false`:

- Атрибути в `$attrs` більше не додаються автоматично до кореневого елемента, залишаючи розробнику право вирішувати, куди їх додавати.
- Але `class` і `style`, не будучи частиною `$attrs`, все одно будуть застосовані до кореневого елемента компонента:

```vue
<template>
  <label>
    <input type="text" v-bind="$attrs" />
  </label>
</template>
<script>
export default {
  inheritAttrs: false
}
</script>
```

якщо використовувати його так:

```html
<my-component id="my-id" class="my-class"></my-component>
```

...згенерує такий HTML:

```html
<label class="my-class">
  <input type="text" id="my-id" />
</label>
```

## 3.x Поведінка

`$attrs` містить _усі_ атрибути, що полегшує їх застосування до іншого елемента. Наведений вище приклад тепер генерує наступний HTML:

```html
<label>
  <input type="text" id="my-id" class="my-class" />
</label>
```

## Стратегія міграції

Переконайтеся, що у компонентах, які використовують `inheritAttrs: false`, стилі все ще працюють належним чином. Якщо ви раніше покладалися на спеціальну поведінку `class` та `style`, то деякі візуальні ефекти можуть бути втрачені, оскільки ці атрибути тепер можуть бути застосовані до іншого елемента.

[Прапор міграції збірки: `INSTANCE_ATTRS_CLASS_STYLE`](../migration-build.html#compat-configuration)

## Дивіться також

- [Відповідний RFC](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0031-attr-fallthrough.md)
- [Гід з міграції - видалено `$listeners`](./listeners-removed.md)
- [Гід з міграції - нова опція випромінювань](./emits-option.md)
- [Гід з міграції - видалено модифікатор `.native`](./v-on-native-modifier-removed.md)
- [Гід з міграції - зміни в API функцій рендерингу](./render-function-api.md)
