---
badges:
  - new
---

# Opção `emits` <MigrationBadges :badges="$frontmatter.badges" /> {#emits-option}

## Visão Geral {#overview}

A Vue 3 agora oferece uma opção `emits`, semelhante à opção `props` existente. Esta opção pode ser usada para definir os eventos que um componente pode emitir ao seu pai.

## Comportamento da 2.x {#_2-x-behavior}

Na Vue 2, podemos definir as propriedades que um componente recebe, mas não podemos declarar quais eventos pode emitir:

```vue
<template>
  <div>
    <p>{{ text }}</p>
    <button v-on:click="$emit('accepted')">OK</button>
  </div>
</template>
<script>
  export default {
    props: ['text']
  }
</script>
```

## Comportamento da 3.x {#_3-x-behavior}

Semelhante às propriedades, os eventos que o componente emite agora podem ser definido com a opção `emits`:

```vue
<template>
  <div>
    <p>{{ text }}</p>
    <button v-on:click="$emit('accepted')">OK</button>
  </div>
</template>
<script>
  export default {
    props: ['text'],
    emits: ['accepted']
  }
</script>
```

A opção também aceita um objeto, que permite o programador definir validadores para os argumentos que são passados com o evento emitido, semelhante aos validadores nas definições de `props`.

Para mais informação sobre isto, leia a [documentação da API para esta funcionalidade](https://pt.vuejs.org/api/options-state#emits).

## Estratégia de Migração {#migration-strategy}

É altamente recomendado que documentamos todos os eventos emitidos por cada um dos nossos componentes usando `emits`.

Isto é especialmente importante porque da [remoção do modificador `.native`](./v-on-native-modifier-removed). Quaisquer ouvintes para eventos que não são declarados com `emits` agora serão incluídos na `$attrs` do componente, que por padrão serão vinculados ao nó de raiz do componente.

### Exemplo {#example}

Para os componentes que re-emitem eventos nativos aos seus pais, este agora conduziria à dois eventos sendo disparados:

```vue
<template>
  <button v-on:click="$emit('click', $event)">OK</button>
</template>
<script>
export default {
  emits: [] // sem evento declarado
}
</script>
```

Quando um pai ouve o evento de `click` sobre o componente:

```html
<my-button v-on:click="handleClick"></my-button>
```

Agora seria acionado _duas vezes_:

- Uma vez a partir da `$emit()`.
- Uma vez a partir do ouvinte de evento nativo aplicado ao elemento de raiz.

Eis que temos duas opções:

1. Declarar apropriadamente o evento `click`. Isto é útil se de fato adicionarmos alguma lógica à este manipulador de evento no `<my-button>`.
2. Remover a re-emissão do evento, uma vez que o pai agora pode ouvir o evento nativo facilmente, sem adicionar `.native`. Adequada quando realmente apenas re-emitimos o evento de qualquer modo.

## Consulte também {#see-also}

- [RFC Relevante](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0030-emits-option)
- [Guia de Migração - modificador `.native` removido](./v-on-native-modifier-removed)
- [Guia de Migração - `$listeners` removido](./listeners-removed)
- [Guia de Migração - `$attrs` inclui `class` e `style`](./attrs-includes-class-style)
- [Guia de Migração - Mudanças na API de Funções de Interpretação](./render-function-api)
