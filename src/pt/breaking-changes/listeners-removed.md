---
badges:
  - breaking
---

# `$listeners` removido <MigrationBadges :badges="$frontmatter.badges" /> {#listeners-removed}

## Visão Geral {#overview}

O objeto `$listeners` foi removido na Vue 3. Os ouvintes de evento agora são parte de `$attrs`:

```js
{
  text: 'this is an attribute',
  onClose: () => console.log('close Event triggered')
}
```

## Sintaxe da 2.x {#_2-x-syntax}

Na Vue 2, podemos acessar os atributos passados aos nossos componentes com `this.$attrs`, e os ouvintes de evento com `this.$listeners`. Em combinação com `inheritAttrs: false`, permitem o programador aplicar estes atributos e ouvintes à algum outro elemento ao invés do elemento de raiz:

```html
<template>
  <label>
    <input type="text" v-bind="$attrs" v-on="$listeners" />
  </label>
</template>
<script>
  export default {
    inheritAttrs: false
  }
</script>
```

## Sintaxe da 3.x {#_3-x-syntax}

No DOM virtual da Vue 3, os ouvintes de evento agora são apenas atributos, prefixados com `on`, e como tais são parte do objeto `$attrs`, então `$listeners` foi removido:

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

Se este componente recebesse um atributo `id` e um ouvinte `v-on:close`, o objeto `$attrs` agora parecer-se-á com isto:

```js
{
  id: 'my-input',
  onClose: () => console.log('close Event triggered')
}
```

## Estratégia de Migração {#migration-strategy}

Remover todos os usos de `$listeners`.

[Opção da Construção de Migração: `INSTANCE_LISTENERS`](../migration-build#compat-configuration)

## Consulte também {#see-also}

- [RFC Relevante](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0031-attr-fallthrough.md)
- [Guia de Migração - `$attrs` inclui `class` & `style`](./attrs-includes-class-style)
- [Guia de Migração - Mudanças na API de Funções de Interpretação](./render-function-api)
- [Guia de Migração - Nova Opção `emits`](./emits-option)
- [Guia de Migração - modificador `.native` removido](./v-on-native-modifier-removed)
