---
badges:
  - breaking
---

# Atributo `inline-template` <MigrationBadges :badges="$frontmatter.badges" /> {#inline-template-attribute}

## Visão Geral {#overview}

O suporte para a [funcionalidade `inline-template`](https://vuejs.org/v2/guide/components-edge-cases.html#Inline-Templates) foi removido.

## Sintaxe da 2.x {#_2-x-syntax}

Na 2.x, a Vue fornecia o atributo `inline-template` sobre os componentes filho para usar o seu conteúdo interno como seu modelo de marcação ao invés de tratá-lo como conteúdo distribuído:

```html
<my-component inline-template>
  <div>
    <p>These are compiled as the component's own template.</p>
    <p>Not parent's transclusion content.</p>
  </div>
</my-component>
```

## Sintaxe da 3.x {#_3-x-syntax}

Esta funcionalidade já não será suportada.

## Estratégia de Migração {#migration-strategy}

A maioria dos casos de uso para `inline-template` presumem uma configuração sem ferramenta de construção, onde todos os modelos de marcação são escritos diretamente dentro da página HTML.

[Opção da Construção de Migração: `COMPILER_INLINE_TEMPLATE`](../migration-build#compat-configuration)

### Opção #1: Usar o marcador `<script>` {#option-1-use-script-tag}

A solução mais direta em tais casos é usar o `<script>` com um tipo alternativo:

```html
<script type="text/html" id="my-comp-template">
  <div>{{ hello }}</div>
</script>
```

E no componente, apontamos o modelo de marcação usando um seletor:

```js
const MyComp = {
  template: '#my-comp-template'
  // ...
}
```

Isto não exige nenhuma configuração de construção, funciona em todos os navegadores, não está sujeito à quaisquer advertências de analise de HTML no DOM (por exemplo, podemos usar nomes de propriedade de caixaDeCamelo), e fornece destacamento de sintaxe apropriado na maioria dos ambientes de desenvolvimento integrado. Nas abstrações do lado do servidor tradicionais, estes modelos de marcação podem ser separados em parciais de modelo de marcação do servidor (incluído no modelo de marcação de HTML principal) para melhor facilidade de manutenção.

### Opção #2: Ranhura Padrão {#option-2-default-slot}

Um componente anteriormente usando `inline-template` também pode ser refeito usando a ranhura padrão - a qual torna o isolamento de dados mais explícito enquanto preservamos a conveniência de escrever o componente filho em linha:

```html
<!-- Sintaxe da 2.x -->
<my-comp inline-template :msg="parentMsg">
  {{ msg }} {{ childState }}
</my-comp>

<!-- Versão da Ranhura Padrão -->
<my-comp v-slot="{ childState }">
  {{ parentMsg }} {{ childState }}
</my-comp>
```

O filho, ao invés de fornecer nenhum modelo de marcação, agora deve interpretar a ranhura padrão \*:

```html
<!--
  no modelo de marcação do filho, interpretar a ranhura padrão
  enquanto passamos o estado privado necessário do filho.
-->
<template>
  <slot :childState="childState" />
</template>
```

> - Nota: Na 3.x, as ranhuras podem ser interpretadas como raiz com o suporte de [fragmentos](../new/fragments) nativos!
