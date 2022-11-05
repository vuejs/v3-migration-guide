# 非兼容性改变

此页面列出了 Vue 2 对 Vue 3 的所有非兼容性改变。

虽然 Vue 看起来已经发生了很多变化，但您所了解和喜爱的 Vue 的很多东西仍然没有变；但我们希望尽可能完整的为每个记录的更改提供详细的解释和示例。

<!-- TODO -->



## 详情说明

### 全局API

- [全局 Vue API 更改为使用应用程序实例](./global-api.html)
- [全局和内部 API 都经过了重构，现已支持 TreeShaking （摇树优化）](./global-api-treeshaking.html)



### 模板指令

- [`v-model` 指令在组件上的使用已经被重新设计，替换掉了  `v-bind.sync`](./v-model.html)
- [在`<template v-for>`  和没有 `v-for` 的节点身上使用 `key` 发生了变化 ](./key-attribute.html)
- [`v-if` and `v-for` 在同一个元素身上使用时的优先级发生了变化](./v-if-v-for.html)
- [`v-bind="object"` 现在是顺序敏感的](./v-bind.html)
- [`v-on:event.native` 事件修饰符已经被移除](./v-on-native-modifier-removed)

