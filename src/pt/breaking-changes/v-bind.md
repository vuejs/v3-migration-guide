---
badges:
  - breaking
---

# Comportamento de Fusão de `v-bind` <MigrationBadges :badges="$frontmatter.badges" /> {#v-bind-merge-behavior}

## Visão Geral {#overview}

- **RUTURA**: Ordem dos vínculos para `v-bind` afetará o resultado da interpretação.

## Introdução {#introduction}

Quando vinculamos dinamicamente os atributos num elemento, um cenário comum envolve usar ambas a sintaxe `v-bind="object"` bem como atributos individuais no mesmo elemento. No entanto, isto levanta questões quanto a prioridade da combinação.

## Sintaxe da 2.x {#_2-x-syntax}

Na 2.x, se um elemento tinha ambos `v-bind="object"` e um atributo individual idêntico definidos, o atributo individual sempre sobrescreveria os vínculos na `object`:

```html
<!-- modelo de marcação -->
<div id="red" v-bind="{ id: 'blue' }"></div>
<!-- resultado -->
<div id="red"></div>
```

## Sintaxe da 3.x {#_3-x-syntax}

Na 3.x, se um elemento tiver ambos `v-bind="object"` e um um atributo individual idêntico definidos, a ordem de como os vínculos são declarados determina como serão combinados. Em outras palavras, ao invés de assumir que os programadores querem que o atributo individual sempre sobreponha o que foi definido no `object`, agora os programadores têm mais controlo sobre o comportamento de combinação desejado:

```html
<!-- modelo de marcação -->
<div id="red" v-bind="{ id: 'blue' }"></div>
<!-- resultado -->
<div id="blue"></div>

<!-- modelo de marcação -->
<div v-bind="{ id: 'blue' }" id="red"></div>
<!-- resultado -->
<div id="red"></div>
```

## Estratégia de Migração {#migration-strategy}

Se dependemos desta funcionalidade de sobreposição para `v-bind`, atualmente recomendamos garantir que o nosso atributo `v-bind` está definido antes dos atributos individuais.

[Opção de Construção de Migração: `COMPILER_V_BIND_OBJECT_ORDER`](../migration-build#compat-configuration)
