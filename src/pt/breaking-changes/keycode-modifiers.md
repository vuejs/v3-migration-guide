---
badges:
  - breaking
---

# Modificadores de Código de Tecla <MigrationBadges :badges="$frontmatter.badges" /> {#keycode-modifiers}

## Visão Geral {#overview}

Eis um rápido sumário do que mudou:

- **RUTURA**: Usamos números, ou seja, os códigos da tecla, uma vez que modificadores da `v-on` já não são suportados.
- **RUTURA**: `config.keyCodes` já não é suportado.

## Sintaxe da 2.x {#_2-x-syntax}

Na Vue 2, `keyCodes` era suportado como uma maneira de modificar um método de `v-on`:

```html
<!-- versão de código de tecla -->
<input v-on:keyup.13="submit" />

<!-- versão de pseudónimo -->
<input v-on:keyup.enter="submit" />
```

Além disto, poderíamos definir os nossos próprios pseudónimos através duma opção `config.keyCodes` global:

```js
Vue.config.keyCodes = {
  f1: 112
}
```

```html
<!-- versão de código de tecla -->
<input v-on:keyup.112="showHelpText" />

<!-- versão de pseudónimo personalizado -->
<input v-on:keyup.f1="showHelpText" />
```

## Sintaxe da 3.x {#_3-x-syntax}

Já que a [`KeyboardEvent.keyCode` foi depreciado](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode), também já não faz sentido para a Vue 3 continuar a suportar isto. Como resultado, agora é recomendado usar o nome de caixa-espetada para qualquer chave que quisermos usar como um modificador:

```html
<!-- Modificador de Tecla da Vue 3 sobre a `v-on` -->
<input v-on:keyup.page-down="nextPage">

<!-- Corresponde a ambos q e Q -->
<input v-on:keypress.q="quit">
```

Como resultado, isto significa que `config.keyCodes` agora também está depreciada e já não será suportada.

## Estratégia de Migração {#migration-strategy}

Para aqueles usando `keyCode` na sua base de código, recomendados convertê-los aos seus equivalentes nomeados com a caixa-espetada.

As teclas para alguns marcadores de pontuação apenas podem ser incluídos literalmente, por exemplo para a tecla `,`:

```html
<input v-on:keypress.,="commaPress">
```

Limitações da sintaxe impedem certos caracteres de serem correspondidos, tais como `"`, `'`, `/`, `=`, `>`, e `.`. Para estes caracteres devemos verificar a `event.key` dentro do ouvinte.

[Opção da Construção de Migração:](../migration-build#compat-configuration)

- `CONFIG_KEY_CODES`
- `V_ON_KEYCODE_MODIFIER`
