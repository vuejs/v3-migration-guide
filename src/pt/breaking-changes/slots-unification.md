---
badges:
  - breaking
---

# Unificação de Ranhuras <MigrationBadges :badges="$frontmatter.badges" /> {#slots-unification}

## Visão Geral {#overview}

Esta mudança unifica as ranhuras normais e isoladas na 3.x.

Eis um rápido sumário do que mudou:

- `this.$slots` agora expõe as ranhuras como funções
- **RUTURA**: `this.$scopeSlots` foi removida

Para mais informação, continue a ler!

## Sintaxe da 2.x {#_2-x-syntax}

Quando usamos a função de interpretação, por exemplo, a `h`, que a 2.x usava para definir a propriedade de dados `slot` sobre os nós de conteúdo:

```js
// Sintaxe da 2.x
h(LayoutComponent, [
  h('div', { slot: 'header' }, this.header),
  h('div', { slot: 'content' }, this.content)
])
```

Além disto, quando referenciarmos as ranhuras isoladas, poderiam ser referenciadas usando a seguinte sintaxe:

```js
// Sintaxe da 2.x
this.$scopedSlots.header
```

## Sintaxe da 3.x {#_3-x-syntax}

Na 3.x, as ranhuras são definidas como filhas do nó atual como um objeto:

```js
// Sintaxe da 3.x
h(LayoutComponent, {}, {
  header: () => h('div', this.header),
  content: () => h('div', this.content)
})
```

E quando precisarmos de referenciar as ranhuras isoladas programaticamente, agora estão unificadas na opção `$slots`:

```js
// Sintaxe da 2.x
this.$scopedSlots.header

// Sintaxe da 3.x
this.$slots.header()
```

## Estratégia de Migração {#migration-strategy}

Uma grande parte da mudança já foi entregada na 2.6. Como resultado, a migração pode acontecer em um passo:

1. Substituir todas as ocorrências de `this.$scopedSlots` por `this.$slots` na 3.x.
2. Substituir todas as ocorrências de `this.$slots.mySlot` por `this.$slot.mySlot()`.

[Opção da Construção de Migração: `INSTANCE_SCOPED_SLOTS`](../migration-build#compat-configuration)
