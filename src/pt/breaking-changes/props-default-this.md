---
badges:
  - breaking
---

# Acesso de `this` da Função Padrão das Propriedades <MigrationBadges :badges="$frontmatter.badges" /> {#props-default-function-this-access}

As funções de fábrica do valor padrão das propriedades já não têm acesso ao `this`.

Ao invés disso:

- As propriedades puras recebidas pelo componente são passadas à função padrão como argumento;

- A API de [injeção](https://pt.vuejs.org/api/composition-api-dependency-injection#inject) pode ser usada dentro das funções padrão.

```js
import { inject } from 'vue'

export default {
  props: {
    theme: {
      default (props) {
        // `props` são os valores puros passados ao componente,
        // antes de quaisquer coerções de tipo ou padrão
        // também podemos usar `inject` para acessar as
        // propriedades injetadas.
        return inject('theme', 'default-theme')
      }
    }
  }
}
```

## Estratégia de Migração {#migration-strategy}

[Opção da Construção de Migração: `PROPS_DEFAULT_THIS`](../migration-build#compat-configuration)
