---
badges:
  - breaking
---

# イベント API <MigrationBadges :badges="$frontmatter.badges" />

## 概要

`$on`、`$off`、`$once` インスタンスメソッドは削除されました。コンポーネントインスタンスはイベントエミッターインターフェースを実装しなくなりました。

## 2.x の構文

2.x では、Vue インスタンスはイベントエミッターAPI（`$on`、`$off`、`$once`）を通じて、命令的にアタッチされたハンドラーをトリガーするために使用できました。これを利用して**イベントバス**を作成し、アプリケーション全体で使用するグローバルイベントリスナーを作成できます:

```js
// eventBus.js

const eventBus = new Vue()

export default eventBus
```

```js
// ChildComponent.vue
import eventBus from './eventBus'

export default {
  mounted() {
    // eventBus のリスナーを追加
    eventBus.$on('custom-event', () => {
      console.log('Custom event triggered!')
    })
  },
  beforeDestroy() {
    // eventBus のリスナーを削除
    eventBus.$off('custom-event')
  }
}
```

```js
// ParentComponent.vue
import eventBus from './eventBus'

export default {
  methods: {
    callGlobalCustomEvent() {
      eventBus.$emit('custom-event') // ChildComponent がマウントされている場合、コンソールにメッセージが表示されます
    }
  }
}
```

## 3.x の更新内容

インスタンスから `$on`、`$off`、`$once` メソッドを完全に削除しました。`$emit` は、親コンポーネントから宣言的にアタッチされたイベントハンドラーをトリガーするために使用されるため、依然として API の一部です。

## 移行手順

[移行ビルドのフラグ: `INSTANCE_EVENT_EMITTER`](../migration-build.html#compat-configuration)

Vue 3 では、これらの API を使用して、コンポーネント内部からコンポーネント自身が発行したイベントを購読できなくなりました。そのユースケースのための移行経路はありません。

### ルートコンポーネントイベント

静的なイベントリスナーは、`createApp` にプロパティとして渡すことで、ルートコンポーネントに追加できます:

```js
createApp(App, {
  // 'expand' イベントを購読する
  onExpand() {
    console.log('expand')
  }
})
```

### イベントバス

イベントバスパターンは、イベントエミッターインターフェースを実装した外部ライブラリー、例えば [mitt](https://github.com/developit/mitt) や [tiny-emitter](https://github.com/scottcorgan/tiny-emitter) を使って置き換えられます。

例:

```js
// eventBus.js
import emitter from 'tiny-emitter/instance'

export default {
  $on: (...args) => emitter.on(...args),
  $once: (...args) => emitter.once(...args),
  $off: (...args) => emitter.off(...args),
  $emit: (...args) => emitter.emit(...args)
}
```

これは、Vue 2 と同じイベントエミッターAPI を提供します。

ほとんどの場合、コンポーネント間の通信にグローバルイベントバスを使用することは推奨されません。短期的には最も簡単な解決策であることが多いのですが、長期的には必ずと言っていいほどメンテナンスに頭を悩ませることになります。状況に応じて、イベントバスの使用にはさまざまな代替案があります:

* 親子間のコミュニケーションは、プロパティとイベントが第一候補です。兄弟要素は親を介して通信できます。
* provide / inject によって、コンポーネントがそのスロットの中身と通信できるようになります。これは、常に一緒に使用される密結合のコンポーネントに便利です。
* provide / inject は、コンポーネント間の長距離通信にも使用できます。これにより、あるプロパティがそのプロパティ自身を必要としない多くの階層のコンポーネントを介して渡される必要がある現象、つまり「プロパティのバケツリレー」を避けるのに役立ちます。
* また、スロットを使用するようにリファクタリングすることで、プロパティのバケツリレーを回避できます。もし中間コンポーネントがプロパティを必要としないのであれば、それは関心の分離に問題があることを示している可能性があります。そのコンポーネントにスロットを導入することで、親コンポーネントが直接コンテンツを作成できるようになり、中間コンポーネントが関与することなくプロパティを渡すことができるようになります。
* [Pinia](https://pinia.vuejs.org/) などの[グローバルな状態管理](https://ja.vuejs.org/guide/scaling-up/state-management.html)。
