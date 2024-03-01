---
title: 'Зміни в API монтування'
badges:
  - breaking
---

# Монтований застосунок не замінює елемент <MigrationBadges :badges="$frontmatter.badges" />

## Огляд

У Vue 2.x під час монтування застосунку, який має `template`, відтворений вміст замінює елемент, до якого ми монтуємо. У Vue 3.x рендериний застосунок додається як дочірній елемент такого елемента, замінюючи його `innerHTML`.

## Синтаксис 2.x

У Vue 2.x ми передаємо селектор елемента HTML у `new Vue()` або `$mount`:

```js
new Vue({
  el: '#app',
  data() {
    return {
      message: 'Привіт Vue!'
    }
  },
  template: `
    <div id="rendered">{{ message }}</div>
  `
})

// або
const app = new Vue({
  data() {
    return {
      message: 'Привіт Vue!'
    }
  },
  template: `
    <div id="rendered">{{ message }}</div>
  `
})

app.$mount('#app')
```

Коли ми монтуємо цю програму на сторінку, яка має `div` із переданим селектором (у нашому випадку це `id="app"`):

```html
<body>
  <div id="app">
    Деякий вміст застосунку
  </div>
</body>
```

у відтвореному результаті згаданий `div` буде замінено відтвореним вмістом застосунку:

```html
<body>
  <div id="rendered">Привіт Vue!</div>
</body>
```

## Синтаксис 3.x

У Vue 3.x, коли ми монтуємо застосунок, його рендериний вміст замінить `innerHTML` елемента, який ми передаємо в `mount`:

```js
const app = Vue.createApp({
  data() {
    return {
      message: 'Привіт Vue!'
    }
  },
  template: `
    <div id="rendered">{{ message }}</div>
  `
})

app.mount('#app')
```

Коли цю програму підключено до сторінки, яка має `div` з `id="app"`, це призведе до:

```html
<body>
  <div id="app" data-v-app="">
    <div id="rendered">Привіт Vue!</div>
  </div>
</body>
```

## Стратегія міграції

[Прапор збірки міграції: `GLOBAL_MOUNT_CONTAINER`](../migration-build.html#compat-configuration)

## Дивіться також

- [`mount` API](https://vuejs.org/api/application.html#app-mount)
