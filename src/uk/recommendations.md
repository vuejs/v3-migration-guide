# Нові рекомендації на рівні фреймворку

Допоміжні бібліотеки для Vue 3 зазнали серйозних оновлень. Ось підсумок нових рекомендацій за умовчанням:

- Нові версії Router, Devtools і test utils з підтримкою Vue 3
- Збірка інструментів: Vue CLI -> [Vite](https://vitejs.dev/)
- Управління станом: Vuex -> [Pinia](https://pinia.vuejs.org/)
- Підтримка IDE: Vetur -> [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)
- Нова підтримка TypeScript командного рядка: [vue-tsc](https://github.com/johnsoncodehk/volar/tree/master/vue-language-tools/vue-tsc)
- SSG: VuePress -> [VitePress](https://vitepress.vuejs.org/)
- JSX: `@vue/babel-preset-jsx` -> [`@vue/babel-plugin-jsx`](https://github.com/vuejs/jsx-next)

## Деталі

### Інструменти збірки

Тепер ми рекомендуємо [Vite](https://vitejs.dev/) як новий інструментарій збірки для проєктів Vue 3. Vite — це новий інструмент збірки, який забезпечує надзвичайно швидкий запуск сервера та продуктивність гарячого оновлення. Спочатку він був створений командою Vue, але тепер це міжфреймворковий інструмент. Дізнайтеся більше про [чому ми рекомендуємо Vite](https://vitejs.dev/guide/why.html).

Ви можете створити новий проєкт Vue 3 на базі Vite за допомогою [`create-vue`](https://github.com/vuejs/create-vue), нашого нового інструменту скелета:

```sh
npm init vue@3
```

Хоча Vue CLI також було оновлено для підтримки Vue 3, зараз він перебуває на технічному обслуговуванні та більше не рекомендований для нових проєктів. Щоб отримати інформацію щодо переходу з Vue CLI на Vite:

- [Vue CLI -> Посібник з міграції Vite від VueSchool.io](https://vueschool.io/articles/vuejs-tutorials/how-to-migrate-from-vue-cli-to-vite/)
- [Інструменти/плагіни, які допомагають з автоматичною міграцією](https://github.com/vitejs/awesome-vite#vue-cli)

Також див. [розділ про інструменти в нових документах](https://ua.vuejs.org/guide/scaling-up/tooling.html).

### Маршрутизатор Vue

Vue Router 4.0 забезпечує підтримку Vue 3 і має ряд власних критичних змін. Перегляньте його [посібник з міграції](https://router.vuejs.org/guide/migration/index.html), щоб отримати повну інформацію.

- [Документація](https://router.vuejs.org/)
- [GitHub](https://github.com/vuejs/router)
- [RFC](https://github.com/vuejs/rfcs/pulls?q=is%3Apr+is%3Amerged+label%3Arouter)

### Керування станом

[Pinia](https://pinia.vuejs.org/) — нове рекомендоване рішення для великомасштабного управління державою. Pinia було створено як прототип для Vuex 5, і тепер він перетворився на фактичну реалізацію того, що ми планували для Vuex 5. Ми вирішили зберегти його початкову назву з огляду на обсяг роботи, яку доклав до цього член основної команди [Едуардо](https://github.com/posva).

- [Документація](https://pinia.vuejs.org/)
- [GitHub](https://github.com/vuejs/pinia)
- [Розділ про керування станом в новій документації](https://ua.vuejs.org/guide/scaling-up/state-management.html)

Vuex 4.0 також надає підтримку Vue 3 із майже тим самим API, що й 3.x, і його можна використовувати, якщо у вас є наявні сховища Vuex, які потрібно перенести на Vue 3. Єдиною критичною зміною є [спосіб встановлення плагіна](https://vuex.vuejs.org/guide/migrating-to-4-0-from-3-x.html#breaking-changes).

### Підтримка IDE

[Volar](https://github.com/johnsoncodehk/volar) тепер є новим офіційним розширенням VSCode зі значно покращеною підтримкою TypeScript для Vue SFC, включаючи повне визначення типу для шаблонних виразів.

Якщо ви раніше встановили Vetur, обов’язково вимкніть його, щоб уникнути конфлікту з Volar.

### Розширення Devtools

Розширення devtools отримало значні оновлення (випущено як v6) для підтримки як Vue 2, так і Vue 3. Якщо ви раніше встановили v6 через бета-канал, ви можете видалити його та встановити розширення зі стабільного каналу зараз.

- [Документація](https://devtools.vuejs.org/guide/installation.html)
- [GitHub](https://github.com/vuejs/devtools)

### Підтримка TypeScript

Тепер ви можете перевіряти тип і генерувати файли визначення для Vue SFC з командного рядка за допомогою [vue-tsc](https://github.com/johnsoncodehk/volar/tree/master/vue-language-tools/vue-tsc).

Також перегляньте [Посібник з TypeScript у новій документації](https://ua.vuejs.org/guide/typescript/overview.html).

### Генератор статичного сайту

[VitePress](https://vitepress.vuejs.org/) є наступником VuePress, створеним на основі Vue 3 + Vite. Це забезпечує набагато кращий досвід розробника, а також створює швидші сайти.

### JSX

Підтримка JSX для Vue 3 тепер надається через [`@vue/babel-plugin-jsx`](https://github.com/vuejs/babel-plugin-jsx).
