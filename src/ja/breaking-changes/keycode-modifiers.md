---
badges:
  - breaking
---

# keyCode 修飾子 <MigrationBadges :badges="$frontmatter.badges" />

## 概要

以下は、変更点の簡単なまとめです:

- **破壊的変更**: `v-on` 修飾子として数字、つまり keyCode を使用することはサポートされなくなりました
- **破壊的変更**: `config.keyCodes` はサポートされなくなりました

## 2.x の構文

Vue 2 では、`v-on` メソッドを修飾する方法として `keyCodes` がサポートされました。

```html
<!-- keyCode バージョン -->
<input v-on:keyup.13="submit" />

<!-- エイリアスバージョン -->
<input v-on:keyup.enter="submit" />
```

さらに、グローバルな `config.keyCodes` オプションで独自のエイリアスを定義できました。

```js
Vue.config.keyCodes = {
  f1: 112
}
```

```html
<!-- keyCode バージョン -->
<input v-on:keyup.112="showHelpText" />

<!-- カスタムエイリアスバージョン -->
<input v-on:keyup.f1="showHelpText" />
```

## 3.x の構文

[`KeyboardEvent.keyCode` は非推奨になった](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode)ので、Vue 3 がこれをサポートし続けることはもはや意味がありません。そのため、修飾子として使用したいキーには、ケバブケースの名前を使用することが推奨されるようになりました。

```html
<!-- Vue 3 の v-on キー修飾子 -->
<input v-on:keyup.page-down="nextPage">

<!-- q と Q の両方にマッチ -->
<input v-on:keypress.q="quit">
```

その結果、`config.keyCodes` も非推奨となり、今後サポートされなくなります。

## 移行手順

コードベースで `keyCode` を使用している場合は、ケバブケースのキー名に変換することをお勧めします。

一部の句読点のキーは、そのまま渡すことができます。 例：`,` キーの場合:

```html
<input v-on:keypress.,="commaPress">
```

構文の制限により、`"`、`'`、`/`、`=`、`>`、`.` などの特定の文字はマッチしません。これらの文字については、代わりにリスナー内で `event.key` をチェックする必要があります。

[移行ビルドのフラグ:](../migration-build.html#compat-configuration)

- `CONFIG_KEY_CODES`
- `V_ON_KEYCODE_MODIFIER`
