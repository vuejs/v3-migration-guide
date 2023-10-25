---
badges:
  - breaking
---

# Mudanças da API de Montagem <MigrationBadges :badges="$frontmatter.badges" /> {#mount-api-changes}

## Visão Geral {#overview}

> A aplicação montada não substitui o elemento.

Na Vue 2.x, quando montamos uma aplicação que tem um `template`, o conteúdo interpretado substitui o elemento para qual montámos. Na Vue 3.x, a aplicação interpretada é anexada como um filho de tal elemento, substituindo a `innerHTML` do elemento.

## Sintaxe da 2.X {#_2-x-syntax}

Na Vue 2.x, passamos um seletor de elemento de HTML ao `new Vue()` ou `$mount`:

```js
new Vue({
  el: '#app',
  data() {
    return {
      message: 'Hello Vue!'
    }
  },
  template: `
    <div id="rendered">{{ message }}</div>
  `
})

// ou
const app = new Vue({
  data() {
    return {
      message: 'Hello Vue!'
    }
  },
  template: `
    <div id="rendered">{{ message }}</div>
  `
})

app.$mount('#app')
```

Quando montamos esta aplicação à página que tem um `div` com o seletor passado (no nosso caso, é `id="app"`):

```html
<body>
  <div id="app">
    Some app content
  </div>
</body>
```

no resultado interpretado, o `div` mencionado será substituído com o conteúdo da aplicação interpretada:

```html
<body>
  <div id="rendered">Hello Vue!</div>
</body>
```

## Sintaxe da 3.x {#_3-x-syntax}

Na Vue 3.x, quando montamos uma aplicação, o seu conteúdo interpretado substituído a `innerHTML` do elemento passamos à `mount`:

```js
const app = Vue.createApp({
  data() {
    return {
      message: 'Hello Vue!'
    }
  },
  template: `
    <div id="rendered">{{ message }}</div>
  `
})

app.mount('#app')
```

Quando esta aplicação é montada à página que tem um `div` com o `id="app"`, isto resultará em:

```html
<body>
  <div id="app" data-v-app="">
    <div id="rendered">Hello Vue!</div>
  </div>
</body>
```

## Estratégia de Migração {#migration-strategy}

[Opção da Construção de Migração: `GLOBAL_MOUNT_CONTAINER`](../migration-build#compat-configuration)

## Consulte Também {#see-also}

- [API `mount`](https://pt.vuejs.org/api/application#app-mount)
