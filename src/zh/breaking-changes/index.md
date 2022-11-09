# 非兼容性改变

此页面列出了 Vue 2 对 Vue 3 的所有非兼容性改变。

虽然 Vue 看起来已经发生了很多变化，但您所了解和喜爱的 Vue 的很多东西仍然没有变；但我们希望尽可能完整的为每个记录的更改提供详细的解释和示例。


## 详情说明

### 全局API

- [全局 Vue API 更改为使用应用程序实例](./global-api.html)
- [全局和内部 API 都经过了重构，现已支持 TreeShaking （摇树优化）](./global-api-treeshaking.html)



### 模板指令

- [`v-model` 指令在组件上的使用已经被重新设计，替换掉了  `v-bind.sync`](./v-model.html)
- [在`<template v-for>`  和没有 `v-for` 的节点身上使用 `key` 发生了变化 ](./key-attribute.html)
- [`v-if` 和 `v-for` 在同一个元素身上使用时的优先级发生了变化](./v-if-v-for.html)
- [`v-bind="object"` 现在是顺序敏感的](./v-bind.html)
- [`v-on:event.native` 事件修饰符已经被移除](./v-on-native-modifier-removed)



### 组件

- [函数式组件只能通过纯函数进行创建](./functional-components.html)
- [单文件组件 (SFC) `<template>` 标签的  `functional` attribute 和函数式组件的 `functional` 选项已被移除](./functional-components.html)
- [异步组件现在需要通过 `defineAsyncComponent` 方法进行创建](./async-components.html)
- [组件事件现在应该使用 `emits` 选项进行声明](./emits-option.html)

### 渲染函数

- [渲染函数 API 更改](./render-function-api.html)
- [`$scopedSlots` property 已移除，所有插槽都通过 `$slots` 作为函数暴露](./slots-unification.html)
- [`$listeners` 被移除或整合到 `$attrs`](./listeners-removed)
- [`$attrs` 现在包含 `class` 和 `style` attribute](./attrs-includes-class-style.md)

### 自定义元素

- [自定义元素检测现在在模板编译时执行](./custom-elements-interop.html)
- [特殊的 `is` attribute 的使用被严格限制在被保留的 `<component>` 标签中](./custom-elements-interop.html#定制内置元素)

### 其他小改变

- `destroyed` 生命周期选项被重命名为 `unmounted`
- `beforeDestroy` 生命周期选项被重命名为 `beforeUnmount`
- [Props 的 `default` 工厂函数不再可以访问 `this` 上下文](./props-default-this.html)
- [自定义指令的 API 已更改为与组件生命周期一致，且 `binding.expression` 已移除](./custom-directives.html)
- [`data` 选项应始终被声明为一个函数](./data-option.html)
- [来自 mixin 的 `data` 选项现在为浅合并](./data-option.html#mixin-合并行为变更)
- [Attribute 强制策略已更改](./attribute-coercion.html)
- [Transition 的一些 class 被重命名](./transition.html)
- [`<TransitionGroup>` 不再默认渲染包裹元素](./transition-group.html)
- [当侦听一个数组时，只有当数组被替换时，回调才会触发，如果需要在变更时触发，则必须指定 `deep` 选项](./watch.html)
- 没有特殊指令的标记 (`v-if/else-if/else`、`v-for` 或 `v-slot`) 的 `<template>` 现在被视为普通元素，并将渲染为原生的 `<template>` 元素，而不是渲染其内部内容。
- [已挂载的应用不会替换它所挂载的元素](./mount-changes.html)
- [生命周期的 `hook:` 事件前缀改为 `vue:`](./vnode-lifecycle-events.html)

### 被移除的 API

- [`keyCode` 作为 `v-on` 修饰符的支持](./keycode-modifiers.html)
- [$on、$off 和 $once 实例方法](./events-api.html)
- [过滤器 (filter)](./filters.html)
- [内联模板 attribute](./inline-template-attribute.html)
- [`$children` 实例 property](./children.html)
- [`propsData` 选项](./props-data.html)
- `$destroy` 实例方法。用户不应该再手动管理单个 Vue 组件的生命周期。
- 全局函数 `set` 和 `delete` 以及实例方法 `$set` 和 `$delete`。基于代理的变化检测已经不再需要它们了。
