---
badges:
  - breaking
---

# 属性の強制変換 <MigrationBadges :badges="$frontmatter.badges" />

::: info 情報
これは、低レベルの内部 API の変更であり、ほとんどの開発者には影響しません。
:::

## 概要

変更点の概要は次のとおりです:

- 列挙型属性の内部概念を削除し、これらの属性を真偽値でない通常の属性と同じように扱います
- **破壊的変更**: 値が真偽値の `false` の場合、属性を削除しないようにしました。代わりに、attr="false "として設定されます。属性を削除するには、`null` または `undefined` を使用します。

詳細については続きをお読みください！

## 2.x の構文

2.x では、`v-bind` の値を強制変換するために、以下のような戦略をとっていました:

- 属性と要素のペアによっては、Vue は常に対応する IDL 属性（プロパティ）を使用します。これは [`<input>`、`<select>`、`<progress>` などにおける `value`](https://github.com/vuejs/vue/blob/bad3c326a3f8b8e0d3bcf07917dc0adf97c32351/src/platforms/web/util/attrs.js#L11-L18) などです。

- 「[真偽値属性](https://github.com/vuejs/vue/blob/bad3c326a3f8b8e0d3bcf07917dc0adf97c32351/src/platforms/web/util/attrs.js#L33-L40)」と「[xlink](https://github.com/vuejs/vue/blob/bad3c326a3f8b8e0d3bcf07917dc0adf97c32351/src/platforms/web/util/attrs.js#L44-L46)」の場合、Vue は "falsy"（[`undefined`、`null`、`false`](https://github.com/vuejs/vue/blob/bad3c326a3f8b8e0d3bcf07917dc0adf97c32351/src/platforms/web/util/attrs.js#L52-L54)）であれば削除し、それ以外は追加します（[ここ](https://github.com/vuejs/vue/blob/bad3c326a3f8b8e0d3bcf07917dc0adf97c32351/src/platforms/web/runtime/modules/attrs.js#L66-L77)と[ここ](https://github.com/vuejs/vue/blob/bad3c326a3f8b8e0d3bcf07917dc0adf97c32351/src/platforms/web/runtime/modules/attrs.js#L81-L85)を参照）。

- 「[列挙型属性](https://github.com/vuejs/vue/blob/bad3c326a3f8b8e0d3bcf07917dc0adf97c32351/src/platforms/web/util/attrs.js#L20)」（現在は `contenteditable`、`dragable`、`spellcheck`）の場合、Vue はそれらを文字列に[強制変換](https://github.com/vuejs/vue/blob/bad3c326a3f8b8e0d3bcf07917dc0adf97c32351/src/platforms/web/util/attrs.js#L24-L31)しようとします（[vuejs/vue#9397](https://github.com/vuejs/vue/issues/9397) を修正するため、今のところ `contenteditable` については特別扱いしています）。

- その他の属性の場合、"falsy" な値（`undefined`、`null`、`false`）は削除し、その他の値はそのまま設定します（[こちら](https://github.com/vuejs/vue/blob/bad3c326a3f8b8e0d3bcf07917dc0adf97c32351/src/platforms/web/runtime/modules/attrs.js#L92-L113)を参照）。

次の表は、Vue が「列挙型属性」を真偽値でない通常の属性とは異なる方法で強制変換する方法を示しています:

| バインドする式  | `foo` <sup>通常</sup> | `draggable` <sup>列挙型</sup> |
| ------------------- | ----------------------- | --------------------------------- |
| `:attr="null"`      | -                       | `draggable="false"`               |
| `:attr="undefined"` | -                       | -                                 |
| `:attr="true"`      | `foo="true"`            | `draggable="true"`                |
| `:attr="false"`     | -                       | `draggable="false"`               |
| `:attr="0"`         | `foo="0"`               | `draggable="true"`                |
| `attr=""`           | `foo=""`                | `draggable="true"`                |
| `attr="foo"`        | `foo="foo"`             | `draggable="true"`                |
| `attr`              | `foo=""`                | `draggable="true"`                |

上の表からわかるように、現在の実装では `true` は `'true'` に強制変換されますが、`false` の場合は属性が削除されます。これは不一致を引き起こし、`aria-*` 属性（`aria-selected`、`aria-hidden` など）のような非常に一般的なユースケースでは、真偽値を手動で文字列に変換する必要がありました。

## 3.x の構文

この「列挙型属性」という内部概念を削除して、真偽値でない通常の HTML 属性として扱う予定です。

- これにより、真偽値でない通常の属性と「列挙型属性」の間の不一致が解消されます。
- また、`contenteditable` のような属性には、`'true'` と `'false'` 以外の値や、あるいはまだないキーワードを使用できるようになります。

真偽値でない属性については、Vue は `false` の場合に削除するのではなく、`'false'` に強制変換します。

- これにより、`true` と `false` での不一致が解消され、`aria-*` 属性の出力が容易になります

次の表は、新しい動作について説明したものです:

| バインドする式  | `foo` <sup>通常</sup>    | `draggable` <sup>列挙型</sup> |
| ------------------- | -------------------------- | --------------------------------- |
| `:attr="null"`      | -                          | - <sup>*</sup>                    |
| `:attr="undefined"` | -                          | -                                 |
| `:attr="true"`      | `foo="true"`               | `draggable="true"`                |
| `:attr="false"`     | `foo="false"` <sup>*</sup> | `draggable="false"`               |
| `:attr="0"`         | `foo="0"`                  | `draggable="0"` <sup>*</sup>      |
| `attr=""`           | `foo=""`                   | `draggable=""` <sup>*</sup>       |
| `attr="foo"`        | `foo="foo"`                | `draggable="foo"` <sup>*</sup>    |
| `attr`              | `foo=""`                   | `draggable=""` <sup>*</sup>       |

<small>*: 変更箇所</small>

真偽値属性の強制変換についてはそのままです。

## 移行手順

### 列挙型属性

列挙型属性がなかったり `attr="false"` の場合、以下のように異なる IDL 属性値（実際の状態を反映する）が得られることがあります:

| 設定されていない列挙型属性 | IDL 属性と値                     |
| ---------------------- | ------------------------------------ |
| `contenteditable`      | `contentEditable` &rarr; `'inherit'` |
| `draggable`            | `draggable` &rarr; `false`           |
| `spellcheck`           | `spellcheck` &rarr; `true`           |

3.x では、`contentitable` と `spellcheck` のような「列挙型プロパティ」に対して `null` を `'false'` に強制変換することがなくなったため、2.x と同じ動作を維持するには、開発者はこれまで `null` に解決していたこれらの `v-bind` 式を `false` または `'false'` に変更しなければならないでしょう。

2.x では、列挙型属性に対して無効な値が強制的に `'true'` に変換されていました。これは通常、意図しないものであり、大規模に依存する可能性は低いです。3.x では `true` または `'true'` を明示的に指定する必要があります。

### 属性を削除する代わりに `false` を `'false'` に強制変換する

3.x では、属性を明示的に削除するには `null` または `undefined` を使用する必要があります。

### 2.x と 3.x の動作の比較

<table>
  <thead>
    <tr>
      <th>属性</th>
      <th><code>v-bind</code> の値 <sup>2.x</sup></th>
      <th><code>v-bind</code> の値 <sup>3.x</sup></th>
      <th>HTML<br/>出力</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowspan="3">2.x の「列挙型属性」<br><small>例: <code>contenteditable</code>, <code>draggable</code>, <code>spellcheck</code></small></td>
      <td><code>undefined</code></td>
      <td><code>undefined</code>, <code>null</code></td>
      <td><i>除去</i></td>
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
      <td rowspan="2">その他の真偽値でない属性<br><small>例: <code>aria-checked</code>, <code>tabindex</code>, <code>alt</code> など</small></td>
      <td><code>undefined</code>, <code>null</code>, <code>false</code></td>
      <td><code>undefined</code>, <code>null</code></td>
      <td><i>除去</i></td>
    </tr>
    <tr>
      <td><code>'false'</code></td>
      <td><code>false</code>, <code>'false'</code></td>
      <td><code>"false"</code></td>
    </tr>
  </tbody>
</table>

[移行ビルドのフラグ:](../migration-build.html#compat-configuration)

- `ATTR_FALSE_VALUE`
- `ATTR_ENUMERATED_COERCION`
