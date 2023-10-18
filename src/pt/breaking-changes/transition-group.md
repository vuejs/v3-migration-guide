---
badges:
  - breaking
---

# Elemento de Raiz do Grupo de Transição <MigrationBadges :badges="$frontmatter.badges" /> {#transition-group-root-element}

## Visão Geral {#overview}

`<transition-group>` já não desenha um elemento de raiz por padrão, mais ainda pode criar um com o atributo `tag`.

## Sintaxe da 2.x {#_2-x-syntax}

Na Vue 2, `<transition-group>`, tal como outros componentes personalizados, precisava dum elemento de raiz, que por padrão era `<span>` mas era personalizável através do atributo `tag`:

```html
<transition-group tag="ul">
  <li v-for="item in items" :key="item">
    {{ item }}
  </li>
</transition-group>
```

## Sintaxe da 3.x {#_3-x-syntax}

Na Vue 3, temos [suporte a fragmento](../new/fragments.html), então os componentes já não _precisam_ dum nó de raiz. Consequentemente, `<transition-group>` já não desenha um por padrão.

- Se já tivermos o atributo `tag` definido no nosso código de Vue 2, tal como no exemplo acima, tudo funcionará como antes.
- Se não tínhamos um definido _e_ a nossa estilização ou outros comportamentos dependem da presença do elemento de raiz `<span>` para funcionar apropriadamente, simplesmente adicionamos `tag="span"` ao `<transition-group>`:

```html
<transition-group tag="span">
  <!-- -->
</transition-group>
```

## Estratégia de Migração {#migration-strategy}

[Opção de Construção de Migração: `TRANSITION_GROUP_ROOT`](../migration-build#compat-configuration)

## Consulte Também {#see-also}

- [Algumas classes de transição foram renomeadas](./transition)
- [`<Transition>` como raiz já não pode ser alternado a partir de fora](./transition-as-root)
