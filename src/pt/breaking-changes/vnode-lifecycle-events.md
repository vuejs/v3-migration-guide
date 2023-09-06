---
badges:
  - breaking
---

# Eventos do Ciclo de Vida do Nó Virtual <MigrationBadges :badges="$frontmatter.badges" /> {#vnode-lifecycle-events}

## Visão Geral {#overview}

Na Vue 2, era possível usar eventos para ouvir os estágios principais do ciclo de vida dum componente. Estes eventos tinham nomes que começavam com o prefixo `hook:`, seguido pelo nome do gatilho do ciclo de vida correspondente.

Na Vue 3, este prefixo foi mudado para `vue:`. Além disto, estes eventos agora estão disponíveis para os elementos de HTML, bem como para componentes.

## Sintaxe da 2.x {#_2-x-syntax}

Na Vue 2, o nome do evento é o mesmo que o gatilho do ciclo de vida equivalente, prefixado com `hook:`:

```html
<template>
  <child-component @hook:updated="onUpdated">
</template>
```

## Sintaxe 3.x {#_3-x-syntax}

Na Vue 3, o nome do evento é prefixado com `vue:`:

```html
<template>
  <child-component @vue:updated="onUpdated">
</template>
```

## Estratégia de Migração {#migration-strategy}

Na maioria dos casos, basta alterar o prefixo. Os gatilhos do ciclo de vida `beforeDestroy` e `destroyed` foram renomeado para `beforeUnmount` e `unmounted` respetivamente, então os nomes de evento correspondente também precisarão ser atualizados.

[Opções da Construção de Migração: `INSTANCE_EVENT_HOOKS`](../migration-build#compat-configuration)

## Consulte Também {#see-also}

- [Guia de Migração - API de Eventos](./events-api)
