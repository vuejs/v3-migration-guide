---
badges:
  - removed
---

# Filtros <MigrationBadges :badges="$frontmatter.badges" /> {#filters}

## Visão Geral {#overview}

Os filtros foram removidos da Vue 3.0 e já não são suportados.

## Sintaxe da 2.x {#_2-x-syntax}

Na 2.x, os programadores poderiam usar os filtros para aplicar formatação de texto comum.

Por exemplo:

```html
<template>
  <h1>Bank Account Balance</h1>
  <p>{{ accountBalance | currencyUSD }}</p>
</template>

<script>
  export default {
    props: {
      accountBalance: {
        type: Number,
        required: true
      }
    },
    filters: {
      currencyUSD(value) {
        return '$' + value
      }
    }
  }
</script>
```

Embora isto pareça como uma conveniência, exige uma sintaxe personalizada que quebra a suposição de expressões dentro das chavetas serem "apenas JavaScript", o que tem ambos custos de aprendizagem e implementação.

## Atualização da 3.x {#_3-x-update}

Na 3.x, os filtros foram removidos e já não são suportados. Ao invés disto, recomendamos substituí-los por chamadas de métodos ou propriedades computadas.

Usando o exemplo acima, eis um exemplo de como poderia ser implementado:

```html
<template>
  <h1>Bank Account Balance</h1>
  <p>{{ accountInUSD }}</p>
</template>

<script>
  export default {
    props: {
      accountBalance: {
        type: Number,
        required: true
      }
    },
    computed: {
      accountInUSD() {
        return '$' + this.accountBalance
      }
    }
  }
</script>
```

## Estratégia de Migração {#migration-strategy}

No lugar do uso de filtros, recomendamos substituí-los por propriedades computadas ou métodos.

[Opções da Construção de Migração:](../migration-build#compat-configuration)

- `FILTERS`
- `COMPILER_FILTERS`

### Filtros Globais {#global-filters}

Se estivermos a usar os filtros que eram registados globalmente e depois usados por toda nossa aplicação, provavelmente não é conveniente substituí-los por propriedades computadas ou métodos em cada componente individual.

Ao invés disto, podemos tornar os nossos filtros globais disponíveis à todos os componentes através da [`globalProperties`](https://pt.vuejs.org/api/application#app-config-globalproperties):

```js
// main.js
const app = createApp(App)

app.config.globalProperties.$filters = {
  currencyUSD(value) {
    return '$' + value
  }
}
```

Depois podemos consertar todos os modelos de marcação usando este objeto `$filters` desta maneira:

```html
<template>
  <h1>Bank Account Balance</h1>
  <p>{{ $filters.currencyUSD(accountBalance) }}</p>
</template>
```

Nota que com esta abordagem, apenas podemos usar métodos, e nada de propriedades computadas, visto que o segundo apenas faz sentido quando definido no contexto dum componente individual.
