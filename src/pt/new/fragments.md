---
badges:
  - new
---

# Fragmentos <MigrationBadges :badges="$frontmatter.badges" /> {#fragments}

## Visão Geral {#overview}

Na Vue 3, os componentes agora têm suporte oficial para componentes de nó de várias raízes, por exemplo, fragmentos!

## Sintaxe da 2.x {#_2-x-syntax}

Na 2.x, os componentes de várias raízes não eram suportados e emitiriam um aviso quando um utilizador acidentalmente criava uma. Como resultado, muitos componentes são envolvidos num único `<div>` no sentido de corrigir este erro.

```html
<!-- Layout.vue -->
<template>
  <div>
    <header>...</header>
    <main>...</main>
    <footer>...</footer>
  </div>
</template>
```

## Sintaxe da 3.x {#_3-x-syntax}

Na 3.x, os componentes agora podem ter nós de várias raízes! No entanto, isto exige que os programadores definam explicitamente onde os atributos deveriam ser distribuídos.

```html
<!-- Layout.vue -->
<template>
  <header>...</header>
  <main v-bind="$attrs">...</main>
  <footer>...</footer>
</template>
```

Para mais informações sobre como a herança de atributo funciona, consulte os [Atributos de Passagem](https://pt.vuejs.org/guide/components/attrs#fallthrough-attributes).
