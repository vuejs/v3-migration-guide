---
badges:
  - breaking
---

# Opção `data` <MigrationBadges :badges="$frontmatter.badges" /> {##data-option}

## Visão Geral {#overview}

- **RUTURA**: a declaração da opção de componente `data` já não aceita um `object` de JavaScript simples e espera uma declaração de `function`.

- **RUTURA**: quando combinamos vários valores de retorno de `data` a partir de misturas ou extensões, a combinação agora é superficial ao invés de profunda (apenas as propriedades do nível da raiz são combinadas).

## Sintaxe da 2.x {#_2-x-syntax}

Na 2.x, os programadores poderiam definir a opção `data` ou com um `object` ou uma `function`.

Por exemplo:

```html
<!-- Declaração de Objeto -->
<script>
  const app = new Vue({
    data: {
      apiKey: 'a1b2c3'
    }
  })
</script>

<!-- Declaração de Função -->
<script>
  const app = new Vue({
    data() {
      return {
        apiKey: 'a1b2c3'
      }
    }
  })
</script>
```

Embora isto fornecesse alguma conveniência em termos de instâncias de raiz terem um estado partilhado, isto levava à confusão devido ao fato de que apenas é possível na instância de raiz.

## Atualização da 3.x {#_3-x-update}

Na 3.x, a opção `data` foi padronizada para apenas aceitar uma `function` que retorna um `object`.

Usando o exemplo acima, apenas existiria uma implementação possível do código:

```html
<script>
  import { createApp } from 'vue'

  createApp({
    data() {
      return {
        apiKey: 'a1b2c3'
      }
    }
  }).mount('#app')
</script>
```

## Mudança do Comportamento de Combinação de Mistura {#mixin-merge-behavior-change}

Além disto, quando `data()` dum componente e suas misturas ou base de extensões forem combinadas, a combinação agora é realizada *superficialmente*:

```js
const Mixin = {
  data() {
    return {
      user: {
        name: 'Jack',
        id: 1
      }
    }
  }
}

const CompA = {
  mixins: [Mixin],
  data() {
    return {
      user: {
        id: 2
      }
    }
  }
}
```

Na Vue 2.x, a `$data` resultante é:

```json
{
  "user": {
    "id": 2,
    "name": "Jack"
  }
}
```

Na 3.0, o resultado será:

```json
{
  "user": {
    "id": 2
  }
}
```

[Opção da Construção de Migração: `OPTIONS_DATA_FN`](../migration-build#compat-configuration)

## Estratégia de Migração {#migration-strategy}

Para os utilizadores que dependem da declaração de objeto, recomendamos:

- Extrair os dados partilhados para um objeto eterno e usá-lo como uma propriedade na `data`
- Reescrever as referências aos dados partilhados para apontarem para um novo objeto partilhado

Para os utilizadores que dependem do comportamento de combinação profunda das misturas, recomendamos refazer o código para evitar tal dependência completamente, uma vez que combinações profundas das misturas são muitos implícitas e podem tornar a lógica do código mais difícil de entender e depurar.

[Opções da Construção de Migração:](../migration-build#compat-configuration)

- `OPTIONS_DATA_FN`
- `OPTIONS_DATA_MERGE`
