# Novas Recomendações do Nível de Abstração {#new-framework-level-recommendations}

As bibliotecas de apoio para Vue 3 passaram por atualizações principais. Cá está uma sumário das novas recomendações padrão:

- Novas versões do Roteador, Ferramenta de Programação e Utilitários de Teste com suporte de Vue 3
- Cadeia de Ferramenta de Construção: Interface da Linha de Comando da Vue -> [Vite](https://pt.vitejs.dev/)
- Gestão de Estado: Vuex -> [Pinia](https://pinia-docs-pt.netlify.app/)
- Suporte de Ambiente de Desenvolvimento Integrado (IDE): Vetur -> [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)
- Novo suporte de TypeScript de linha de comando: [vue-tsc](https://github.com/johnsoncodehk/volar/tree/master/vue-language-tools/vue-tsc)
- SSG: VuePress -> [VitePress](https://vitepress.vuejs.org/)
- JSX: `@vue/babel-preset-jsx` -> [`@vue/babel-plugin-jsx`](https://github.com/vuejs/jsx-next)

## Detalhes {#details}

### Cadeia de Ferramenta de Construção {#build-toolchain}

Nós agora recomendamos a [Vite](https://pt.vitejs.dev/) como nova cadeia de ferramenta de construção para projetos de Vue 3. A Vite é uma nova ferramenta de construção que oferece inicio de servidor extremamente rápido e desempenho de atualização instantânea. Foi originalmente criada pela equipa de Vue mas agora é uma ferramenta de abstração cruzada. Saiba mais sobre o [porquê estamos a recomendar a Vite](https://pt.vitejs.dev/guide/why).

Tu podes criar um novo projeto de Vue 3 alimentado pela Vite através da [`create-vue`](https://github.com/vuejs/create-vue), nossa nova ferramenta de criação de projeto:

```sh
npm init vue@3
```

Embora a interface da linha de comando da Vue tem também sido atualizada para suportar a Vue 3, agora está em manutenção e já não é recomendada para novos projetos. Para informações sobre a migração da interface da linha de comando da Vue para Vite:

- [Guia de Migração de Vue CLI -> Vite da VueSchool.io](https://vueschool.io/articles/vuejs-tutorials/how-to-migrate-from-vue-cli-to-vite/)
- [Ferramentas / Extensões que ajudam com migração automática](https://github.com/vitejs/awesome-vite#vue-cli)

Também consulte o [capítulo de Ferramental na nova documentação](https://pt.vuejs.org/guide/scaling-up/tooling).

### Vue Router {#vue-router}

A Vue Router 4.0 fornece suporte de Vue 3 e tem um número de mudanças de rutura. Consulte a sua [guia de migração](https://vue-router-docs-pt.netlify.app/guide/migration/index) para detalhes completos:

- [Documentação](https://vue-router-docs-pt.netlify.app/)
- [GitHub](https://github.com/vuejs/router)
- [RFCs](https://github.com/vuejs/rfcs/pulls?q=is%3Apr+is%3Amerged+label%3Arouter)

### Gestão de Estado {#state-management}

A [Pinia](https://pinia-docs-pt.netlify.app/) é a nova solução de gestão de estado de grande escala recomendada. A Pinia foi criada como um protótipo para Vuex 5, e agora evoluiu para a implementação de fato daquilo que tínhamos planeado para a Vuex 5. Nós decidimos manter o seu nome original em respeito da quantidade de trabalho que foi investida nela pelo membro da equipa principal [Eduardo](https://github.com/posva).

- [Documentação](https://pinia-docs-pt.netlify.app/)
- [GitHub](https://github.com/vuejs/pinia)
- [Capítulo de Gestão de Estado na nova documentação](https://pt.vuejs.org/guide/scaling-up/state-management)

A Vuex 4.0 também oferece suporte de Vue 3 em grande parte com a mesma API que a 3.x, e pode ser usada se tiveres memórias de Vuex existentes que precisam de ser migradas para Vue 3. A única mudança de rutura é [como a extensão é instalada](https://vuex.vuejs.org/guide/migrating-to-4-0-from-3-x#breaking-changes).

### Suporte de Ambiente de Desenvolvimento Integrado (IDE) {#ide-support}

A [Volar](https://github.com/johnsoncodehk/volar) é agora a nova extensão de VSCode oficial, com suporte de TypeScript muito melhorado para Componentes de Ficheiro Único (Vue SFC), incluindo inferência de tipo completa para expressões de modelo de marcação.

Se tens instalado a anterior Vetur, certifica-te de a desativar para evitar conflitos com a Volar.

### Extensão das Ferramentas de Programação {#devtools-extension}

A extensão da ferramenta de programação recebeu atualizações principais (lançada como v6) para suportar ambas Vue 2 e Vue 3. Se instalaste anteriormente a v6 através do canal beta, agora podes removê-lo e instalar a extensão a partir do canal estável:

- [Documentação](https://devtools.vuejs.org/guide/installation)
- [GitHub](https://github.com/vuejs/devtools)

### Suporte de TypeScript {#typescript-support}

Tu podes agora verificar o tipo e gerar os ficheiros de definição para os Componentes de Ficheiro Único (Vue SFCs) a partir da linha de comando usando [vue-tsc](https://github.com/johnsoncodehk/volar/tree/master/vue-language-tools/vue-tsc).

Consulte também o [guia de TypeScript na nova documentação](https://vuejs.org/guide/typescript/overview).

### Gerador de Aplicação Estática {#static-site-generator}

A [VitePress](https://vitepress.vuejs.org/) é sucessor espiritual para VuePress, construída sobre a Vue 3 + Vite. Ela fornece uma experiência de programação muito superior e também produz páginas mais rápidas.

### JSX {#jsx}

O suporte de JSX para Vue 3 agora é fornecida através da [`@vue/babel-plugin-jsx`](https://github.com/vuejs/babel-plugin-jsx).
