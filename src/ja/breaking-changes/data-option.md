---
title: data オプション
badges:
  - breaking
---

# {{ $frontmatter.title }} <MigrationBadges :badges="$frontmatter.badges" />

## 概要

- **破壊的変更**: `data` コンポーネントオプションの宣言は、プレーンな JavaScript `object` を受け入れなくなり、`function` 宣言を期待するようになりました。

- **破壊的変更**: mixins や extends から複数の `data` 戻り値をマージする際、深いマージではなく「浅く」なりました（ルートレベルのプロパティのみがマージされます）。

## 2.x の構文

2.x では、開発者は `object` または `function` のどちらかで `data` オプションを定義できました。

例えば:

```html
<!-- オブジェクトでの定義 -->
<script>
  const app = new Vue({
    data: {
      apiKey: 'a1b2c3'
    }
  })
</script>

<!-- 関数での定義 -->
<script>
  const app = new Vue({
    data() {
      return {
        apiKey: 'a1b2c3'
      }
    }
  })
</script>
```

これは、ルートインスタンスが状態を共有するという点では便利なのですが、ルートインスタンスでのみ可能であるため、混乱を招きました。

## 3.x の更新内容

3.x では `data` オプションは、`object` を返す `function` のみを受け入れるように標準化されました。

上記の例で言えば、このコードの実装は 1 つしかありえないことになります:

```html
<script>
  import { createApp } from 'vue'

  createApp({
    data() {
      return {
        apiKey: 'a1b2c3'
      }
    }
  }).mount('#app')
</script>
```

## mixin マージ動作の変更 {#mixin-merge-behavior-change}

加えて、コンポーネントの `data()` と mixins や extends のベースの `data()` をマージする際に、「浅く」マージするようになりました:

```js
const Mixin = {
  data() {
    return {
      user: {
        name: 'Jack',
        id: 1
      }
    }
  }
}

const CompA = {
  mixins: [Mixin],
  data() {
    return {
      user: {
        id: 2
      }
    }
  }
}
```

Vue 2.x での、最終的な `$data` は:

```json
{
  "user": {
    "id": 2,
    "name": "Jack"
  }
}
```

3.0 では、次のような結果になります:

```json
{
  "user": {
    "id": 2
  }
}
```

[移行ビルドのフラグ: `OPTIONS_DATA_FN`](../migration-build.html#compat-configuration)

## 移行手順

オブジェクト宣言に依存しているユーザーには、次のことをお勧めします:

- 共有データを外部オブジェクトに抽出し、それを `data` のプロパティとして使用する
- 共有データへの参照を、新しい共有オブジェクトを指すように書き換える

ミックスインからの深いマージ動作に依存しているユーザーには、そのような依存を完全に避けるためにコードをリファクタリングすることをお勧めします。ミックスインからの深いマージは非常に暗黙的で、コードロジックの理解やデバッグがより困難になることがあるからです。

[移行ビルドのフラグ:](../migration-build.html#compat-configuration)

- `OPTIONS_DATA_FN`
- `OPTIONS_DATA_MERGE`
