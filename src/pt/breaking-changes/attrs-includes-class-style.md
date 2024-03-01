---
badges:
  - breaking
---

# `$attrs` inclui `class` e `style` <MigrationBadges :badges="$frontmatter.badges" /> {#attrs-includes-class-style}

## Visão Geral {#overview}

`$attrs` agora contém _todos_ os atributos passados à um componente, incluindo `class` e `style`.

## Comportamento da 2.x {#_2-x-behavior}

Os atributos `class` e `style` são manipulados de maneira especial na implementação do DOM virtual da Vue 2. Por esta razão, _não_ estão incluídas na `$attrs`, enquanto todos os outros atributos estão.

Um efeito secundário disto manifesta-se quando usamos `inheritAttrs: false`:

- Os atributos na `$attrs` não mais são automaticamente adicionados ao elemento de raiz, deixando-o ao programador decidir onde adicioná-los.
- Mas `class` e `style`, não sendo parte de `$attrs`, ainda serão aplicados ao elemento de raiz do componente:

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

quando usado desta maneira:

```html
<my-component id="my-id" class="my-class"></my-component>
```

...gerará este HTML:

```html
<label class="my-class">
  <input type="text" id="my-id" />
</label>
```

## Comportamento da 3.x {#_3-x-behavior}

`$attrs` contém _todos_ os atributos, o que torna mais fácil aplicar todos eles à um elemento diferente. O exemplo de cima agora gera o seguinte HTML:

```html
<label>
  <input type="text" id="my-id" class="my-class" />
</label>
```

## Estratégia de Migração {#migration-strategy}

Nos componentes que usam `inheritAttrs: false`, devemos certificar-nos de que a estilização ainda funciona como pretendida. Se anteriormente dependíamos do comportamento especial de `class` e `style`, alguns visuais podem estar quebrados visto que estes atributos agora podem ser aplicados à um outro elemento.

[Opção da Construção de Migração: `INSTANCE_ATTRS_CLASS_STYLE`](../migration-build#compat-configuration)

## Consulte também {#see-also}

- [RFC Relevante](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0031-attr-fallthrough.md)
- [Guia de Migração - `$attrs` inclui `class` e `style`](./attrs-includes-class-style)
- [Guia de Migração - Mudanças na API de Funções de Interpretação](./render-function-api)
- [Guia de Migração - Nova Opção `emits`](./emits-option)
- [Guia de Migração - modificador `.native` removido](./v-on-native-modifier-removed)
