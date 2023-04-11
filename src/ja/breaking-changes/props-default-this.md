---
title: プロパティ default 関数の this アクセス
badges:
  - breaking
---

# プロパティ default 関数の `this` アクセス <MigrationBadges :badges="$frontmatter.badges" />

プロパティのデフォルト値ファクトリー関数は `this` にアクセスできなくなりました。

その代わり:

- コンポーネントが受け取った未加工のプロパティは、引数として default 関数に渡されます。

- [inject](https://ja.vuejs.org/api/composition-api-dependency-injection.html#inject) API は、default 関数内部で使用できます。

```js
import { inject } from 'vue'

export default {
  props: {
    theme: {
      default (props) {
        // `props` はコンポーネントに渡された未加工の値
        // 型変換やデフォルト値に変更される前
        // `inject` を使用して、注入されたプロパティにアクセスできます
        return inject('theme', 'default-theme')
      }
    }
  }
}
```

## 移行手順

[移行ビルドのフラグ: `PROPS_DEFAULT_THIS`](../migration-build.html#compat-configuration)
