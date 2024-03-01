---
badges:
  - breaking
---

# Precedência de `v-if` vs. `v-for` <MigrationBadges :badges="$frontmatter.badges" /> {#v-if-vs-v-for-precedence}

## Visão Geral {#overview}

- **RUTURA**: Se usada sobre o mesmo elemento, `v-if` terá precedência superior do que `v-for`

## Introdução {#introduction}

Duas das diretivas mais usadas comummente na Vue.js são a `v-if` e `v-for`. Então não é de surpreender de que exista um momento quando os programadores querem usar ambas em conjunto. Enquanto isto não é uma prática recomendada, podem existir momentos em que isto é necessário, então queríamos fornecer orientação de como isto funciona.

## Sintaxe da 2.x {#_2-x-syntax}

Na 2.x, quando usamos `v-if` e `v-for` sobre o mesmo elemento, `v-for` receberia a prioridade.

## Sintaxe da 3.x {#_3-x-syntax}

Na 3.x, `v-if` sempre terá precedência superior a `v-for`.

## Estratégia de Migração {#migration-strategy}

É recomendado evitar usar ambos sobre o mesmo elemento devido à ambiguidade da sintaxe.

No lugar de lidar com isto no nível do modelo de marcação, um método de alcançar isto é criar uma propriedade computada que filtra uma lista para os elementos visíveis.

[Opções da Construção de Migração: `COMPILER_V_IF_V_FOR_PRECEDENCE`](../migration-build#compat-configuration)

## Consulte também {#see-also}

- [Interpretação de Lista - Exibição de Resultados Filtrados ou Organizados](https://pt.vuejs.org/guide/essentials/list#displaying-filtered-sorted-results)
- [Interpretação de Lista - `v-for` com `v-if`](https://pt.vuejs.org/guide/essentials/list#v-for-with-v-if)
