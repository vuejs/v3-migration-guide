---
badges:
  - breaking
---

# API da Função de Interpretação <MigrationBadges :badges="$frontmatter.badges" /> {#render-function-api}

## Visão Geral {#overview}

Esta mudança não afetará os utilizadores de `<template>`.

Eis um  rápido sumário do que mudou:

- `h` agora é globalmente importada ao invés de passada para as funções de interpretação como um argumento
- Os argumentos da função de interpretação mudaram para serem mais consistentes entre os componentes de estado e funcionais
- Os nós virtuais agora têm uma estrutura de propriedades plana

Para mais informação, continue a ler!

## Argumento da Função de Interpretação {#render-function-argument}

### Sintaxe da 2.x {#_2-x-syntax}

Na 2.x, a função `render` receberia automaticamente a função `h` (que é um pseudónimo convencional para `createElement`) como um argumento:

```js
// Exemplo da Função de Interpretação da Vue 2
export default {
  render(h) {
    return h('div')
  }
}
```

### Sintaxe da 3.x {#_3-x-syntax}

Na 3.x, `h` agora é importada globalmente ao invés de ser automaticamente passada como um argumento.

```js
// Exemplo da Função de Interpretação da Vue 3
import { h } from 'vue'

export default {
  render() {
    return h('div')
  }
}
```

## Formato das Propriedades do Nó Virtual {#vnode-props-format}

### Sintaxe da 2.x {#_2-x-syntax-1}

Na 2.x, `domProps` continha uma lista encaixada dentro das propriedades do nó virtual:

```js
// 2.x
{
  staticClass: 'button',
  class: {'is-outlined': isOutlined },
  staticStyle: { color: '#34495E' },
  style: { backgroundColor: buttonColor },
  attrs: { id: 'submit' },
  domProps: { innerHTML: '' },
  on: { click: submitForm },
  key: 'submit-button'
}
```

### Sintaxe da 3.x {#_3-x-syntax-1}

Na 3.x, a estrutura inteira de propriedades do nó virtual foi aplanada. Usando o exemplo de cima, eis como se pareceria agora:

```js
// Sintaxe da 3.x
{
  class: ['button', { 'is-outlined': isOutlined }],
  style: [{ color: '#34495E' }, { backgroundColor: buttonColor }],
  id: 'submit',
  innerHTML: '',
  onClick: submitForm,
  key: 'submit-button'
}
```

## Componente Registado {#registered-component}

### Sintaxe da 2.x {#_2-x-syntax-2}

Na 2.x, quando um componente era registado, a função de interpretação funcionaria bem quando passamos o nome do componente como uma sequência de caracteres ao primeiro argumento:

```js
// 2.x
Vue.component('button-counter', {
  data() {
    return {
      count: 0
    }
  }
  template: `
    <button @click="count++">
      Clicked {{ count }} times.
    </button>
  `
})

export default {
  render(h) {
    return h('button-counter')
  }
}
```

### Sintaxe da 3.x {#_3-x-syntax-2}

Na 3.x, com os nós virtuais sendo livres de contexto, já não podemos usar um identificador de sequência de caracteres para procurar implicitamente os componentes registados. No lugar disto, precisamos usar um método `resolveComponent` importado:

```js
// 3.x
import { h, resolveComponent } from 'vue'

export default {
  setup() {
    const ButtonCounter = resolveComponent('button-counter')
    return () => h(ButtonCounter)
  }
}
```

Para mais informação, consulte o [RFC da Mudança da API da Função de Interpretação](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0008-render-function-api-change.md#context-free-vnodes).

## Estratégia de Migração {#migration-strategy}

[Opção da Construção de Migração: `RENDER_FUNCTION`](../migration-build#compat-configuration)

### Autores de Biblioteca {#library-authors}

`h` sendo importada globalmente significa que qualquer biblioteca que contém componentes de Vue incluirá `import { h } from vue` em algum lugar. Como resultado, isto cria um pouco de custo uma vez que exige que os autores de biblioteca configurem apropriadamente a exteriorização da Vue em suas configurações de construção:

- A Vue não deve ser empacotada na biblioteca
- Para construções de módulo, a importação deve ser isolada e ser manipulada pelo empacotador do utilizador final
- Para construções do UMD / navegador, deve tentar primeiro a `Vue.h` e o recuo para exigir chamadas

## Próximos Passos {#next-steps}

Consulte o [Guia da Função de Interpretação](https://pt.vuejs.org/guide/extras/render-function) por documentação mais detalhada!
