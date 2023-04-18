---
title: 配列の監視
badges:
  - breaking
---

# {{ $frontmatter.title }} <MigrationBadges :badges="$frontmatter.badges" />

## 概要

- **破壊的変更**: 配列を監視している場合、コールバックは配列が置換されたときにのみトリガーされます。変更時にトリガーする必要がある場合は、`deep` オプションを指定する必要があります。

## 3.x の構文

[`watch` オプション](https://ja.vuejs.org/api/options-state.html#watch)を使って配列を監視する場合、コールバックは配列が置換されたときにのみトリガーされます。つまり、ウォッチコールバックは配列の変更時にトリガーされなくなります。変更時にトリガーするには、`deep` オプションを指定する必要があります。

```js
watch: {
  bookList: {
    handler(val, oldVal) {
      console.log('book list changed')
    },
    deep: true
  },
}
```

## 移行手順

配列の変更を監視することに依存している場合、コールバックが正しくトリガーされるように `deep` オプションを追加してください。

[移行ビルドのフラグ: `WATCH_ARRAY`](../migration-build.html#compat-configuration)
