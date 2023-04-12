---
title: Transition Group як кореневий елемент
badges:
  - breaking
---

# {{ $frontmatter.title }} <MigrationBadges :badges="$frontmatter.badges" />

## Огляд

`<transition-group>` більше не рендерить кореневий елемент за замовчуванням, але все ще може створити його за допомогою атрибута `tag`.

## Синтаксис 2.x

У Vue 2 для `<transition-group>`, як і для інших користувацьких компонентів, потрібен був кореневий елемент, який за замовчуванням був `<span>`, але його можна було налаштувати за допомогою атрибута `tag`.

```html
<transition-group tag="ul">
  <li v-for="item in items" :key="item">
    {{ item }}
  </li>
</transition-group>
```

## Синтаксис 3.x

У Vue 3 у нас є [підтримка фрагментів](../new/fragments.html), тому компоненти більше не _потребують_ кореневого вузла. Отже, `<transition-group>` більше не рендерить його за замовчуванням.

- Якщо у вашому коді Vue 2 вже визначено атрибут `tag`, як наведено у прикладі вище, все працюватиме як і раніше
- Якщо у вас його не було визначено _і_ ваш стиль чи інша поведінка залежали від наявності кореневого елемента `<span>` для належної роботи, просто додайте `tag="span"` до `<transition-group>`:

```html
<transition-group tag="span">
  <!-- -->
</transition-group>
```

## Стратегія міграції

[Прапор збірки міграції: `TRANSITION_GROUP_ROOT`](../migration-build.html#compat-configuration)

## Дивіться також

- [Деякі імена класів переходів отримали зміни](./transition.html)
- [`<Transition>` як кореневий компонент більше не можна перемикати ззовні](./transition-as-root.html)
