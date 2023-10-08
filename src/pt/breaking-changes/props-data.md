---
badges:
  - removed
---

# `propsData` <MigrationBadges :badges="$frontmatter.badges" /> {#propsdata}

## Visão Geral {#overview}

A opção `propsData`, usada para passar propriedades à instância de Vue durante sua criação, foi removido. Para passar propriedades ao componente de raiz duma aplicação de Vue 3, usamos o segundo argumento da [`createApp`](https://pt.vuejs.org/api/application#createapp).

## Sintaxe da 2.x {#_2-x-syntax}

Na 2.x, éramos capazes de passar propriedades à uma instância de Vue durante sua criação:

```js
const Comp = Vue.extend({
  props: ['username'],
  template: '<div>{{ username }}</div>'
})

new Comp({
  propsData: {
    username: 'Evan'
  }
})
```

## Atualização da 3.x {#_3-x-update}

A opção `propsData` foi removida. Se precisarmos de passar propriedades à instância do componente de raiz durante sua criação, devemos usar o segundo argumento da `createApp`:

```js
const app = createApp(
  {
    props: ['username'],
    template: '<div>{{ username }}</div>'
  },
  { username: 'Evan' }
)
```
