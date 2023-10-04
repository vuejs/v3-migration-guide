---
badges:
  - breaking
---

# Interoperabilidade dos Elementos Personalizados <MigrationBadges :badges="$frontmatter.badges" /> {#custom-elements-interop}

## Visão Geral {#overview}

- **RUTURA:** As verificações para determinar se os marcadores devem ser tratados como elementos personalizados são agora realizadas durante a compilação do modelo de marcação, e deve ser configurada através das opções do compilador ao invés da configuração do tempo de execução.
- **RUTURA:** O uso do atributo `is` especial está restrito apenas ao marcador `<component>` reservado.
- **NOVO:** Para suportar os casos de uso da 2.x onde `is` era usado sobre os elementos nativos para dar a volta as restrições de analise do HTML nativo, prefixamos o valor com `vue:` para resolvê-lo como um componente de Vue.

## Elementos Personalizados Autónomos {#autonomous-custom-elements}

Se quisermos adicionar um elemento personalizado definido fora da Vue (por exemplo, usando a API de Componentes da Web), precisamos de 'instruir' a Vue à tratá-lo como um elemento personalizado. Vamos usar o seguinte modelo de marcação como um exemplo:

```html
<plastic-button></plastic-button>
```

### Sintaxe da 2.x {#_2-x-syntax}

Na Vue 2.x, a configuração dos marcadores como elementos personalizado era feita através da `Vue.config.ignoredElements`:

```js
// Isto fará a Vue ignorar elemento personalizado definido fora da Vue
// (por exemplo, usando as APIs de Componentes da Web)

Vue.config.ignoredElements = ['plastic-button']
```

### Sintaxe da 3.x {#_3-x-syntax}

**Na Vue 3.0, esta verificação é realizada durante a compilação do modelo de marcação.** Para instruir o compilador à tratar `<plastic-button>` como um elemento personalizado:

- Se estivermos a usar uma etapa de construção: passamos a opção `isCustomElement` ao compilador do modelo de marcação da Vue. Se estivermos a usar o `vue-loader`, esta deve ser passada através da opção `compilerOptions` da `vue-loader`:

  ```js
  // na configuração da webpack
  rules: [
    {
      test: /\.vue$/,
      use: 'vue-loader',
      options: {
        compilerOptions: {
          isCustomElement: tag => tag === 'plastic-button'
        }
      }
    }
    // ...
  ]
  ```

- Se estivermos a usar a compilação de modelo de marcação em tempo real, passamos-o através `app.config.compilerOptions.isCustomElement`:

  ```js
  const app = Vue.createApp({})
  app.config.compilerOptions.isCustomElement = tag => tag === 'plastic-button'
  ```

  É importante notar que a configuração da execução apenas afeta a compilação de modelo de marcação da execução - não afetará os modelos de marcação pré-compilados.

## Elementos Embutidos Personalizados {#customized-built-in-elements}

A especificação dos Elementos Personalizados fornece uma maneira de usar os elementos personalizados como [Elemento Embutido Personalizado](https://html.spec.whatwg.org/multipage/custom-elements.html#custom-elements-customized-builtin-example) adicionado o atributo `is` à um elemento embutido:

```html
<button is="plastic-button">Click Me!</button>
```

O uso da Vue do atributo especial `is` era simular o que o atributo nativo faz antes que fosse tornado universalmente disponível nos navegadores. No entanto, na 2.X era interpretado como desenhar um componente de Vue com o nome `plastic-button`. Isto bloqueia o uso nativo do Elemento Embutido Personalizado mencionado acima.

Na 3.0, estamos limitando o tratamento especial da Vue do atributo `is` apenas ao marcador `<component>`:

- Quando usado no marcador `<component>` reservado, comportar-se-á exatamente como na 2.x;
- Quando usado sobre os componentes normais, comportar-se-á tal como um atributo normal:

  ```html
  <foo is="bar" />
  ```

  - Comportamento da 2.x: desenha o componente `bar`.
  - Comportamento da 3.x: desenha o componente `foo` e passando o atributo `is`.

- Quando usado sobre os elementos simples, será passado à chamada de `createElement` como o atributo `is`, e também será desenhado como um atributo nativo. Isto suporta o uso dos elementos embutidos personalizados:

  ```html
  <button is="plastic-button">Click Me!</button>
  ```

  - Comportamento da 2.x: desenha o componente `plastic-button`.
  - Comportamento da 3.x: desenha um botão nativo chamado:

    ```js
    document.createElement('button', { is: 'plastic-button' })
    ```

[Opção da Construção de Migração: `COMPILER_IS_ON_ELEMENT`](../migration-build#compat-configuration)

## Prefixo `vue:` para Solucionar a Analise do Modelo de Marcação no DOM {#vue-prefix-for-in-dom-template-parsing-workarounds}

> Nota: esta seção apenas afeta casos onde os modelos de marcação da Vue são diretamente escritos no HTML da página. Quando usamos os modelos de marcação no DOM, o modelo de marcação está sujeito às regras de analise de HTML nativa. Alguns elementos de HTML, tal como `<ul>`, `<ol>`, `<table>` e `<select>` têm restrições sobre quais elementos podem aparecer dentro deles, e alguns elementos tais como `<li>`, `<tr>`, e `<option>` apenas podem aparecer dentro de outros certos elementos.

### Sintaxe da 2.x {#_2-x-syntax-1}

Na Vue 2, recomendados dar a volta a estas restrições usando o atributo `is` sobre um marcador nativo:

```html
<table>
  <tr is="blog-post-row"></tr>
</table>
```

### Sintaxe da 3.x {#_3-x-syntax-1}

Com a mudança de comportamento do `is`, um prefixo `vue:` agora é necessário para resolver o elemento como um componente de Vue:

```html
<table>
  <tr is="vue:blog-post-row"></tr>
</table>
```

## Estratégia de Migração {#migration-strategy}

- Substituir `config.ignoredElements` ou com a `compilerOptions` da `vue-loader` (com a etapa de construção) ou com a `app.config.compilerOptions.isCustomElement` (com a compilação do modelo de marcação em tempo real).

- Mudar todos os marcadores que são `<component>` com o uso do `is` para `<component is="...">` (para os modelos de marcação do componente de ficheiro único) ou o prefixar com `vue:` (para os modelos de marcação no DOM).

## Consulte também {#see-also}

- [Guia - Vue e os Componentes da Web](https://pt.vuejs.org/guide/extras/web-components)
