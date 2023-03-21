# Гід з міграції на Vue 3

:::warning Підтримка Vue 2 припиниться 31 грудня 2023 року.
Дізнайтеся більше про [Extended LTS](https://v2.vuejs.org/lts/), якщо оновлення до Vue 3 неможливо до дати EOL.
:::

Цей посібник насамперед призначений для користувачів із попереднім досвідом роботи з Vue 2, які хочуть дізнатися про зміни між Vue 2 і Vue 3. **Це не те, що вам потрібно читати зверху вниз, перш ніж випробувати Vue 3.** Рекомендований спосіб Щоб дізнатися Vue 3, прочитайте [нову документацію](https://vuejs.org).

<!-- VueMastery Start -->
<script setup>
import VueMasteryWidget from './VueMastery.vue'
</script>
<VueMasteryWidget/>
<!-- VueMastery End -->

## Визначні нові функції

Деякі з нових функцій, на які варто звернути увагу у Vue 3, включають:

- [Композиційний API](https://ua.vuejs.org/guide/extras/composition-api-faq.html)<span class="note">\*</span>
- [SFC Composition API Syntax Sugar (`<script setup>`)](https://ua.vuejs.org/api/sfc-script-setup.html)<span class="note">\*</span>
- [Teleport](https://ua.vuejs.org/guide/built-ins/teleport.html)
- [Fragments](./new/fragments.html)
- [Опція компоненту Emits](https://ua.vuejs.org/api/options-state.html#emits)<span class="note">\*\*</span>
- [`createRenderer` API з `@vue/runtime-core`](https://ua.vuejs.org/api/custom-renderer.html) для створення користувацьких рендерів
- [CSS змінні із підтримкою стану в однофайлових компонентах (`v-bind` в `<style>`)](https://ua.vuejs.org/api/sfc-css-features.html#v-bind-in-css)<span class="note">\*</span>
- [Однофайлові компоненти `<style scoped>` тепер можуть мати в собі глобальні правила або правила таргетування слотів компонентів](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0023-scoped-styles-changes.md)
- [Suspense](https://ua.vuejs.org/guide/built-ins/suspense.html) <sup class="warning">експериментально</sup>

<sub class="note"><b>\*</b> Тепер також підтримується в <a href="https://blog.vuejs.org/posts/vue-2-7-naruto.html" target= "_blank">Vue 2.7</a></sub><br>
<sub class="note"><b>\*\*</b> Підтримується у Vue 2.7, але лише для визначення типу</sub>

## Несумісні зміни

Несумісні зміни між Vue 2 і Vue 3 перераховані [тут](./breaking-changes/).

## Нові рекомендації на рівні фреймворку

[Тут](./recommendations) наведено нові рекомендації на рівні фреймворку.

## Міграційна збірка

Якщо у вас є проєкт або бібліотека Vue 2, які ви збираєтеся оновити до Vue 3, ми надаємо збірку Vue 3, яка пропонує сумісні з Vue 2 API. Перегляньте сторінку [Міграційна збірка](./migration-build), щоб дізнатися більше.

<style>
.note {
  color: #476582;
}
</style>
