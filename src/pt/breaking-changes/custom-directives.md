---
badges:
  - breaking
---

# Diretivas Personalizadas<MigrationBadges :badges="$frontmatter.badges" /> {#custom-directives}

## Visão Geral {#overview}

As funções de gatilho para as diretivas foram renomeadas para alinharem-se melhor com o ciclo de vida do componente.

Adicionalmente, a sequência de caracteres de `expression` já não é passada como parte do objeto de `binding`.

## Sintaxe da 2.x {#_2-x-syntax}

Na Vue 2, as diretivas personalizadas eram criadas usando os gatilhos listados abaixo para atingir um ciclo de vida do elemento, das quais todas são opcionais:

- **`bind`** - Chamado assim que a diretiva for vinculada ao elemento. Chamada apenas uma vez.
- **`inserted`** - Chamado assim que o elemento for inserido num DOM pai.
- **`update`** - Este gatilho é chamado quando o elemento atualiza-se, mas os filhos ainda não foram atualizados.
- **`componentUpdated`** - Este gatilho é chamado assim que o componente e os filhos forem atualizados.
- **`unbind`** - Este gatilho é chamado assim que a diretiva for removia. Também chamada apenas uma vez.

Eis um exemplo deste:

```html
<p v-highlight="'yellow'">Highlight this text bright yellow</p>
```

```js
Vue.directive('highlight', {
  bind(el, binding, vnode) {
    el.style.background = binding.value
  }
})
```

Aqui, na configuração inicial para este elemento, a diretiva vincula um estilo passando um valor, que pode ser atualizado para diferentes valores através da aplicação.

## Sintaxe da 3.x {#_3-x-syntax}

Na Vue 3, no entanto, críamos uma API mais coesa para as diretivas personalizadas. Como podemos ver, diferem grandemente dos nossos métodos do ciclo de vida do componente apesar de prendermos em eventos semelhantes. Agora os unificamos tal como:

- **`created`** - novo! Este é chamado antes dos atributos do elemento ou ouvintes de evento forem aplicados.
- `bind` → **`beforeMount`**
- `inserted` → **`mounted`**
- **`beforeUpdate`**: novo! Este é chamado antes do próprio elemento ser atualizado, mais como os gatilhos do ciclo de vida do componente.
- `update` → removido! Existiam muitas semelhanças ao `updated`, então isto é redundante. Use `updated`.
- `componentUpdated` → **`updated`**
- **`beforeUnmount`**: novo! Semelhante aos gatilhos do ciclo de vida do componente, este será chamado imediatamente antes dum elemento ser desmontado.
- `unbind` → **`unmounted`**

A API final é como se segue:

```js
const MyDirective = {
  created(el, binding, vnode, prevVnode) {}, // novo
  beforeMount() {},
  mounted() {},
  beforeUpdate() {}, // novo
  updated() {},
  beforeUnmount() {}, // novo
  unmounted() {}
}
```

A API resultante poderia ser usada desta maneira, espelhando o exemplo anterior:

```html
<p v-highlight="'yellow'">Highlight this text bright yellow</p>
```

```js
const app = Vue.createApp({})

app.directive('highlight', {
  beforeMount(el, binding, vnode) {
    el.style.background = binding.value
  }
})
```

Agora que os gatilhos do ciclo de vida da diretiva personalizada espelha aqueles dos próprios componentes, tornaram-se mais fáceis de compreender e lembrar!

### Caso Extremo: Acessando a Instância do Componente {#edge-case-accessing-the-component-instance}

É geralmente recomendado manter as diretivas independentes da instância do componente em que são usadas. Acessar a instância a partir de dentro duma diretiva personalizada é muitas vezes um sinal de que a diretiva deveria ela própria ser um componente. No entanto, existem situações onde isto de fato faz sentido.

Na Vue 2, a instância do componente tinha de ser acessada através do argumento `vnode`:

```js
bind(el, binding, vnode) {
  const vm = vnode.context
}
```

Na Vue 3, a instância agora é parte do `binding`:

```js
mounted(el, binding, vnode) {
  const vm = binding.instance
}
```

:::warning AVISO
Com o suporte a [fragmentos](../new/fragments#overview), os componentes podem potencialmente ter mais do que um nó de raiz. Quando aplicado à um componente de várias raízes, uma diretiva personalizada será ignorada e um aviso será registado.
:::

## Estratégia de Migração {#migration-strategy}

[Opção da Construção de Migração: `CUSTOM_DIR`](../migration-build#compat-configuration)
