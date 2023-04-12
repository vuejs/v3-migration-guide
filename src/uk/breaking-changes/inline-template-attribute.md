---
badges:
  - breaking
---

# Атрибут вбудованого шаблону <MigrationBadges :badges="$frontmatter.badges" />

## Огляд

Підтримку для [атрибута `inline-template`](https://vuejs.org/v2/guide/components-edge-cases.html#Inline-Templates) було видалено.

## 2.x Синтаксис

У версії 2.x Vue надав дочірнім компонентам атрибут `inline-template`, щоб використовувати їхній внутрішній вміст як шаблон замість того, щоб розглядати його як розповсюджений контент.

```html
<my-component inline-template>
  <div>
    <p>Вони компілюються як власний шаблон компонента.</p>
    <p>Не є виключенням батьківського контенту.</p>
  </div>
</my-component>
```

## 3.x Синтаксис

Ця функціональність більше не буде підтримуватися.

## Стратегія міграції

Більшість випадків використання `inline-template` передбачають відсутність інструменту збірника, коли всі шаблони пишуться безпосередньо всередині HTML-сторінки.

[Прапор збірки міграції: `COMPILER_INLINE_TEMPLATE`](../migration-build.html#compat-configuration)

### Варіант #1: Використання тегу `<script>`

Найпростішим обхідним шляхом у таких випадках є використання `<script>` з альтернативним типом:

```html
<script type="text/html" id="my-comp-template">
  <div>{{ hello }}</div>
</script>
```

А в компоненті вкажіть шаблон за допомогою селектора:

```js
const MyComp = {
  template: '#my-comp-template'
  // ...
}
```

Це не вимагає жодних налаштувань збірки, працює в усіх браузерах, не підлягає жодним застереженням щодо синтаксичного розбору HTML (наприклад, ви можете використовувати імена реквізитів у регістрі camelCase) і забезпечує належне підсвічування синтаксису в більшості редакторів коду. У традиційних серверних фреймворках ці шаблони можуть бути розділені на серверні шаблони (включені в основний HTML-шаблон) для кращої підтримки.

### Варіант #2: Слот за замовчуванням

Компонент, який раніше використовував `inline-template`, також може бути перероблений з використанням слоту за замовчуванням - що робить масштабування даних більш явним, зберігаючи при цьому зручність написання дочірнього контенту в потоці:

```html
<!-- 2.x Синтаксис -->
<my-comp inline-template :msg="parentMsg">
  {{ msg }} {{ childState }}
</my-comp>

<!-- Варіант зі слотом по замовчуванню -->
<my-comp v-slot="{ childState }">
  {{ parentMsg }} {{ childState }}
</my-comp>
```

Замість того, щоб передавати шаблон, тепер дочірній компонент буде рендерити слот за замовчуванням\*:

```html
<!--
  рендеринг слоту за замовчуванням у шаблоні дочірнього компонента
  та передача необхідного приватного стану дочірнього компонента. 
-->
<template>
  <slot :childState="childState" />
</template>
```

> - Примітка: У версії 3.x слоти можна рендерити як кореневий елемент з підтримкою нативних [фрагментів](../new/fragments)!