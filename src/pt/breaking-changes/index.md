# Mudanças de Rutura {#breaking-changes}

Esta página lista todas as mudanças de rutura da Vue 3 a partir da Vue 2.

Embora pareça que muito tem mudado, muito do que conhecemos e amamos sobre a Vue ainda é o mesmo; mas queríamos ser o mais exaustivos possível e fornecer explicações e exemplos detalhados para cada mudança documentada.

## Detalhes {#details}

### API Global {#global-api}

- [A API Global da Vue está alterada para usar uma instância de aplicação](./global-api)
- [As APIs internas e globais foram reestruturadas para ser passíveis a agitação da árvore](./global-api-treeshaking)

### Diretivos do Modelo de Marcação {#template-directives}

- [O uso de `v-model` sobre os componentes foi re-trabalhado, substituindo o `v-bind.sync`](./v-model)
- [O uso de `key` sobre `<template v-for>` e nós que não são `v-for` mudou](./key-attribute)
- [a precedência de `v-if` e `v-for` quando usada sobre o mesmo elemento mudou](./v-if-v-for)
- [`v-bind="object"` agora é sensível a ordem](./v-bind)
- [O modificador `v-on:event.native` foi removido](./v-on-native-modifier-removed)

### Componentes {#components}

- [Os componentes funcionais apenas podem ser criados usando uma função simples](./functional-components)
- [O atributo `functional` sobre o `<template>` do componente de ficheiro único e a opção de componente `functional` foram depreciados](./functional-components)
- [Os componentes assíncronos agora exigem que o método `defineAsyncComponent` para serem criados](./async-components)
- [Os eventos do componente agora devem ser declarados com a opção `emits`](./emits-option)

### Função de Interpretação {#render-function}

- [A API da função de interpretação mudou](./render-function-api)
- [A propriedade `$scopedSlots` foi removida e todas as ranhuras são expostas através de `$slots` como funções](./slots-unification)
- [`$listeners` foi removido / combinado ao `$attrs`](./listeners-removed)
- [`$attrs` agora inclui os atributos `class` e `style`](./attrs-includes-class-style)

### Elementos Personalizados {#custom-elements}

- [As verificações de elemento personalizado agora são realizadas durante a compilação do modelo de marcação](./custom-elements-interop)
- [O uso do atributo `is` especial está restrito apenas ao marcador `<component>` reservado](./custom-elements-interop#customized-built-in-elements)

### Outras Pequenas Mudanças {#other-minor-changes}

- A opção do ciclo de vida `destroyed` foi renomeada para `unmounted`
- A opção do ciclo de vida `beforeDestroy` foi renomeada para `beforeUnmount`
- [A função de fábrica `default` das propriedades não mais tem acesso ao contexto de `this`](./props-default-this)
- [A API de diretiva personalizada mudou para alinhar com o ciclo de vida do componente e `binding.expression` foi removida](./custom-directives)
- [A opção `data` deve ser sempre declarada como uma função](./data-option)
- [A opção `data` das misturas agora é combinada superficialmente](./data-option#mixin-merge-behavior-change)
- [A estratégia de coerção de atributos mudou](./attribute-coercion)
- [Algumas classes de transição foram renomeadas](./transition)
- [`<TransitionGroup>` agora não desenha nenhum elemento envolvente por padrão](./transition-group)
- [Quando observamos um vetor, a função de resposta apenas acionará quando o vetor for substituído. Se precisarmos acionar sobre a mutação, a opção `deep` deve ser especificada](./watch)
- Os marcadores `<template>` sem diretivas especiais (`v-if/else-if/else`, `v-for`, ou `v-slot`) agora são tratados como elementos simples e resultarão num elemento `<template>` nativo ao invés de desenhar o seu conteúdo interno.
- [A aplicação montada não substitui o elemento em que está montado](./mount-changes)
- [O prefixo de eventos `hook:` do ciclo de vida mudou para `vnode-`](./vnode-lifecycle-events)

### APIs Removidas {#removed-apis}

- [Suporte de `keyCode` como modificadores de `v-on`](./keycode-modifiers)
- [Os métodos de instância `$on`, `$off` and `$once`](./events-api)
- [Filtros](./filters)
- [Os atributos dos modelos de marcação embutidos](./inline-template-attribute)
- [A propriedade de instância `$children`](./children)
- [A opção `propsData`](./props-data)
- Método de instância `$destroy`. Os utilizadores não mais gerem manualmente o ciclo de vida dos componentes da Vue individuais.
- As funções globais `set` e `delete`, e os métodos de instância `$set` e `$delete`. Já não são exigidos com a deteção de mudança baseada em delegação.
