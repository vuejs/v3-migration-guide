---
badges:
  - breaking
---

# Componentes Funcionais <MigrationBadges :badges="$frontmatter.badges" /> {#functional-components}

## Visão Geral {#overview}

Em termos do que mudou, num alto nível:

- O desempenho ganho a partir da 2.x para os componentes funcionais agora são insignificantes na 3.x, então recomendamos apenas usar os componentes com estado.
- Os componentes funcionais apenas podem ser criados usando uma função simples que recebe `props` e `context` (por exemplo, `slots`, `attrs`, `emit`).
- **RUTURA:** o atributo `functional` no `<template>` do componente de ficheiro único foi removido
- **RUTURA:** a opção `{ functional: true }` nos componentes criados por funções foi removida

Para mais informação, continue a ler!

## Introdução {#introduction}

Na Vue 2, os componentes funcionais tinham dois casos de uso primários:

- como uma otimização de desempenho, porque inicializavam muito mais rápido do que os componentes com estado
- para retornar vários nós de raiz

No entanto, na Vue 3, o desempenho dos componentes de estado melhorou ao ponto que a diferença é insignificante. Além disto, agora os componentes de estado também incluem a habilidade de retornar vários nós de raiz.

Como resultado, o único caso de uso restante para os componentes funcionais é para componentes simples, tais como um componente que cria um cabeçalho dinâmico. De outro modo, é recomendado usar os componentes de estado como normalmente faríamos.

## Sintaxe da 2.x {#_2-x-syntax}

Usar o componente `<dynamic-heading>`, que é responsável para desenhar o cabeçalho apropriado (por exemplo, `h1`, `h2`, `h3`, etc.), este poderia ter sido escrito como um componente de ficheiro único na 2.x como:

```js
// Exemplo de Componente Funcional da Vue 2
export default {
  functional: true,
  props: ['level'],
  render(h, { props, data, children }) {
    return h(`h${props.level}`, data, children)
  }
}
```

Ou, para os que prefeririam o `<template>` num componente de ficheiro único:

```vue
<!-- Exemplo de Componente Funcional da Vue 2 com <template> -->
<template functional>
  <component
    :is="`h${props.level}`"
    v-bind="attrs"
    v-on="listeners"
  />
</template>

<script>
export default {
  props: ['level']
}
</script>
```

## Sintaxe da 3.x {#_3-x-syntax}

### Componentes Criados por Funções {#components-created-by-functions} 

Agora na Vue 3, todos os componentes funcionais são criados com uma função simples. Em outras palavras, não existe necessidade de definir a opção de componente `{ functional: true }`.

Eles receberão dois argumentos: `props` e `context`. O argumento `context` é um objeto que contém as propriedades `attrs`, `slots`, e `emit` dum componente.

Além disto, ao invés de fornecer implicitamente `h` numa função `render`, `h` agora é importada globalmente.

Usando o exemplo mencionado anteriormente dum componente `<dynamic-heading>`, eis como se parece agora:

```js
import { h } from 'vue'

const DynamicHeading = (props, context) => {
  return h(`h${props.level}`, context.attrs, context.slots)
}

DynamicHeading.props = ['level']

export default DynamicHeading
```

### Componentes de Ficheiro Único {#single-file-components-sfcs}

Na 3.x, a diferença de desempenho entre os componentes de estado e funcionais tem sido drasticamente reduzida e será insignificante na maioria dos casos de uso. COmo resultado, o caminho de migração para os programadores usando `functional` nos componentes de ficheiro único é remover o atributo e renomear todas as referências de `props` para `$props` e `attrs` para `$attrs`.

Usando o nosso exemplo `<dynamic-heading>` do exemplo de antes, eis como se pareceria agora:

```vue{1,3,4}
<template>
  <component
    v-bind:is="`h${$props.level}`"
    v-bind="$attrs"
  />
</template>

<script>
export default {
  props: ['level']
}
</script>
```

As principais diferenças são que:

1. O atributo `functional` foi removido da `<template>`
2. Os `listeners` agora são passados como parte de `$attrs` e podem ser removidas

## Próximos Passos {#next-steps}

Para mais informação sobre o uso dos novos componentes funcionais e mudanças para desenhar funções em geral, consulte:

- [Migração: Funções de Interpretação](./render-function-api)
- [Guia: Funções de Interpretação](https://pt.vuejs.org/guide/extras/render-function#render-functions-jsx)
- [Opções da Construção de Migração: `COMPONENT_FUNCTIONAL`](../migration-build#compat-configuration)
