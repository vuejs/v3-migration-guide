---
badges:
  - removed
---

# `propsData` <MigrationBadges :badges="$frontmatter.badges" />

## 概要

Vue インスタンスの生成時にプロパティを渡すために使用されていた `propsData` オプションは削除されました。Vue 3 アプリケーションのルートコンポーネントにプロパティを渡すには、[createApp](https://ja.vuejs.org/api/application.html#createapp) の第 2 引数を使用します。

## 2.x の構文

2.x では、Vue インスタンスの生成時にプロパティを渡すことができました:

```js
const Comp = Vue.extend({
  props: ['username'],
  template: '<div>{{ username }}</div>'
})

new Comp({
  propsData: {
    username: 'Evan'
  }
})
```

## 3.x の更新内容

`propsData` オプションは削除されました。ルートコンポーネントインスタンスの生成時にプロパティを渡す必要がある場合は、`createApp` の第 2 引数を使用する必要があります:

```js
const app = createApp(
  {
    props: ['username'],
    template: '<div>{{ username }}</div>'
  },
  { username: 'Evan' }
)
```
