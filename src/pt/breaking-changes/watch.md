---
badges:
  - breaking
---

# Observação dos Vetores <MigrationBadges :badges="$frontmatter.badges" /> {#watch-on-arrays}

## Visão Geral {#overview}

- **RUTURA**: Quando observamos um vetor, a função de resposta apenas aciona quando o vetor é substituído. Se precisarmos de acionar na mutação, a opção `deep` deve ser especificada.

## Sintaxe da 3.x {#_3-x-syntax}

Quando usamos [a opção `watch`](https://pt.vuejs.org/api/options-state#watch) para observar um vetor, a função de resposta apenas aciona quando o vetor é substituído. Em outras palavras, a função de resposta do observador não será mais acionada na mutação do vetor. Para acionar na mutação, a opção `deep` deve ser especificada.

```js
watch: {
  bookList: {
    handler(val, oldVal) {
      console.log('book list changed')
    },
    deep: true
  },
}
```

## Estratégia de Migração {#migration-strategy}

Se dependermos da observação de mutações de vetores, adicionamos a opção `deep` para garantir que a nossa função de resposta é acionada corretamente.

[Opção da Construção de Migração: `WATCH_ARRAY`](../migration-build#compat-configuration)
