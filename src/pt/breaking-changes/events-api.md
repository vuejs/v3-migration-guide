---
badges:
  - breaking
---

# API de Eventos <MigrationBadges :badges="$frontmatter.badges" /> {#events-api}

## Visão Geral {#overview}

Os métodos de instância `$on`, `$off`, e `$once` foram removidos. As instâncias do componente já não implementam a interface emissora de evento.

## Sintaxe da 2.x {#_2-x-syntax}

Na 2.x, uma instância de Vue poderia ser usada para acionar manipuladores anexados imperativamente através da API emissora de evento (`$on`, `$off` e `$once`). Isto poderia ser usado para criar um _autocarro de evento_ para criar ouvintes de evento global usados por toda aplicação:

```js
// eventBus.js

const eventBus = new Vue()

export default eventBus
```

```js
// ChildComponent.vue
import eventBus from './eventBus'

export default {
  mounted() {
    // adicionado ouvinte do `eventBus`
    eventBus.$on('custom-event', () => {
      console.log('Custom event triggered!')
    })
  },
  beforeDestroy() {
    // removendo o ouvinte do `eventBus`
    eventBus.$off('custom-event')
  }
}
```

```js
// ParentComponent.vue
import eventBus from './eventBus'

export default {
  methods: {
    callGlobalCustomEvent() {
      eventBus.$emit('custom-event') // se `ChildComponent` estiver montado, teremos uma mensagem na consola
    }
  }
}
```

## Atualização da 3.x {#_3-x-update}

Nós removemos completamente os métodos `$on`, `$off` e `$once` da instância. `$emit` ainda é uma parte da API existente uma vez que é usado para acionar os manipuladores de evento anexados de maneira declarativa por um componente pai.

## Estratégia de Migração {#migration-strategy}

[Opção da Construção de Migração: `INSTANCE_EVENT_EMITTER`](../migration-build#compat-configuration)

Na Vue 3, já não é possível usar estas APIs para ouvir os eventos emitidos por um componente a partir de dentro dum componente. Não existe nenhum caminho de migração para este caso de uso.

### Eventos do Componente de Raiz {#root-component-events}

Os ouvintes de evento estático podem ser adicionados ao componente de raiz passando-os como propriedades ao `createApp`:

```js
createApp(App, {
  // Ouvir o evento 'expand'
  onExpand() {
    console.log('expand')
  }
})
```

### Autocarro de Evento {#event-bus}

O padrão de autocarro de evento pode ser substituído usando uma biblioteca externa implementando a interface emissora de evento, por exemplo [`mitt`](https://github.com/developit/mitt) ou [`tiny-emitter`](https://github.com/scottcorgan/tiny-emitter).

Exemplo:

```js
// eventBus.js
import emitter from 'tiny-emitter/instance'

export default {
  $on: (...args) => emitter.on(...args),
  $once: (...args) => emitter.once(...args),
  $off: (...args) => emitter.off(...args),
  $emit: (...args) => emitter.emit(...args)
}
```

Isto fornece a mesma API emissora de evento que na Vue 2.

Na maioria das circunstâncias, o uso dum autocarro de evento global para comunicação entre componentes é desencorajada. Embora seja frequentemente a solução mais simples a curto prazo, quase sempre se revela uma dor de cabeça para a manutenção a longo prazo. Dependendo das circunstâncias, existem várias alternativas para o uso dum autocarro de evento: 

* As propriedades e eventos devem ser a nossa primeira escolha para comunicação pai-filho. Os irmãos podem comunicarem-se através do seu pai
* O fornecimento e injeção permitem um componente comunicar com os conteúdos da sua ranhura. Isto é útil para componentes fortemente acoplados que são sempre usados juntos.
* O fornecimento e injeção também podem ser usados para comunicação de longa distância entre componentes. Pode ajudar a evitar 'perfuração de propriedade', onde as propriedades precisam ser passadas para baixo através de vários níveis de componentes que não precisam em si mesmos daquelas propriedades.
* A perfuração de propriedade também pode ser evitada refatorando o uso de ranhuras. Se um componente interino não precisar das propriedades então pode indicar um problema com a separação de interesses. A introdução duma ranhura neste componente permite o pai criar o conteúdo diretamente, para que as propriedades possam ser passadas sem o componente interino precisar envolver-se.
* [Gestão de Estado Global](https://pt.vuejs.org/guide/scaling-up/state-management), tal como a [Pinia](https://pinia-docs-pt.netlify.app/).
