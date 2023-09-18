---
badges:
  - breaking
---

# `v-model` <MigrationBadges :badges="$frontmatter.badges" /> {#v-model}

## Visão Geral {#overview}

Em termos do que mudou, num alto nível:

- **RUTURA:** Quando usada sobre os componentes personalizados, os nomes padrão da propriedade e evento da `v-model` são mudados:
  - propriedade: `value` -> `modelValue`;
  - evento: `input` -> `update:modelValue`;
- **RUTURA:** O modificar `.sync` da `v-bind` e a opção `model` do componente foram removidos e substituídos por um argumento na `v-model`;
- **NOVO:** Agora é possível realizar vários vínculos de `v-model` sobre o mesmo componente;
- **NOVO:** Adicionada a habilidade de criar modificadores de `v-model` personalizados.

Para mais informação, continue a ler!

## Introdução {#introduction}

Quando a Vue 2.0 foi lançada, a diretiva `v-model` exigia que os programadores usassem sempre a propriedade `value`. E se os programadores precisassem de propriedades diferentes para diferentes propósitos, teriam de recorrer ao uso de `v-bind.sync`. Além disto, este relacionamento escrito manualmente entre `v-model` e `value` conduz a problemas a respeito de como os elementos nativos e elementos personalizados eram manipulados.

Na 2.2, introduzimos a opção de componente `model` que permite o componente personalizar a propriedade e evento à usar para `v-model`. No entanto, isto ainda permitia apenas uma única `v-model` para ser usada sobre o componente.

Com a Vue 3, a API para o vínculo de dados bidirecional está a ser padronizada no sentido de reduzir a confusão e permitir que os programadores tenham mais flexibilidade com a diretiva `v-model`.

## Sintaxe da 2.x {#_2-x-syntax}

Na 2.x, usar uma `v-model` sobre um componente era equivalente a passar uma propriedade `value` e emitir um evento de `input`:

```html
<ChildComponent v-model="pageTitle" />

<!-- seria abreviação para: -->

<ChildComponent :value="pageTitle" @input="pageTitle = $event" />
```

Se quiséssemos mudar os nomes da propriedade ou evento para algo diferente, precisaríamos de adicionar uma opção `model` ao componente `ChildComponent`:

```html
<!-- ParentComponent.vue -->

<ChildComponent v-model="pageTitle" />
```

```js
// ChildComponent.vue

export default {
  model: {
    prop: 'title',
    event: 'change'
  },
  props: {
    // isto permite usar a propriedade `value` para um propósito diferente
    value: String,
    // usar `title` como propriedade que toma o lugar de `value`
    title: {
      type: String,
      default: 'Default title'
    }
  }
}
```

Então, `v-model` neste caso seria uma abreviação para

```html
<ChildComponent :title="pageTitle" @change="pageTitle = $event" />
```

### Usando `v-bind.sync` {#using-v-bind-sync}

Em alguns casos, podemos precisar do "vínculo bidirecional" para uma propriedade (algumas vezes além da `v-model` existente para a propriedade diferente). Para fazer isto, recomendamos emitir os eventos no padrão de `update:myPropName`. Por exemplo, para `ChildComponent` do exemplo anterior com a propriedade `title`, poderíamos comunicar a intenção de atribuir um novo valor com:

```js
this.$emit('update:title', newValue)
```

Depois o pai poderia ouvir este evento e atualizar uma propriedade de dados local, se quisesse. Por exemplo:

```html
<ChildComponent :title="pageTitle" @update:title="pageTitle = $event" />
```

Por conveniência, tínhamos uma abreviação para este padrão com o modificador `.sync`:

```html
<ChildComponent :title.sync="pageTitle" />
```

## Sintaxe da 3.x {#_3-x-syntax}

Na 3.x, usar a `v-model` sobre o componente personalizado é equivalente a passar uma propriedade `modelValue` e emitir um evento `update:modelValue`:

```html
<ChildComponent v-model="pageTitle" />

<!-- seria abreviação para: -->

<ChildComponent
  :modelValue="pageTitle"
  @update:modelValue="pageTitle = $event"
/>
```

### Argumentos de `v-model` {#v-model-arguments}

Para mudar o nome dum modelo, ao invés duma opção de componente `model`, agora podemos passar um _argumento_ à `v-model`:

```html
<ChildComponent v-model:title="pageTitle" />

<!-- seria abreviação para: -->

<ChildComponent :title="pageTitle" @update:title="pageTitle = $event" />
```

![anatomia da `v-bind`](/images/v-bind-instead-of-sync.png)

Isto também serve como uma substituição para o modificador `.sync` e permite-nos ter várias `v-model` sobre o componente personalizado:

```html
<ChildComponent v-model:title="pageTitle" v-model:content="pageContent" />

<!-- seria abreviação para: -->

<ChildComponent
  :title="pageTitle"
  @update:title="pageTitle = $event"
  :content="pageContent"
  @update:content="pageContent = $event"
/>
```

### Modificadores de `v-model` {#v-model-modifiers}

Além dos modificadores de `v-model` escritos manualmente da 2.x como `.trim`, agora a 3.x suporta modificadores personalizados:

```html
<ChildComponent v-model.capitalize="pageTitle" />
```

Leia mais sobre [modificadores de `v-model` personalizados sobre os componentes](https://pt.vuejs.org/guide/components/v-model#handling-v-model-modifiers).

## Estratégia de Migração {#migration-strategy}

Nós recomendamos:

- verificar a base de código à procura pelo uso de `.sync` e substituí-lo por `v-model`:

  ```html
  <ChildComponent :title.sync="pageTitle" />

  <!-- para ser substituído por -->

  <ChildComponent v-model:title="pageTitle" />
  ```

- para todas as `v-model` sem argumentos, certificar-se de mudar os nome das propriedades e eventos para `modelValue` e `update:modelValue` respetivamente:

  ```html
  <ChildComponent v-model="pageTitle" />
  ```

  ```js
  // ChildComponent.vue

  export default {
    props: {
      modelValue: String // anteriormente era `value: String`
    },
    emits: ['update:modelValue'],
    methods: {
      changePageTitle(title) {
        this.$emit('update:modelValue', title) // anteriormente era `this.$emit('input', title)`
      }
    }
  }
  ```

[Opções da Construção de Migração:](../migration-build#compat-configuration)

- `COMPONENT_V_MODEL`
- `COMPILER_V_BIND_SYNC`

## Próximas Etapas {#next-steps}

Para mais informação sobre a nova sintaxe da `v-model`, consulte:

- [Uso da `v-model` sobre os Componentes](https://pt.vuejs.org/guide/components/v-model)
- [Argumentos da `v-model`](https://pt.vuejs.org/guide/components/v-model#v-model-arguments)
- [Manipulação dos modificadores da `v-model`](https://pt.vuejs.org/guide/components/v-model#handling-v-model-modifiers)
