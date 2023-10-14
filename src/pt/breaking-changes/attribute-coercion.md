---
badges:
  - breaking
---

# Comportamento da Coerção de Atributo <MigrationBadges :badges="$frontmatter.badges" /> {#attribute-coercion-behavior}

:::info INFORMAÇÃO
Isto é uma mudança da API interna de baixo nível e não afeta a maioria dos programadores.
:::

## Visão Geral {#overview}

Eis um sumário de alto nível das mudanças:

- Eliminar o conceito interno de atributos enumerados e tratar estes atributos da mesma maneira que os atributos não booleanos.
- **RUTURA**: Já não remove o atributo se o valor for `false` booleano. Ao invés disto, é definido como `attr="false"`. Para remover o atributo, usamos `null` ou `undefined`.

Para mais informação, continue a leitura!

## Sintaxe da 2.x {#_2-x-syntax}

Na 2.x, tínhamos de seguir estratégias para coagir os valores de `v-bind`:

- Para alguns pares de atributo/elemento, a Vue está sempre a usar o atributo (propriedade) IDL correspondente: [como `value` de `<input>`, `<select>`, `<progress>`, etc](https://github.com/vuejs/vue/blob/bad3c326a3f8b8e0d3bcf07917dc0adf97c32351/src/platforms/web/util/attrs.js#L11-L18).

- Para "[atributos booleanos](https://github.com/vuejs/vue/blob/bad3c326a3f8b8e0d3bcf07917dc0adf97c32351/src/platforms/web/util/attrs.js#L33-L40)" e [xlinks](https://github.com/vuejs/vue/blob/bad3c326a3f8b8e0d3bcf07917dc0adf97c32351/src/platforms/web/util/attrs.js#L44-L46), a Vue os remove se forem "falsos" ([`undefined`, `null` ou `false`](https://github.com/vuejs/vue/blob/bad3c326a3f8b8e0d3bcf07917dc0adf97c32351/src/platforms/web/util/attrs.js#L52-L54)) e de outro modo adiciona-os (consulte este [exemplo](https://github.com/vuejs/vue/blob/bad3c326a3f8b8e0d3bcf07917dc0adf97c32351/src/platforms/web/runtime/modules/attrs.js#L66-L77) e [este](https://github.com/vuejs/vue/blob/bad3c326a3f8b8e0d3bcf07917dc0adf97c32351/src/platforms/web/runtime/modules/attrs.js#L81-L85)).

- Para "[atributos enumerados](https://github.com/vuejs/vue/blob/bad3c326a3f8b8e0d3bcf07917dc0adf97c32351/src/platforms/web/util/attrs.js#L20)" (atualmente `contenteditable`, `draggable`, e `spellcheck`), a Vue tenta [coagi-los](https://github.com/vuejs/vue/blob/bad3c326a3f8b8e0d3bcf07917dc0adf97c32351/src/platforms/web/util/attrs.js#L24-L31) para sequência de caracteres (com tratamento especial para `contenteditable` por agora, para corrigir [vuejs/vue#9397](https://github.com/vuejs/vue/issues/9397)).

- Para os outros atributos, removemos os valores "falsos" (`undefined`, `null`, ou `false`) e definimos outros valores como está (consulte este [exemplo](https://github.com/vuejs/vue/blob/bad3c326a3f8b8e0d3bcf07917dc0adf97c32351/src/platforms/web/runtime/modules/attrs.js#L92-L113)).

A seguinte tabela descreve como a Vue coage os "atributos enumerados" de maneira diferente com os atributos não booleanos normais:

| Expressão de vínculo  | `foo` <sup>normal</sup> | `draggable` <sup>enumerado</sup> |
| ------------------- | ----------------------- | --------------------------------- |
| `:attr="null"`      | -                       | `draggable="false"`               |
| `:attr="undefined"` | -                       | -                                 |
| `:attr="true"`      | `foo="true"`            | `draggable="true"`                |
| `:attr="false"`     | -                       | `draggable="false"`               |
| `:attr="0"`         | `foo="0"`               | `draggable="true"`                |
| `attr=""`           | `foo=""`                | `draggable="true"`                |
| `attr="foo"`        | `foo="foo"`             | `draggable="true"`                |
| `attr`              | `foo=""`                | `draggable="true"`                |

Nós podemos ver a partir da tabela acima, a implementação atual coage `true` para `'true'` mas remove o atributo se for `false`. Isto também levava à inconsistências e exigia que os utilizadores coagissem manualmente os valores booleanos para sequência de caracteres nos casos de uso muito comuns como atributos `aria-*` como `aria-selected`, `aria-hidden`, etc.

## Sintaxe da 3.x {#_3-x-syntax}

Nós tencionamos desistir deste conceito interno de "atributos enumerados" e tratá-los como atributos de HTML não booleano normais.

- Isto soluciona a inconsistência entre atributos não booleanos normais e "atributos enumerados".
- Também torna possível usar outros valores além de `'true'` e `'false'`, ou mesmo palavras-chave que ainda virão, para atributos como `contenteditable`.

Para os atributos não booleanos, a Vue parará de as remover se forem `false` e as coagirá para `'false'`.

- Isto soluciona a inconsistência entre `true` e `false` e facilita a saída de atributos `aria-*`

A seguinte tabela descreve o novo comportamento:

| Expressão de vínculo  | `foo` <sup>normal</sup>    | `draggable` <sup>enumerado</sup> |
| ------------------- | -------------------------- | --------------------------------- |
| `:attr="null"`      | -                          | - <sup>*</sup>                    |
| `:attr="undefined"` | -                          | -                                 |
| `:attr="true"`      | `foo="true"`               | `draggable="true"`                |
| `:attr="false"`     | `foo="false"` <sup>*</sup> | `draggable="false"`               |
| `:attr="0"`         | `foo="0"`                  | `draggable="0"` <sup>*</sup>      |
| `attr=""`           | `foo=""`                   | `draggable=""` <sup>*</sup>       |
| `attr="foo"`        | `foo="foo"`                | `draggable="foo"` <sup>*</sup>    |
| `attr`              | `foo=""`                   | `draggable=""` <sup>*</sup>       |

<small>*: mudado</small>

A coerção para atributos booleanos não é afetada.

## Estratégia de Migração {#migration-strategy}

### Atributos Enumerados {#enumerated-attributes}

A ausência dum atributo enumerado e `attr="false"` pode produzir valores de atributo de IDL diferentes (o que refletirá o estado de fato), descrito da seguinte forma:

| Atributo Enumerado Ausente | Atributo & Valor de IDL                     |
| ---------------------- | ------------------------------------ |
| `contenteditable`      | `contentEditable` &rarr; `'inherit'` |
| `draggable`            | `draggable` &rarr; `false`           |
| `spellcheck`           | `spellcheck` &rarr; `true`           |

Uma vez que já não coagimos `null` para `'false'` para as “propriedades enumeradas” na 3.x, no caso de `contenteditable` e `spellcheck`, os programadores precisarão de mudar estas expressões de `v-bind` que costumavam a resolver para `null` para resolver para `false` ou `'false'` no sentido de manter o mesmo comportamento da 2.x.

Na 2.x, os valores inválidos eram coagidos à `'true'` para os atributos enumerados. Isto era geralmente involuntário e pouco suscetível de ser usada em grande escala. Na 3.x `true` ou `'true'` deveriam ser explicitamente especificados.

### Coagir `false` to `'false'` ao invés de remover o atributo {#coercing-false-to-false-instead-of-removing-the-attribute}

Na 3.x, `null` ou `undefined` deve ser usado para remover explicitamente um atributo.

### Comparação entre o comportamento da 2.x & 3.x {#comparison-between-2-x-3-x-behavior}

<table>
  <thead>
    <tr>
      <th>Atributo</th>
      <th>valor de <code>v-bind</code> <sup>2.x</sup></th>
      <th>valor de <code>v-bind</code> <sup>3.x</sup></th>
      <th>Saída de HTML</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowspan="3">“Atributos enumerados” da 2.x<br><small>ou seja <code>contenteditable</code>, <code>draggable</code> e <code>spellcheck</code>.</small></td>
      <td><code>undefined</code></td>
      <td><code>undefined</code>, <code>null</code></td>
      <td><i>removido</i></td>
    </tr>
    <tr>
      <td>
        <code>true</code>, <code>'true'</code>, <code>''</code>, <code>1</code>,
        <code>'foo'</code>
      </td>
      <td><code>true</code>, <code>'true'</code></td>
      <td><code>"true"</code></td>
    </tr>
    <tr>
      <td><code>null</code>, <code>false</code>, <code>'false'</code></td>
      <td><code>false</code>, <code>'false'</code></td>
      <td><code>"false"</code></td>
    </tr>
    <tr>
      <td rowspan="2">Outros atributos não booleanos<br><small>por exemplo, <code>aria-checked</code>, <code>tabindex</code>, <code>alt</code>, etc.</small></td>
      <td><code>undefined</code>, <code>null</code>, <code>false</code></td>
      <td><code>undefined</code>, <code>null</code></td>
      <td><i>removido</i></td>
    </tr>
    <tr>
      <td><code>'false'</code></td>
      <td><code>false</code>, <code>'false'</code></td>
      <td><code>"false"</code></td>
    </tr>
  </tbody>
</table>

[Opções da Construção de Migração:](../migration-build#compat-configuration)

- `ATTR_FALSE_VALUE`
- `ATTR_ENUMERATED_COERCION`
