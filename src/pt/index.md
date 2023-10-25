# Guia de Migração da Vue 3 {#vue-3-migration-guide}

:::warning O suporte da Vue 2 terminará no dia 31 de Dezembro de 2023.
Saiba mais sobre o [Suporte de Longo Prazo Estendido](https://v2.vuejs.org/lts/) se atualização para Vue 3 não for viável antes da data do final da expectativa de vida.
:::

Este guia é primariamente para os utilizadores com experiência de Vue 2 prévia que querem ficar a saber das mudanças entre a Vue 2 e a Vue 3. **Isto não é algo que tens de ler de cima a baixo antes de experimentares a Vue 3.** A maneira recomendada para aprender a Vue 3 é lendo a [nova documentação](https://pt.vuejs.org). 

<!-- VueMastery Start -->
<script setup>
import VueMasteryWidget from '../VueMastery.vue'
</script>
<VueMasteryWidget/>
<!-- VueMastery End -->

## Novas Funcionalidades Notáveis {#notable-new-features}

Algumas das novas funcionalidades a vigiar na Vue 3 incluem:

- [API de Composição](https://pt.vuejs.org/guide/extras/composition-api-faq)<span class="note">\*</span>
- [Açúcar de Sintaxe da API de Composição da SFC (`<script setup>`)](https://pt.vuejs.org/api/sfc-script-setup)<span class="note">\*</span>
- [Teletransporte](https://pt.vuejs.org/guide/built-ins/teleport)
- [Fragmentos](./new/fragments)
- [Opção do Componente de Emissões](https://pt.vuejs.org/api/options-state#emits)<span class="note">\*\*</span>
- [API `createRenderer` de `@vue/runtime-core`](https://pt.vuejs.org/api/custom-renderer) para criar interpretadores personalizados.
- [Variáveis de CSS Orientadas a Estado de Componente de Ficheiro Único (`v-bind` no `<style>`)](https://pt.vuejs.org/api/sfc-css-features#v-bind-in-css)<span class="note">\*</span>
- [`<style scoped>` do Componente de Ficheiro Único agora pode incluir regras globais ou regras que apontam apenas conteúdo encaixado](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0023-scoped-styles-changes.md)
- [Suspense](https://pt.vuejs.org/guide/built-ins/suspense) <sup class="warning">experimental</sup>

<sub class="note"><b>\*</b> Agora também suportada na <a href="https://blog.vuejs.org/posts/vue-2-7-naruto.html" target="_blank">Vue 2.7</a></sub><br>
<sub class="note"><b>\*\*</b> Suportada na Vue 2.7, mas apenas para inferência de tipo</sub>

## Mudanças de Rutura {#breaking-changes}

Mudanças de rutura entre a Vue 2 e Vue 3 são listadas [nesta ligação](./breaking-changes/).

## Novas Recomendações de Nível de Abstração {#new-framework-level-recommendations}

Novas recomendações de nível de abstração são listadas [nesta ligação](./recommendations)

## Construção da Migração {#migration-build}

Se tivermos um projeto de Vue 2 existente ou biblioteca que tencionamos migrar para a Vue 3, fornecemos uma construção de Vue 3 que oferece APIs compatíveis de Vue 2. Consulte a página [Construção de Migração](./migration-build) para mais detalhes.

<style>
.note {
  color: #476582;
}
</style>
