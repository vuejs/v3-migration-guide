export default {
  title: 'Guia de Migração da Vue 3',
  description: 'Guia sobre a migração da Vue 2 à Vue 3',
  lang: 'pt-PT',
  themeConfig: {
    nav: [
      { text: 'Documentação da Vue 3', link: 'https://pt.vuejs.org' },
    ],

    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Visão Geral', link: '/pt/' },
          { text: 'Novas Recomendações', link: '/pt/recommendations' },
          { text: 'Construção de Migração', link: '/pt/migration-build' },
          {
            text: 'Mudanças de Rutura',
            link: '/pt/breaking-changes/'
          }
        ]
      },
      {
        text: 'API Global',
        items: [
          {
            text: 'Instância e Aplicação da API Global',
            link: '/pt/breaking-changes/global-api'
          },
          {
            text: 'Agitação de Árvore da API Global',
            link: '/pt/breaking-changes/global-api-treeshaking'
          }
        ]
      },
      {
        text: 'Diretivas do Modelo de Marcação',
        items: [
          { text: 'v-model', link: '/pt/breaking-changes/v-model' },
          {
            text: 'Mudança de Uso de `key`',
            link: '/pt/breaking-changes/key-attribute'
          },
          {
            text: 'Precedência de `v-if` vs. `v-for`',
            link: '/pt/breaking-changes/v-if-v-for'
          },
          {
            text: 'Comportamento de Combinação de `v-bind`',
            link: '/pt/breaking-changes/v-bind'
          },
          {
            text: 'Modificador `v-on.native` removido',
            link: '/pt/breaking-changes/v-on-native-modifier-removed'
          }
        ]
      },
      {
        text: 'Componentes',
        items: [
          {
            text: 'Componentes Funcionais',
            link: '/pt/breaking-changes/functional-components'
          },
          {
            text: 'Componentes Assíncronos',
            link: '/pt/breaking-changes/async-components'
          },
          {
            text: 'Opção `emits`',
            link: '/pt/breaking-changes/emits-option'
          }
        ]
      },
      {
        text: 'Função de Interpretação',
        items: [
          {
            text: 'API da Função de Interpretação',
            link: '/pt/breaking-changes/render-function-api'
          },
          {
            text: 'Unificação de Ranhuras',
            link: '/pt/breaking-changes/slots-unification'
          },
          {
            text: '`$listeners` combinados no `$attrs`',
            link: '/pt/breaking-changes/listeners-removed'
          },
          {
            text: '`$attrs` inclui `class` & `style`',
            link: '/pt/breaking-changes/attrs-includes-class-style'
          }
        ]
      },
      {
        text: 'Elementos Personalizados',
        items: [
          {
            text: 'Mudanças Interoperacionais dos Elementos Personalizados',
            link: '/pt/breaking-changes/custom-elements-interop'
          }
        ]
      },
      {
        text: 'APIs Removidas',
        items: [
          {
            text: 'Modificadores de `keyCode` de `v-on`',
            link: '/pt/breaking-changes/keycode-modifiers'
          },
          { text: 'API de Eventos', link: '/pt/breaking-changes/events-api' },
          { text: 'Filtros', link: '/pt/breaking-changes/filters' },
          {
            text: '`inline-template`',
            link: '/pt/breaking-changes/inline-template-attribute'
          },
          {
            text: '`$children`', link: '/pt/breaking-changes/children'
          },
          {
            text: 'Opção `propsData`',
            link: '/pt/breaking-changes/props-data'
          }
        ]
      },
      {
        text: 'Outras Pequenas Mudanças',
        items: [
          {
            text: 'Comportamento de Coerção de Atributo',
            link: '/pt/breaking-changes/attribute-coercion'
          },
          {
            text: 'Diretivas Personalizadas',
            link: '/pt/breaking-changes/custom-directives'
          },
          {
            text: 'Opção `data`',
            link: '/pt/breaking-changes/data-option'
          },
          {
            text: 'Mudanças da API de Montagem',
            link: '/pt/breaking-changes/mount-changes'
          },
          {
            text: 'Acesso de `this` da Função Padrão das Propriedades',
            link: '/pt/breaking-changes/props-default-this'
          },
          {
            text: 'Mudança da Classe de Transição',
            link: '/pt/breaking-changes/transition'
          },
          {
            text: '`Transition` como Raiz',
            link: '/pt/breaking-changes/transition-as-root'
          },
          {
            text: 'Elemento de Raiz do Grupo de Transição',
            link: '/pt/breaking-changes/transition-group'
          },
          {
            text: 'Eventos do Ciclo de Vida do Nó Virtual',
            link: '/pt/breaking-changes/vnode-lifecycle-events'
          },
          {
            text: 'Observação dos Vetores',
            link: '/pt/breaking-changes/watch'
          }
        ]
      }
    ]
  }
}