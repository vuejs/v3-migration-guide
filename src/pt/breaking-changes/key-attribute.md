---
badges:
  - breaking
---

# Atributo `key` <MigrationBadges :badges="$frontmatter.badges" /> {#key-attribute}

## Visão Geral {#overview}

- **NOVO:** as `key` não são mais necessárias nos ramos de `v-if`/`v-else`/`v-else-if`, porque agora a Vue gera as `key` únicas automaticamente.
  - **RUTURA:** Se fornecermos manualmente as `key`, então cada ramo deve usar uma única `key`. Nós não podemos mais usar intencionalmente a mesma `key` para forçar reutilização do ramo.
- **RUTURA:** a `key` do `<template v-for>` deve ser colocada sobre o marcador `<template>` (ao invés de colocar sobre os seus filhos).

## Proveniência {#background}

O atributo especial `key` é usado como uma sugestão para o algoritmo do DOM virtual da Vue continuar a rastrear a identidade dum nó. Deste maneira, a Vue sabe quando pode re-usar e remendar nós existentes e quando precisa reorganizar ou recriá-los. Para mais informação, consulte as seguintes seções:

- [Interpretação de Lista: Mantendo o Estado](https://pt.vuejs.org/guide/essentials/list#maintaining-state-with-key)
- [Referência da API: Atributo Especial `key`](https://pt.vuejs.org/api/built-in-special-attributes#key)

## Sobre os Ramos Condicionais {#on-conditional-branches}

Na Vue 2.x, era recomendado usar as `key` sobre os ramos de `v-if`/`v-else`/`v-else-if`:

```html
<!-- Vue 2.x -->
<div v-if="condition" key="yes">Yes</div>
<div v-else key="no">No</div>
```

O exemplo acima ainda funciona na Vue 3.x. No entanto, não mais recomendamos usar o atributo `key` sobre os ramos de `v-if`/`v-else`/`v-else-if`, porque agora as `key` são geradas automaticamente sobre os ramos condicionais se não as fornecermos:

```html
<!-- Vue 3.x -->
<div v-if="condition">Yes</div>
<div v-else>No</div>
```

A mudança de rutura é que se fornecermos manualmente as `key`, cada ramo deve usar uma `key` única. Na maioria dos casos, podemos remover estas `key`:

```html
<!-- Vue 2.x -->
<div v-if="condition" key="a">Yes</div>
<div v-else key="a">No</div>

<!-- Vue 3.x (solução recomendada: remover as chaves) -->
<div v-if="condition">Yes</div>
<div v-else>No</div>

<!-- Vue 3.x (solução alternativa: garantir que as chaves são únicas) -->
<div v-if="condition" key="a">Yes</div>
<div v-else key="b">No</div>
```

## Com o `<template v-for>` {#with-template-v-for}

Na Vue 2.x, um marcador `<template>` poderia não ter uma `key`. Ao invés disto, poderíamos colocar as `key` sobre cada um dos seus filhos:

```html
<!-- Vue 2.x -->
<template v-for="item in list">
  <div :key="'heading-' + item.id">...</div>
  <span :key="'content-' + item.id">...</span>
</template>
```

Na Vue 3.x, a `key` deve ser colocada sobre o marcador `<template>`:

```html
<!-- Vue 3.x -->
<template v-for="item in list" :key="item.id">
  <div>...</div>
  <span>...</span>
</template>
```

De maneira semelhante, quando usamos `<template v-for>` com um filho que usa `v-if`, a `key` deve ser promovida para o marcador `<template>`:

```html
<!-- Vue 2.x -->
<template v-for="item in list">
  <div v-if="item.isVisible" :key="item.id">...</div>
  <span v-else :key="item.id">...</span>
</template>

<!-- Vue 3.x -->
<template v-for="item in list" :key="item.id">
  <div v-if="item.isVisible">...</div>
  <span v-else>...</span>
</template>
```
