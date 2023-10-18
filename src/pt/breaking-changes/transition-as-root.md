---
badges:
  - breaking
---

# Transição como Raiz <MigrationBadges :badges="$frontmatter.badges" /> {#transition-as-root}

## Visão Geral {#overview}

Usar um `<transition>` como uma raiz do componente já não acionará as transições quando o componente for alternado a partir de fora.

## Comportamento da 2.x {#_2-x-behavior}

Na Vue 2, era possível acionar uma transição a partir de fora dum componente usando um `<transition>` como a raiz do componente:

```html
<!-- componente de modal -->
<template>
  <transition>
    <div class="modal"><slot/></div>
  </transition>
</template>
```

```html
<!-- uso -->
<modal v-if="showModal">hello</modal>
```

Alternar o valor do `showModal` acionaria uma transição dentro do componente de modal.

Isto funcionava por acidente, não por desenho. Um `<transition>` é suposto ser acionado pelas mudanças aos seus filhos, não pela alternância do próprio `<transition>`.

Esta peculiaridade agora foi removida.

## Estratégia de Migração {#migration-strategy}

Um efeito semelhante pode ser alcançado passando uma propriedade ao componente:

```vue
<template>
  <transition>
    <div v-if="show" class="modal"><slot/></div>
  </transition>
</template>
<script>
export default {
  props: ['show']
}
</script>
```

```html
<!-- uso -->
<modal :show="showModal">hello</modal>
```

## Consulte Também {#see-also}

- [Algumas classes de transição foram renomeadas](./transition)
- [`<TransitionGroup>` agora não desenha nenhum elemento envolvente por padrão](./transition-group)