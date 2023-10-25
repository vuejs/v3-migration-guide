---
badges:
  - new
---

# Componentes Assíncronos <MigrationBadges :badges="$frontmatter.badges" /> {#async-components}

## Visão Geral {#overview}

Eis uma visão geral de alto nível do que mudou:

- Novo método auxiliar `defineAsyncComponent` que define explicitamente os componentes assíncronos
- A opção `component` foi renomeada para `loader`
- A função carregadora não recebe inerentemente os argumentos `resolve` e `reject` e deve retornar uma promessa

Para uma explicação mais profunda, continue a ler!

## Introdução {#introduction}

Anteriormente, os componentes assíncronos eram criados ao simplesmente definir um componente como uma função que retornava uma promessa, tal como:

```js
const asyncModal = () => import('./Modal.vue')
```

Ou, para a sintaxe de componente mais avançada com opções:

```js
const asyncModal = {
  component: () => import('./Modal.vue'),
  delay: 200,
  timeout: 3000,
  error: ErrorComponent,
  loading: LoadingComponent
}
```

## Sintaxe da 3.x {#_3-x-syntax}

Agora, na Vue 3, uma vez que os componentes funcionais são definidos como funções puras, as definições dos componentes assíncronos precisam ser explicitamente definidas envolvendo-as num novo auxiliar `defineAsyncComponent`:

```js
import { defineAsyncComponent } from 'vue'
import ErrorComponent from './components/ErrorComponent.vue'
import LoadingComponent from './components/LoadingComponent.vue'

// Componente assíncrono sem opções
const asyncModal = defineAsyncComponent(() => import('./Modal.vue'))

// Componente assíncrono com opções
const asyncModalWithOptions = defineAsyncComponent({
  loader: () => import('./Modal.vue'),
  delay: 200,
  timeout: 3000,
  errorComponent: ErrorComponent,
  loadingComponent: LoadingComponent
})
```

::: tip NOTA
A Vue Router suporta um mecanismo semelhante para carregar de maneira assíncrono os componentes da rota, conhecido como *carregamento preguiçoso*. Apesar das semelhanças, esta funcionalidade é distinta do suporte da Vue para componentes assíncronos. Nós *não* usaríamos `defineAsyncComponent` quando configurarmos os componentes da rota com a Vue Router. Nós podemos ler mais sobre isto na seção [Rotas de Carregamento Preguiçoso](https://router.vuejs.org/guide/advanced/lazy-loading) da documentação da Vue Router.
:::

Uma outra mudança que tem sido feita da 2.x é que a opção `component` agora foi renomeada para `loader` no sentido de comunicar com precisão que uma definição de componente não pode ser fornecida diretamente:

```js{4}
import { defineAsyncComponent } from 'vue'

const asyncModalWithOptions = defineAsyncComponent({
  loader: () => import('./Modal.vue'),
  delay: 200,
  timeout: 3000,
  errorComponent: ErrorComponent,
  loadingComponent: LoadingComponent
})
```

Além disto, ao contrário da 2.x, a função carregadora já não recebe os argumentos `resolve` e `reject` e sempre deve retornar uma promessa:

```js
// Versão 2.x
const oldAsyncComponent = (resolve, reject) => {
  /* ... */
}

// Versão 3.x
const asyncComponent = defineAsyncComponent(
  () =>
    new Promise((resolve, reject) => {
      /* ... */
    })
)
```

Para mais informação sobre o uso de componentes assíncronos, consulte:

- [Guia: Componentes Assíncronos](https://pt.vuejs.org/guide/components/async)
- [Opções da Construção de Migração: `COMPONENT_ASYNC`](../migration-build#compat-configuration)
