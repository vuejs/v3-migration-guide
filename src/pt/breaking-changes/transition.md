---
badges:
  - breaking
---

# Mudança da Classe de Transição<MigrationBadges :badges="$frontmatter.badges" /> {#transition-class-change}

## Visão Geral {#overview}

A classe de transição `v-enter` foi renomeada para `v-enter-from` e a classe de transição `v-leave` foi renomeada para `v-leave-from`.

## Sintaxe da 2.x {#_2-x-syntax}

Antes da v2.1.8, tínhamos duas classes de transição para cada direção de transição: estado inicial e em atividade.

Na v2.1.8, introduzimos a `v-enter-to` para abordar o intervalo de tempo entre as transições de entrada e saída. No entanto, por questões de compatibilidade com versões anteriores, o nome `v-enter` era intocável:

```css
.v-enter,
.v-leave-to {
  opacity: 0;
}

.v-leave,
.v-enter-to {
  opacity: 1;
}
```

Isto tornou-se confuso, uma vez que _enter_ e _leave_ eram extensas e não usavam a mesma convenção de nomenclatura como os equivalentes de gatilho de classe.

## Atualização da 3.x {#_3-x-update}

No sentido de ser mais explícito e legível, agora renomeamos estas classes de estado inicial:

```css
.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.v-leave-from,
.v-enter-to {
  opacity: 1;
}
```

Agora está mais claro qual é a diferença entre estes estados.

![Diagrama da Transição](/images/transitions.svg)

Os nomes de propriedade relacionados ao componente `<transition>` também foram mudados:

- `leave-class` foi renomeada para `leave-from-class` (pode ser escrita como `leaveFromClass` nas funções de interpretação ou JSX)
- `enter-class` foi renomeada para `leave-from-class` (pode ser escrita como `enterFromClass` nas funções de interpretação ou JSX)

## Estratégia de Migração {#migration-strategy}

1. Renomear as instâncias de `.v-enter` para `.v-enter-from`
2. Renomear as instâncias de `.v-leave` para `.v-leave-from`
3. Renomear as instâncias dos nomes de propriedades relacionadas, como acima.

## Consulte Também {#see-also}

- [`<Transition>` como raiz já não pode ser alternado a partir de fora](./transition-as-root)
- [`<TransitionGroup>` agora não desenha nenhum elemento envolvente por padrão](./transition-group)
