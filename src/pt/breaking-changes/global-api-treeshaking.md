---
badges:
  - breaking
---

# Agitação de Árvore da API Global <MigrationBadges :badges="$frontmatter.badges" /> {#global-api-treeshaking}

## Sintaxe da 2.x {#_2-x-syntax}

Se alguma vez tivemos de manualmente de manipular o DOM na Vue, pudemos ter encontrado por acaso este padrão:

```js
import Vue from 'vue'

Vue.nextTick(() => {
  // algo relacionado ao DOM
})
```

Ou, se testávamos a fazer testes unitários numa aplicação que envolve componentes assíncrono, existe a possibilidade de termos escrito algo como isto:

```js
import { shallowMount } from '@vue/test-utils'
import { MyComponent } from './MyComponent.vue'

test('an async feature', async () => {
  const wrapper = shallowMount(MyComponent)

  // executar algumas tarefas relacionadas ao DOM

  await wrapper.vm.$nextTick()

  // executar as nossas asserções
})
```

`Vue.nextTick()` é uma API global exposta diretamente num único objeto de Vue – de fato, o método de instância `$nextTick()` é apenas um envolvedor prático em torno da `Vue.nextTick()` com o contexto de `this` da função de resposta automaticamente vinculado à instância atual por conveniência.

Mas e se nunca tivemos de lidar com a manipulação manual do DOM, nem estamos a usar ou testar componentes assíncronos na nossa aplicação? Ou, e se, por qualquer razão, preferimos usar a boa e velha `window.setTimeout()`? Em tal caso, o código para `nextTick()` tornar-se-á código morto – isto é, código que é escrito mas nunca usado. E código morto raramente é uma boa coisa, especialmente no nosso contexto do lado do cliente onde cada kilobyte importa.

Os empacotadores de módulo como a Webpack e a Rollup (na qual a Vite está baseada) suportam [agitação de árvore](https://webpack.js.org/guides/tree-shaking/), que é um termo elegante para “eliminação de código morto”. Infelizmente, devido à como o código está escrito na versões anteriores da Vue, as APIs globais como `Vue.nextTick()` não são passíveis de ter sua árvore agitada e serão incluídos no pacote final independentemente de onde realmente são usadas ou não.

## Sintaxe da 3.x {#_3-x-syntax}

Na Vue 3, as APIs globais e internas foram reestruturadas com suporta a agitação de árvore em mente. Como resultado, as APIs globais agora apenas podem ser acessada como exportações nomeadas para a construção de Módulos de ECMAScript. Por exemplo, o nossos trechos agora devem parecer-se com isto:

```js
import { nextTick } from 'vue'

nextTick(() => {
  // algo relacionado ao DOM
})
```

e

```js
import { shallowMount } from '@vue/test-utils'
import { MyComponent } from './MyComponent.vue'
import { nextTick } from 'vue'

test('an async feature', async () => {
  const wrapper = shallowMount(MyComponent)

  // executar algumas tarefas relacionadas ao DOM

  await nextTick()

  // executar as nossas asserções
})
```

Chamar `Vue.nextTick()` diretamente agora resultará no infame erro `undefined is not a function`.

Com esta mudança, desde que o empacotador de módulo suporte a agitação de árvore, as APIs globais que não são usadas numa aplicação de Vue serão eliminadas do pacote final, resultando num tamanho de ficheiro otimizado. 

## APIs Afetada {#affected-apis}

Estas APIs globais na Vue 2.x são afetadas por esta mudança:

- `Vue.nextTick`
- `Vue.observable` (substituída por `Vue.reactive`)
- `Vue.version`
- `Vue.compile` (apenas em construções completas)
- `Vue.set` (apenas em construções de compatibilidade)
- `Vue.delete` (apenas em construções de compatibilidade)

## Auxiliares Internos {#internal-helpers}

Além das APIs públicas, muito dos componentes e auxiliares internos agora também são exportadas como exportações nomeadas. Isto permite o compilador produzir código que apenas importa funcionalidades quando são usados. Por exemplo o seguinte modelo de marcação:

```html
<transition>
  <div v-show="ok">hello</div>
</transition>
```

é compilado para algo semelhante ao seguinte:

```js
import { h, Transition, withDirectives, vShow } from 'vue'

export function render() {
  return h(Transition, [withDirectives(h('div', 'hello'), [[vShow, this.ok]])])
}
```

Isto essencialmente significa que o componente `Transition` apenas é importando quando a aplicação realmente fazer uso dele. Em outras palavras, se a aplicação não tem nenhum componente `<transition>`, o código suportando esta funcionalidade não estará presente no pacote final.

Com agitação de árvore global, os utilizadores apenas “pagam” pelas as funcionalidades que realmente usam. Ainda melhor, sabendo que as funcionalidades opcionais não aumentarão o tamanho do pacote para as aplicações não usá-los, o tamanho da abstração tornou-se muito menos uma preocupação para funcionalidades principais adicionais no futuro, se absolutamente.

:::warning IMPORTANTE
O que está escrito acima apenas aplica-se às [construções de Módulos de ECMAScript](https://github.com/vuejs/core/tree/master/packages/vue#which-dist-file-to-use) para uso com empacotadores capazes de agitar a árvore - a construção UMD continua a incluir todas as funcionalidades e expõe tudo na variável global da Vue (e o compilador produzirá a saída apropriada para usar as APIs longe do global ao invés de importar).
:::

## Uso em Extensões {#usage-in-plugins}

Se a nossa extensão depender duma API de Vue 2.x afetada, por exemplo:

```js
const plugin = {
  install: Vue => {
    Vue.nextTick(() => {
      // ...
    })
  }
}
```

Na Vue 3, teremos de importá-lo explicitamente:

```js
import { nextTick } from 'vue'

const plugin = {
  install: app => {
    nextTick(() => {
      // ...
    })
  }
}
```

Se usarmos um empacotador de módulo como Webpack, isto pode levar o código-fonte da Vue a ser empacotada na extensão, e na maioria das vezes, isto não é o que se espera. Uma prática comum para prevenir isto de acontecer é configurar o empacotador de módulo para excluir a Vue do pacote final. No caso da Webpack, podemos usar a opção de configuração [`externals`](https://webpack.js.org/configuration/externals/):

```js
// webpack.config.js
module.exports = {
  /*...*/
  externals: {
    vue: 'Vue'
  }
}
```

Isto dirá a Webpack para tratar o módulo Vue como uma biblioteca externa e não a empacotar.

Se o nosso empacotador de módulo de escolha for a [Rollup](https://rollupjs.org/), basicamente recebemos o mesmo efeito gratuitamente, visto que por padrão a Rollup tratará os identificadores de módulo absoluto (`'vue'` no nosso caso) como dependências externas e não as incluirá no pacote final. No entanto, durante o empacotamento, pode emitir um aviso de [“Tratando a 'vue' como dependência externa”](https://rollupjs.org/guide/en/#warning-treating-module-as-external-dependency), que pode ser suprimida com a opção `external`:

```js
// rollup.config.js
export default {
  /*...*/
  external: ['vue']
}
```
