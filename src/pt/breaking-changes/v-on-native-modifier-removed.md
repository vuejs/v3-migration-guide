---
badges:
  - breaking
---

# Modificador `v-on.native` removido <MigrationBadges :badges="$frontmatter.badges" /> {#v-on-native-modifier-removed}

## Visão Geral {#overview}

O modificador `.native` para `v-on` foi removido.

## Sintaxe da 2.X {#_2-x-syntax}

Os ouvintes de eventos passados para um componente com `v-on` são por padrão apenas acionados emitindo um evento com `this.$emit`. Para adicionar um ouvinte de DOM nativo ao elemento de raiz do componente filho, o modificador `.native` pode ser usado:

```html
<my-component
  v-on:close="handleComponentEvent"
  v-on:click.native="handleNativeClickEvent"
/>
```

## Sintaxe da 3.x {#_3-x-syntax}

O modificador `.native` para `v-on` foi removido. Ao mesmo tempo, a [nova opção `emits`](./emits-option) permite o filho definir quais eventos realmente emitir.

Consequentemente, agora a Vue adicionará ouvintes de evento que _não_ são definidos como eventos emitidos pelo componente no filho como ouvintes de evento nativo ao elemento de raiz do filho (a menos que `inheritAttrs: false` tivesse sido defino nas opções do filho):

```html
<my-component
  v-on:close="handleComponentEvent"
  v-on:click="handleNativeClickEvent"
/>
```

`MyComponent.vue`

```html
<script>
  export default {
    emits: ['close']
  }
</script>
```

## Estratégia de Migração {#migration-strategy}

- Remover todas instâncias do modificador `.native`.
- Garantir que todos os nossos componentes documentam os seus eventos com a opção `emits`.

[Opção da Construção de Migração: `COMPILER_V_ON_NATIVE`](../migration-build#compat-configuration)

## Consulte Também {#see-also}

- [RFC Relevante](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0031-attr-fallthrough.md#v-on-listener-fallthrough)
- [Guia de Migração - Nova Opção `emits`](./emits-option)
- [Guia de Migração - `$listeners` removida](./listeners-removed)
- [Guia de Migração - Mudanças na API de Funções de Interpretação](./render-function-api)
