# Construção de Migração {#migration-build}

## Visão Geral {#overview}

A `@vue/compat` (mais conhecida como "a construção de migração") é uma construção de Vue 3 que fornece comportamento compatível de Vue 2 configurável.

A migração de construção executa no modo de Vue 2 por padrão - a maioria das APIs públicas comportam-se exatamente como a Vue 2, com apenas algumas exceções. O uso de funcionalidades que mudaram ou foram depreciadas na Vue 3 emitirão avisos de execução. Uma compatibilidade da funcionalidade também pode ser ativada ou desativada numa base por componente.

### Casos de Uso Destinados {#intended-use-cases}

- Atualizar uma aplicação de Vue 2 para Vue 3 (com [limitações](#limitações-conhecidas))
- Migrar uma biblioteca para suportar a Vue 3
- Para programadores de Vue 2 experientes que ainda não experimentaram a Vue 3, a construção de migração pode ser usada no lugar da Vue 3 para ajudar a aprender a diferença entre as versões.

### Limitações Conhecidas {#known-limitations}

Embora temos nos esforçado em fazer a construção de migração imitar o comportamento da Vue 2 o máximo possível, existem algumas limitações que podem impedir a nossa aplicação de ser elegível para a atualização:

- Dependências que dependem de APIs internas da Vue 2 ou comportamentos não documentados. O caso mais comum é o uso de propriedades privadas em `VNodes`. Se o nosso projeto depende de bibliotecas como [Vuetify](https://vuetifyjs.com/en/), [Quasar](https://quasar.dev/) ou [ElementUI](https://element.eleme.io/#/en-US), é melhor aguardar por suas versões compatíveis com a Vue 3.

- Suporte de Internet Explorer 11: a [Vue 3 abandonou oficialmente o plano para o suporte de IE11](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0038-vue3-ie11-support.md). Se ainda precisarmos de suportar o IE11 ou abaixo, teremos de continuar na Vue 2.

- Interpretação no lado do servidor: a construção de migração pode ser usada para interpretação no lado do servidor, mas migrar uma configuração de interpretação no lado do servidor está muito mais complicado. A ideia geral é substituir `vue-server-renderer` pela [`@vue/server-renderer`](https://github.com/vuejs/core/tree/master/packages/server-renderer). A Vue 3 não mais fornece um interpretador de pacote e é recomendado usar a interpretação no lado do servidor da Vue 3 com a (https://pt.vitejs.dev/guide/ssr). Se estivermos a usar [Nuxt.js](https://nuxtjs.org/pt), é provavelmente melhor esperar pela Nuxt 3.

### Expectativas {#expectations}

Nota que a construção de migração tem por objetivo cobrir apenas as APIs e comportamento de Vue 2 publicamente documentado. Se a nossa aplicação reprovar executar sob a construção de migração devido a dependência de comportamento não documentado, é pouco provável que façamos pequenas melhorias na construção de migração para atender este caso específico. Considere refazê-la para remover a dependência sobre o comportamento em questão.

Uma palavra de advertência: se a nossa aplicação for grande e complexa, a migração provavelmente será um desafio mesmo com a construção de migração. Se a nossa aplicação não estiver lamentavelmente adequada para atualização, nota que estamos a planear adicionar o suporte a API de Composição e algumas outras funcionalidades da Vue 3 ao lançamento da 2.7 (estimada para final de 2021).

Se conseguirmos que a nossa aplicação execute na construção de migração, **podemos** enviá-la para produção antes da migração estiver completa. Embora exista um pequeno custo de desempenho ou tamanho, não deveria afetar visivelmente a experiência de uso de produção. Nós podemos ter que o fazer quando tens dependências que dependem do comportamento da Vue 2, e não podem ser atualizadas ou substituídas.

A construção de migração será fornecida começando com a 3.1, e continuará a ser publicada junto a linha de lançamento 3.2. Nós planeamos eventualmente parar de publicar a construção de migração numa futura versão secundária (não antes do final do ano de 2021), assim deveríamos ainda aspirar mudar para a construção padrão antes disto.

## Fluxo de Trabalho da Atualização {#upgrade-workflow}

O seguinte fluxo de trabalho percorre as etapas de migração duma aplicação de Vue 2 verdadeira (Vue HackerNews 2.0) para Vue 3. As consolidações completas podem ser encontradas [nesta ligação](https://github.com/vuejs/vue-hackernews-2.0/compare/migration). Nota que as etapas propriamente dita necessárias para o nosso projeto pode variar, estas etapas deveriam ser tratadas como orientações gerais ao invés de instruções estritas.

### Preparações {#preparations}

- Se ainda estivermos a usar a [sintaxe nomeada depreciada ou ranhuras isoladas](https://v2.vuejs.org/v2/guide/components-slots#Deprecated-Syntax), atualizar primeiro para sintaxe mais recente (que também é suportada na 2.6).

### Instalação {#installation}

1. Atualizar o ferramental se aplicável.

   - Se usamos configuração de Webpack personalizada: Atualize a `vue-loader` para `^16.0.0`.
   - Se usamos a `vue-cli`: atualizar para a `@vue/cli-service` mais recente com `vue upgrade`
   - (Alternativa) migrar para [Vite](https://pt.vitejs.dev/) + [vite-plugin-vue2](https://github.com/underfin/vite-plugin-vue2). [[Consolidação de exemplo](https://github.com/vuejs/vue-hackernews-2.0/commit/565b948919eb58f22a32afca7e321b490cb3b074)]

2. No `package.json`, atualizar `vue` para 3.1, instalar `@vue/compat` da mesma versão, e substituir `vue-template-compiler` (se presente) com `@vue/compiler-sfc`:

   ```diff
   "dependencies": {
   -  "vue": "^2.6.12",
   +  "vue": "^3.1.0",
   +  "@vue/compat": "^3.1.0"
      ...
   },
   "devDependencies": {
   -  "vue-template-compiler": "^2.6.12"
   +  "@vue/compiler-sfc": "^3.1.0"
   }
   ```

   [Consolidação de exemplo](https://github.com/vuejs/vue-hackernews-2.0/commit/14f6f1879b43f8610add60342661bf915f5c4b20)

3. Na etapa de construção, definir `vue` como pseudónimo para `@vue/compact` e ativar o modo de compatibilidade através de opções do compilador da Vue.

   **Configurações de Exemplo**

   <details>
     <summary><b>vue-cli</b></summary>

   ```js
   // vue.config.js
   module.exports = {
     chainWebpack: (config) => {
       config.resolve.alias.set('vue', '@vue/compat')

       config.module
         .rule('vue')
         .use('vue-loader')
         .tap((options) => {
           return {
             ...options,
             compilerOptions: {
               compatConfig: {
                 MODE: 2
               }
             }
           }
         })
     }
   }
   ```

   </details>

   <details>
     <summary><b>Webpack Simples</b></summary>

   ```js
   // webpack.config.js
   module.exports = {
     resolve: {
       alias: {
         vue: '@vue/compat'
       }
     },
     module: {
       rules: [
         {
           test: /\.vue$/,
           loader: 'vue-loader',
           options: {
             compilerOptions: {
               compatConfig: {
                 MODE: 2
               }
             }
           }
         }
       ]
     }
   }
   ```

   </details>

   <details>
     <summary><b>Vite</b></summary>

   ```js
   // vite.config.js
   export default {
     resolve: {
       alias: {
         vue: '@vue/compat'
       }
     },
     plugins: [
       vue({
         template: {
           compilerOptions: {
             compatConfig: {
               MODE: 2
             }
           }
         }
       })
     ]
   }
   ```

   </details>

4. Se estivermos a usar a TypeScrip, também precisaremos modificar os tipos da `vue` para expor a exportação padrão (que não está mais presente na Vue 3) adicionando um ficheiro `*.d.ts` com o seguinte:

   ```ts
   declare module 'vue' {
     import { CompatVue } from '@vue/runtime-dom'
     const Vue: CompatVue
     export default Vue
     export * from '@vue/runtime-dom'
     const { configureCompat } = Vue
     export { configureCompat }
   }
   ```

Notemos que esta declaração de módulo deve ser colocada num ficheiro `*.d.ts` que contém pelo menos outra importação ou exportação de alto nível (`export {}` é o suficiente) para estes tipos [aumentarem o módulo](https://pt.vuejs.org/guide/typescript/options-api#type-augmentation-placement) em vez de sobreescrevê-lo.

5. Neste ponto, a nossa aplicação pode deparar-se com alguns erros de tempo de compilação ou avisos (por exemplo, uso de filtros). Temos que os corrigir primeiro. Se todos os avisos do compilador forem solucionados, também podemos definir o compilador para o modo de Vue 3.

   [Consolidação de exemplo](https://github.com/vuejs/vue-hackernews-2.0/commit/b05d9555f6e115dea7016d7e5a1a80e8f825be52)

6. Depois de corrigir os erros, a aplicação deveria ser capaz de executar se não estiver sujeita às [limitações](#limitações-conhecidas) mencionadas acima.

   Nós provavelmente veremos muitos avisos a partir de ambas linha de comando e a consola do navegador. Cá estão algumas dicas gerais:

   - Nós podemos filtrar por avisos específicos na consola do navegador. É uma boa ideia usar o filtro e focar-se em corrigir um item de cada vez. Nós também podemos filtros negados como `-GLOBAL_MOUNT`.

   - Nós podemos suprimir depreciações específicas através da [configuração de compatibilidade](#configuração-de-compatibilidade).

   - Alguns avisos podem ser causados por uma dependência que usamos (por exemplo, `vue-router`). Nós podemos verificar isto a partir do vestígio de componente do aviso ou vestígio da pilha (expandida no clique). Primeiro, nos concentramos em corrigir os avisos que tem origem no nosso próprio código-fonte.

   - Se estivermos a usar a `vue-router`, nota que `<transition>` e `<keep-alive>` não funcionarão com `<router-view>` até atualizarmos para a `vue-router` versão 4.

7. Atualizar os [nomes de classe do `<transition>`](./breaking-changes/transition). Esta é a única funcionalidade que não tem um aviso de tempo de execução. Nós podemos fazer uma pesquisa completa no projeto para procurar pelos nomes de classe de CSS `.*-enter` e `.*-leave`.

   [Consolidação do exemplo](https://github.com/vuejs/vue-hackernews-2.0/commit/d300103ba622ae26ac26a82cd688e0f70b6c1d8f)

8. Atualizar a entrada da aplicação para usar a [nova API de montagem global](./breaking-changes/global-api#a-new-global-api-createapp).

   [Consolidação do exemplo](https://github.com/vuejs/vue-hackernews-2.0/commit/a6e0c9ac7b1f4131908a4b1e43641f608593f714)

9. [Atualizar `vuex` para versão 4](https://vuex.vuejs.org/guide/migrating-to-4-0-from-3-x).

   [Consolidação do exemplo](https://github.com/vuejs/vue-hackernews-2.0/commit/5bfd4c61ee50f358cd5daebaa584f2c3f91e0205)

10. [Atualizar a `vue-router` para versão 4](https://vue-router-docs-pt.netlify.app/index). Se também usamos `vuex-router-sync`, podemos substituí-la com um recuperador de memória.

    Depois de atualizar, para usar `<transition>` e `<keep-alive>` com `<router-view>` precisamos de usar a nova [sintaxe baseada em ranhura isolada](https://vue-router-docs-pt.netlify.app/guide/migration/#router-view-keep-alive-and-transition).

    [Consolidação do exemplo](https://github.com/vuejs/vue-hackernews-2.0/commit/758961e73ac4089890079d4ce14996741cf9344b)

11. Escolha avisos individuais. Nota que algumas funcionalidades têm comportamentos que entram em conflito entre a Vue 2 e Vue 3 - por exemplo, a API da função de interpretação, ou o componente funcional vs. componente assíncrono mudam. Para migrar para a API da Vue 3 sem afetar o resto da aplicação, podemos optar pelo comportamento da Vue 3 sobre um fundamento por componente com a [opção `compatConfig`](#configuração-por-componente).

    [Consolidação do exemplo](https://github.com/vuejs/vue-hackernews-2.0/commit/d0c7d3ae789be71b8fd56ce79cb4cb1f921f893b)

12. Quando todos os avisos estiverem corrigidos, podemos remover a construção de migração e trocar para a própria Vue 3. Nota que podemos não ser capazes de fazer isto se ainda tivermos dependências que dependem do comportamento da Vue 2.

    [Consolidação do exemplo](https://github.com/vuejs/vue-hackernews-2.0/commit/9beb45490bc5f938c9e87b4ac1357cfb799565bd)

## Configuração de Compatibilidade {#compat-configuration}

### Configuração Global {#global-config}

As funcionalidades de compatibilidade podem ser desativadas individualmente:

```js
import { configureCompat } from 'vue'

// desativar a compatibilidade para certas funcionalidades
configureCompat({
  FEATURE_ID_A: false,
  FEATURE_ID_B: false
})
```

Alternativamente, a aplicação inteira pode predefinir para o comportamento da Vue 3, com apenas certas funcionalidades ativadas:

```js
import { configureCompat } from 'vue'

// predefinir tudo para o comportamento da Vue 3,
// e apenas ativar compatibilidade para certas funcionalidades
configureCompat({
  MODE: 3,
  FEATURE_ID_A: true,
  FEATURE_ID_B: true
})
```

### Configuração Por Componente {#per-component-config}

Um componente pode usar a opção `compatConfig`, a qual espera as mesmas opções que o método `configureCompat` global:

```js
export default {
  compatConfig: {
    MODE: 3, // optar pelo comportamento da Vue 3 apenas para este componente
    FEATURE_ID_A: true // funcionalidades também podem ser alternadas ao nível do componente
  }
  // ...
}
```

### Configuração Específica do Compilador {#compiler-specific-config}

As funcionalidades que começam com `COMPILER_` são específicas do compilador: se estivermos a usar a construção completa (com o compilador do navegador embutido), podem ser configuradas em tempo de execução. No entanto, se usarmos uma configuração de construção, devem ser configuradas através da `compilerOptions` na configuração de construção (consulte as configurações de exemplo acima).

## Referência de Funcionalidade {#feature-reference}

### Tipos de Compatibilidade {#compatibility-types}

- ✔ Completamente compatível
- ◐ Parcialmente compatível com advertências
- ⨂ Incompatível (aviso apenas)
- ⭘ Apenas compatível (sem aviso)

### Incompatível {#incompatible}

> Devem ser corregidas antecipadamente ou provavelmente conduzirão à erros

| ID                                    | Tipo | Descrição                                                             | Documentação                                                                                       |
| ------------------------------------- | ---- | ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| GLOBAL_MOUNT_CONTAINER                | ⨂    | a aplicação montada não substitui o elemento em que está montada        | [ligação](./breaking-changes/mount-changes)                                               |
| CONFIG_DEVTOOLS                       | ⨂    | as ferramentas de programação de produção agora são uma opção de tempo de execução                            | [ligação](https://github.com/vuejs/core/tree/master/packages/vue#bundler-build-feature-flags) |
| COMPILER_V_IF_V_FOR_PRECEDENCE        | ⨂    | a precedência de `v-if` e `v-for` quando usada sobre o mesmo elemento mudou | [ligação](./breaking-changes/v-if-v-for)                                                  |
| COMPILER_V_IF_SAME_KEY                | ⨂    | os ramos de `v-if` não podem mais ter a mesma chave                        | [ligação](./breaking-changes/key-attribute#on-conditional-branches)                       |
| COMPILER_V_FOR_TEMPLATE_KEY_PLACEMENT | ⨂    | a chave de `<template v-for>` agora deve ser colocada sobre o `<template>`    | [ligação](./breaking-changes/key-attribute#with-template-v-for)                           |
| COMPILER_SFC_FUNCTIONAL               | ⨂    | o `<template functional>` não é mais suportado nos componentes de ficheiro único               | [ligação](./breaking-changes/functional-components#single-file-components-sfcs)           |

### Parcialmente Compatível com Advertências {#partially-compatible-with-caveats}

| ID                       | Tipo | Descrição                                                                                                                                                                                | Documentação                                                                                                           |
| ------------------------ | ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------- |
| CONFIG_IGNORED_ELEMENTS  | ◐    | a `config.ignoredElements` agora é `config.compilerOptions.isCustomElement` (apenas na construção do compilador do navegador). Se estivermos a usar configuração de construção, `isCustomElement` deve ser passado através da configuração da construção. | [ligação](./breaking-changes/global-api#config-ignoredelements-is-now-config-compileroptions-iscustomelement) |
| COMPILER_INLINE_TEMPLATE | ◐    | `inline-template` removido (compatibilidade apenas suportada na construção do compilador do navegador)                                                                                                              | [ligação](./breaking-changes/inline-template-attribute)                                                       |
| PROPS_DEFAULT_THIS       | ◐    | a fábrica padrão de propriedades não mais tem acesso ao `this` (no modo de compatibilidade, `this` não é uma instância verdadeira - apenas expõe as propriedades, `$options` e injeções)                                  | [ligação](./breaking-changes/props-default-this)                                                              |
| INSTANCE_DESTROY         | ◐    | método de instância `$destroy` removido (no modo de compatibilidade, apenas suportado na instância de raiz)                                                                                                      |                                                                                                                |
| GLOBAL_PRIVATE_UTIL      | ◐    | `Vue.util` é privado e não está mais disponível                                                                                                                                             |                                                                                                                |
| CONFIG_PRODUCTION_TIP    | ◐    | `config.productionTip` não é mais necessária                                                                                                                                                | [ligação](./breaking-changes/global-api#config-productiontip-removed)                                         |
| CONFIG_SILENT            | ◐    | `config.silent` removida                                                                                                                                                                    |                                                                                                                |

### Apenas Compatível (sem aviso) {#compat-only-no-warning}

| ID                 | Tipo | Descrição                            | Documentação                                      |
| ------------------ | ---- | -------------------------------------- | ----------------------------------------- |
| TRANSITION_CLASSES | ⭘    | as classes `enter` e `leave` de transição mudaram | [ligação](./breaking-changes/transition) |

### Completamente Compatível {#fully-compatible}

| ID                           | Tipo | Descrição                                                           | Documentação                                                                                        |
| ---------------------------- | ---- | --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| GLOBAL_MOUNT                 | ✔    | `new Vue()` -> `createApp`                                                | [ligação](./breaking-changes/global-api#mounting-app-instance)                             |
| GLOBAL_EXTEND                | ✔    | `Vue.extend` removida (use `defineComponent` ou a opção `extends`)        | [ligação](./breaking-changes/global-api#vue-extend-removed)                                |
| GLOBAL_PROTOTYPE             | ✔    | `Vue.prototype` -> `app.config.globalProperties`                      | [ligação](./breaking-changes/global-api#vue-prototype-replaced-by-config-globalproperties) |
| GLOBAL_SET                   | ✔    | `Vue.set` removida (não é mais necessária)                                  |                                                                                             |
| GLOBAL_DELETE                | ✔    | `Vue.delete` removida (não é mais necessária)                               |                                                                                             |
| GLOBAL_OBSERVABLE            | ✔    | `Vue.observable` removida (use `reactive`)                             | [ligação](https://pt.vuejs.org/api/reactivity-core#reactive)                                 |
| CONFIG_KEY_CODES             | ✔    | `config.keyCodes` removida                                               | [ligação](./breaking-changes/keycode-modifiers)                                            |
| CONFIG_WHITESPACE            | ✔    | na Vue 3 espaço em branco está predefinida para `"condense"`                          |                                                                                             |
| INSTANCE_SET                 | ✔    | `vm.$set` removida (não é mais necessária)                                  |                                                                                             |
| INSTANCE_DELETE              | ✔    | `vm.$delete` removida (não é mais necessária)                               |                                                                                             |
| INSTANCE_EVENT_EMITTER       | ✔    | `vm.$on`, `vm.$off`, `vm.$once` removida                               | [ligação](./breaking-changes/events-api)                                                   |
| INSTANCE_EVENT_HOOKS         | ✔    | a instância não emite mais eventos `hook:x`                            | [ligação](./breaking-changes/vnode-lifecycle-events)                                       |
| INSTANCE_CHILDREN            | ✔    | `vm.$children` removida                                                | [ligação](./breaking-changes/children)                                                     |
| INSTANCE_LISTENERS           | ✔    | `vm.$listeners` removida                                               | [ligação](./breaking-changes/listeners-removed)                                            |
| INSTANCE_SCOPED_SLOTS        | ✔    | `vm.$scopedSlots` removida; `vm.$slots` agora expõe funções          | [ligação](./breaking-changes/slots-unification)                                            |
| INSTANCE_ATTRS_CLASS_STYLE   | ✔    | `$attrs` agora inclui `class` e `style`                             | [ligação](./breaking-changes/attrs-includes-class-style)                                   |
| OPTIONS_DATA_FN              | ✔    | `data` deve ser uma função em todos os casos                                | [ligação](./breaking-changes/data-option)                                                  |
| OPTIONS_DATA_MERGE           | ✔    | `data` de mistura ou extensão agora é combinada superficialmente                  | [ligação](./breaking-changes/data-option)                                                  |
| OPTIONS_BEFORE_DESTROY       | ✔    | `beforeDestroy` -> `beforeUnmount`                                    |                                                                                             |
| OPTIONS_DESTROYED            | ✔    | `destroyed` -> `unmounted`                                            |                                                                                             |
| WATCH_ARRAY                  | ✔    | a observação dum vetor não mais aciona sobre mutação se não for profunda          | [ligação](./breaking-changes/watch)                                                        |
| V_ON_KEYCODE_MODIFIER        | ✔    | `v-on` não mais suporta modificadores de código de tecla ou `keyCode`                           | [ligação](./breaking-changes/keycode-modifiers)                                            |
| CUSTOM_DIR                   | ✔    | os nomes de gatilho de diretiva personalizada mudaram                                  | [ligação](./breaking-changes/custom-directives)                                            |
| ATTR_FALSE_VALUE             | ✔    | Não mais remove o atributo se valor de vínculo for `false` booleano      | [ligação](./breaking-changes/attribute-coercion)                                           |
| ATTR_ENUMERATED_COERCION     | ✔    | já não existem atributos enumerados de caso especial                        | [ligação](./breaking-changes/attribute-coercion)                                           |
| TRANSITION_GROUP_ROOT        | ✔    | `<transition-group>` não mais desenha um elemento raiz por padrão      | [ligação](./breaking-changes/transition-group)                                             |
| COMPONENT_ASYNC              | ✔    | a API do componente assíncrono mudou (agora exige `defineAsyncComponent`)    | [ligação](./breaking-changes/async-components)                                             |
| COMPONENT_FUNCTIONAL         | ✔    | a API do componente funcional mudou (agora devem ser funções simples)       | [ligação](./breaking-changes/functional-components)                                        |
| COMPONENT_V_MODEL            | ✔    | `v-model` do componente re-trabalhado                                       | [ligação](./breaking-changes/v-model)                                                      |
| RENDER_FUNCTION              | ✔    | a API da função de interpretação mudou                                           | [ligação](./breaking-changes/render-function-api)                                          |
| FILTERS                      | ✔    | filtros removidos (esta opção afeta apenas as APIs de tempo de execução)      | [ligação](./breaking-changes/filters)                                                      |
| COMPILER_IS_ON_ELEMENT       | ✔    | o uso de `is` agora está restrito apenas ao `<component>`            | [ligação](./breaking-changes/custom-elements-interop)                                      |
| COMPILER_V_BIND_SYNC         | ✔    | `v-bind.sync` substituído por `v-model` com argumentos                 | [ligação](./breaking-changes/v-model)                                                      |
| COMPILER_V_BIND_PROP         | ✔    | modificador `v-bind.prop` removido                                        |                                                                                             |
| COMPILER_V_BIND_OBJECT_ORDER | ✔    | `v-bind="object"` agora é sensível a ordem                              | [ligação](./breaking-changes/v-bind)                                                       |
| COMPILER_V_ON_NATIVE         | ✔    | modificador `v-on.native` removido                                        | [ligação](./breaking-changes/v-on-native-modifier-removed)                                 |
| COMPILER_V_FOR_REF           | ✔    | `ref` no `v-for` (suporte de compilador)                                   |                                                                                             |
| COMPILER_NATIVE_TEMPLATE     | ✔    | `<template>` sem diretivas especiais agora desenha-se como elemento nativo |                                                                                             |
| COMPILER_FILTERS             | ✔    | filtros (suporte de compilador)                                            |                                                                                             |
