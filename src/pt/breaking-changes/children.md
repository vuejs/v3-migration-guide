---
badges:
  - removed
---

# `$children` <MigrationBadges :badges="$frontmatter.badges" /> {#children}

## Visão Geral {#overview}

A propriedade de instância `$children` foi removida da Vue 3.0 e já não é suportada.

## Sintaxe da 2.x {#_2-x-syntax}

Na 2.x, os programadores poderiam acessar os componentes filho direto da instância atual com `this.$children`:

```vue
<template>
  <div>
    <img alt="Vue logo" src="./assets/logo.png">
    <my-button>Change logo</my-button>
  </div>
</template>

<script>
import MyButton from './MyButton'

export default {
  components: {
    MyButton
  },
  mounted() {
    console.log(this.$children) // [VueComponent]
  }
}
</script>
```

## Atualização da 3.x {#_3-x-update}

Na 3.x, a propriedade `$children` foi removida e já não é suportada. Ao invés disto, se precisarmos de acessar uma instância de componente filho, recomendamos usar [referências de modelo de marcação](https://pt.vuejs.org/guide/essentials/template-refs#template-refs).

## Estratégia de Migração {#migration-strategy}

[Opção da Construção de Migração: `INSTANCE_CHILDREN`](../migration-build#compat-configuration)
