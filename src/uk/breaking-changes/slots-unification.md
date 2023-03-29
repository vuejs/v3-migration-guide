---
badges:
  - breaking
---

# Уніфікація слотів <MigrationBadges :badges="$frontmatter.badges" />

## Огляд

Ця зміна уніфікує звичайні та обмежені слоти в 3.x.

Ось короткий огляд того, що змінилося:

- `this.$slots` тепер відкриває слоти як функції
- **НЕСУМІСНО**: `this.$scopedSlots` видалено

Щоб дізнатися більше, читайте далі!

## 2.x Синтаксис

When using the render function, i.e., `h`, 2.x used to define the `slot` data property on the content nodes.
При використанні функції render, тобто `h`, у версії 2.x потрібно було вказувати властивість `slot` на вузлах контенту.

```js
// 2.x Синтаксис
h(LayoutComponent, [
  h('div', { slot: 'header' }, this.header),
  h('div', { slot: 'content' }, this.content)
])
```

Крім того, при посиланні на обмежені слоти, на них можна посилатися, використовуючи наступний синтаксис:

```js
// 2.x Синтаксис
this.$scopedSlots.header
```

## 3.x Синтаксис

У версії 3.x слоти визначаються як дочірні об'єкти поточного вузла:

```js
// 3.x Синтаксис
h(LayoutComponent, {}, {
  header: () => h('div', this.header),
  content: () => h('div', this.content)
})
```

А якщо вам потрібно програмно звернутися до обмежених слотів, то їх тепер об'єднано в опцію `$slots`.

```js
// 2.x Синтаксис
this.$scopedSlots.header

// 3.x Синтаксис
this.$slots.header()
```

## Стратегія міграції

Більшість змін вже було перенесено до версії 2.6. Таким чином, міграція може відбутися за один крок:

1. Замінити всі випадки `this.$scopedSlots` на `this.$slots` для версії 3.x.
2. Замінити всі випадки `this.$slots.mySlot` на `this.$slots.mySlot()`.

[Прапор збірки міграції: `INSTANCE_SCOPED_SLOTS`](../migration-build.html#compat-configuration)
