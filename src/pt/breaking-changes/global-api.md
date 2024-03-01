---
badges:
  - breaking
---

# Instância de Aplicação da API Global <MigrationBadges :badges="$frontmatter.badges" /> {#global-api-application-instance}

A Vue 2.x tem número de APIs globais e configurações que alteram globalmente o comportamento da Vue. Por exemplo, para registar um componente global, usaríamos a API `Vue.component` desta maneira:

```js
Vue.component('button-counter', {
  data: () => ({
    count: 0
  }),
  template: '<button @click="count++">Clicked {{ count }} times.</button>'
})
```

De maneira semelhante, isto é como uma diretiva global é declarada:

```js
Vue.directive('focus', {
  inserted: (el) => el.focus()
})
```

Embora esta abordagem seja conveniente, conduz à alguns problemas. Tecnicamente, a Vue 2 não tem um conceito de uma "aplicação". O que definimos como uma aplicação é simplesmente a raiz da instância de Vue criada através de `new Vue()`. Cada instância de raiz criada a partir do mesmo construtor de Vue **partilha a mesma configuração global**. Como resultado:

- A configuração global facilita a poluição acidental de outros casos de este durante os testes. Os utilizadores precisam armazenar cuidadosamente a configuração global original e restituí-la depois de cada teste (por exemplo, redefinido `Vue.config.errorHandler`). Algumas APIs como `Vue.use` e `Vue.mixin` nem têm uma maneira de reverter os seus efeitos. Isto dificulta os testes que envolvem extensões. De fato, `vue-test-utils` tem de implementar uma API especial `createLocalVue` para lidar com isto:

  ```js
  import { createLocalVue, mount } from '@vue/test-utils'

  // criar um construtor de `Vue` estendido
  const localVue = createLocalVue()

  // instalar uma extensão "globalmente" no construtor de Vue "local"
  localVue.use(MyPlugin)

  // passar o `localVue` às opções de montagem
  mount(Component, { localVue })
  ```

- A configuração global dificulta a partilha da mesma cópia da Vue entre várias "aplicações" na mesma página, apenas com diferentes configurações globais:

  ```js
  // isto afeta ambas instâncias de raiz
  Vue.mixin({
    /* ... */
  })

  const app1 = new Vue({ el: '#app-1' })
  const app2 = new Vue({ el: '#app-2' })
  ```

Para evitar estes problemas, na Vue 3 introduzimos…

## Uma Nova API Global: `createApp` {#a-new-global-api-createapp}

A chamada de `createApp` retorna uma _instância de aplicação_, um novo conceito na Vue 3.

```js
import { createApp } from 'vue'

const app = createApp({})
```

Se estivermos a usar uma construção de rede de entrega de conteúdo de Vue então `createApp` é exposta através do objeto `Vue` global:

```js
const { createApp } = Vue

const app = createApp({})
```

Uma instância de aplicação expõe um subconjunto das APIs globais da Vue 2. A regra de outro é _quaisquer APIs que alteram globalmente o comportamento da Vue agora foram movidas para a instância de aplicação_. Temos abaixo uma tabela das APIs globais da Vue 2 e suas APIs de instância correspondentes:

| API Global da 2.x             | API de Instância da 3.x (`app`)                                                                                                        |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `Vue.config`                 | `app.config`                                                                                                                      |
| `Vue.config.productionTip`   | _removida_ ([consultar](#config-productiontip-removed))                                                                          |
| `Vue.config.ignoredElements` | `app.config.compilerOptions.isCustomElement` ([consultar](#config-ignoredelements-is-now-config-compileroptions-iscustomelement)) |
| `Vue.component`              | `app.component`                                                                                                                   |
| `Vue.directive `             | `app.directive`                                                                                                                   |
| `Vue.mixin `                 | `app.mixin`                                                                                                                       |
| `Vue.use `                   | `app.use` ([consultar](#a-note-for-plugin-authors))                                                                               |
| `Vue.prototype`              | `app.config.globalProperties` ([consultar](#vue-prototype-replaced-by-config-globalproperties))                                   |
| `Vue.extend`                 | _removida_ ([consultar](#vue-extend-removed))                                                                                    |

Todas as outras APIs globais que não alteram globalmente o comportamento agora são exportações nomeadas, conforme está documentada na [Agitação da Árvore da API Global](./global-api-treeshaking).

### `config.productionTip` removida {#config-productiontip-removed}

Na Vue 3.x, a dica "usar a construção de produção" apenas exibir-se-á quando usamos a "desenvolvimento + construção completa" (a construção que inclui o compilador de tempo de execução e tem avisos).

Para construções de módulos de ECMAScript, visto que são usadas com empacotadores, e na maioria dos casos uma interface da linha de comando ou modelo de projeto teriam configurados o ambiente de produção de maneira apropriada, esta dica não parece mais.

[Opção da construção de migração: `CONFIG_PRODUCTION_TIP`](../migration-build#compat-configuration)

### `config.ignoredElements` agora é `config.compilerOptions.isCustomElement` {#config-ignoredelements-is-now-config-compileroptions-iscustomelement}

Esta opção de configuração foi introduzida com a intenção de suportar elementos personalizados nativos, então a renomeamos para expressar melhor o que faz. A nova opção também espera uma função que oferece mais flexibilidade do que a antiga abordagem de sequência de caracteres ou expressões regulares:

```js
// antes
Vue.config.ignoredElements = ['my-el', /^ion-/]

// depois
const app = createApp({})
app.config.compilerOptions.isCustomElement = (tag) => tag.startsWith('ion-')
```

:::tip IMPORTANTE

Na Vue 3, a verificação de se um elemento é um componente ou não foi movida para a fase de compilação do modelo de marcação, portanto esta opção de configuração é apenas respeitada quando usamos o compilador de tempo de execução. Se estivermos a usar a construção exclusiva para o tempo de execução, `isCustomElement` deve ser passado ao `@vue/compiler-dom` na configuração da construção - por exemplo, através da [opção `compilerOptions` na `vue-loader`](https://vue-loader.vuejs.org/options.html#compileroptions).

- Se `config.compilerOptions.isCustomElement` é atribuído quando usamos uma construção exclusiva para o tempo de execução, um aviso será emitido instruindo o utilizador a passar a opção na configuração da construção;
- Esta será uma nova opção de alto nível na configuração da interface da linha de comando da Vue.

:::

[Opção da construção de migração: `CONFIG_IGNORED_ELEMENTS`](../migration-build.html#compat-configuration)

### `Vue.prototype` substituída por `config.globalProperties` {#vue-prototype-replaced-by-config-globalproperties}

Na Vue 2, `Vue.prototype` era comummente usada para adicionar propriedades que estariam acessíveis em todos os componentes. 

A opção equivalente na Vue 3 é [`config.globalProperties`](https://pt.vuejs.org/api/application#app-config-globalproperties). Estas propriedades serão copiadas como parte da instanciação dum componente dentro da aplicação:

```js
// antes - Vue 2
Vue.prototype.$http = () => {}
```

```js
// depois - Vue 3
const app = createApp({})
app.config.globalProperties.$http = () => {}
```

O uso da `provide` (discutida [abaixo](#provide-inject)) também deve ser considerado como uma alternativa ao `globalProperties`.

[Opção da construção de migração: `GLOBAL_PROTOTYPE`](../migration-build#compat-configuration)

### `Vue.extend` removida {#vue-extend-removed}

Na Vue 2.x, `Vue.extend` foi usada para criar uma "subclasse" do construtor de Vue de base com o argumento que deveria ser um objeto contendo opções de componente. Na  Vue 3.x, não temos mais o conceito de construtores de componente. A montagem dum componente deve sempre usar a API global `createApp`:

```js
// antes - Vue 2

// criar o construtor
const Profile = Vue.extend({
  template: '<p>{{firstName}} {{lastName}} aka {{alias}}</p>',
  data() {
    return {
      firstName: 'Walter',
      lastName: 'White',
      alias: 'Heisenberg'
    }
  }
})
// criar uma instância de `Profile` e montá-la num elemento
new Profile().$mount('#mount-point')
```

```js
// depois - Vue 3
const Profile = {
  template: '<p>{{firstName}} {{lastName}} aka {{alias}}</p>',
  data() {
    return {
      firstName: 'Walter',
      lastName: 'White',
      alias: 'Heisenberg'
    }
  }
}

Vue.createApp(Profile).mount('#mount-point')
```

#### Inferência de Tipo {#type-inference}

Na Vue 2, `Vue.extend` também foi usada para fornecer inferência de tipo de TypeScript para as opções do componente. Na Vue 3, a API global `defineComponent` pode ser usada no lugar da `Vue.extend` para o mesmo propósito.

Nota que apesar do tipo de retorno de `defineComponent` ser um tipo parecido com construtor, é apenas usado para inferência de TSX. Em tempo de execução a `defineComponent` é em grande parte nula e retornará o objeto de opções como está.

#### Herança de Componente {#component-inheritance}

Na Vue 3, recomendamos fortemente favorecer a composição através da [API de Composição](https://pt.vuejs.org/guide/reusability/composables) sobre a herança e misturas. Se por alguma razão precisarmos da herança de componente, podemos usar a [opção `extends`](https://pt.vuejs.org/api/options-composition#extends) no lugar da `Vue.extend`.

[Opção da construção de migração: `GLOBAL_EXTEND`](../migration-build#compat-configuration)

### Uma Nota para Autores de Extensão {#a-note-for-plugin-authors}

É uma prática comum para os autores de extensão instalarem as extensões automaticamente nas suas construções de UMD usando `Vue.use`. Por exemplo, isto é como a extensão `vue-router` oficial instala-se num ambiente de navegador:

```js
var inBrowser = typeof window !== 'undefined'
/* … */
if (inBrowser && window.Vue) {
  window.Vue.use(VueRouter)
}
```

Já que a API global `use` não está mais disponível na Vue 3, este método parará trabalhar e chamar `Vue.use()` agora acionará um aviso. Em vez, o utilizador final agora terá de explicitamente especificar o uso da extensão na instância da aplicação:

```js
const app = createApp(MyApp)
app.use(VueRouter)
```

## Montagem da Instância de Aplicação {#mounting-app-instance}

Depois de ser inicializada com `createApp(/* opções */)`, a instância de aplicação `app` pode ser usada para montar uma instância de componente de raiz com `app.mount(domTarget)`:

```js
import { createApp } from 'vue'
import MyApp from './MyApp.vue'

const app = createApp(MyApp)
app.mount('#app')
```

Com todas estas mudanças, o componente e a diretiva que temos no princípio do gua serão reescritos para algo como isto:

```js
const app = createApp(MyApp)

app.component('button-counter', {
  data: () => ({
    count: 0
  }),
  template: '<button @click="count++">Clicked {{ count }} times.</button>'
})

app.directive('focus', {
  mounted: (el) => el.focus()
})


// agora toda instância de aplicação montada com `app.mount()`,
// juntamente com a sua árvore de componente, terão o mesmo componente
// `button-counter` e a diretiva `focus` sem poluir o ambiente global
app.mount('#app')
```

[Opção da construção de migração: `GLOBAL_MOUNT`](../migration-build.html#compat-configuration)

## `provide` / `inject` {#provide-inject}

Semelhante ao uso da opção `provide` numa instância de raiz da Vue 2.x, uma instância de aplicação da Vue 3 também pode fornecer dependências que podem ser injetadas por qualquer componente dentro da aplicação:

```js
// na entrada
app.provide('guide', 'Vue 3 Guide')

// num componente filho
export default {
  inject: {
    book: {
      from: 'guide'
    }
  },
  template: `<div>{{ book }}</div>`
}
```

O uso da `provide` é especialmente útil quando escrevemos uma extensão, como uma alternativa à `globalProperties`.

## Partilhar Configurações Entre as Aplicações {#share-configurations-among-apps}

Uma maneira de partilhar configurações, por exemplo, componentes ou diretivas entre as aplicações é criar uma função de fábrica, como esta:

```js
import { createApp } from 'vue'
import Foo from './Foo.vue'
import Bar from './Bar.vue'

const createMyApp = (options) => {
  const app = createApp(options)
  app.directive('focus' /* ... */)

  return app
}

createMyApp(Foo).mount('#foo')
createMyApp(Bar).mount('#bar')
```

Agora a diretiva `focus` estará disponível em ambas instâncias `Foo` e `Bar` e suas descendentes.
