# 非兼容的变更

This page lists all Vue 3 breaking changes from Vue 2.

While it looks like a lot has changed, a lot of what you know and love about Vue is still the same; but we wanted to be as thorough as possible and provide detailed explanations and examples for every documented change.

## Details

### Global API

- [Global Vue API is changed to use an application instance](./global-api.html)
- [Global and internal APIs have been restructured to be tree-shakable](./global-api-treeshaking.html)

### Template Directives

- [`v-model` usage on components has been reworked, replacing `v-bind.sync`](./v-model.html)
- [`key` usage on `<template v-for>` and non-`v-for` nodes has changed](./key-attribute.html)
- [`v-if` and `v-for` precedence when used on the same element has changed](./v-if-v-for.html)
- [`v-bind="object"` is now order-sensitive](./v-bind.html)
- [`v-on:event.native` modifier has been removed](./v-on-native-modifier-removed.md)

### Components

- [Functional components can only be created using a plain function](./functional-components.html)
- [`functional` attribute on single-file component (SFC) `<template>` and `functional` component option are deprecated](./functional-components.html)
- [Async components now require `defineAsyncComponent` method to be created](./async-components.html)
- [Component events should now be declared with the `emits` option](./emits-option.md)

### Render Function

- [Render function API changed](./render-function-api.html)
- [`$scopedSlots` property is removed and all slots are exposed via `$slots` as functions](./slots-unification.html)
- [`$listeners` has been removed / merged into `$attrs`](./listeners-removed)
- [`$attrs` now includes `class` and `style` attributes](./attrs-includes-class-style.md)

### Custom Elements

- [Custom element checks are now performed during template compilation](./custom-elements-interop.html)
- [Special `is` attribute usage is restricted to the reserved `<component>` tag only](./custom-elements-interop.html#customized-built-in-elements)

### Other Minor Changes

- The `destroyed` lifecycle option has been renamed to `unmounted`
- The `beforeDestroy` lifecycle option has been renamed to `beforeUnmount`
- [Props `default` factory function no longer has access to `this` context](./props-default-this.html)
- [Custom directive API changed to align with component lifecycle and `binding.expression` removed](./custom-directives.html)
- [The `data` option should always be declared as a function](./data-option.html)
- [The `data` option from mixins is now merged shallowly](./data-option.html#mixin-merge-behavior-change)
- [Attributes coercion strategy changed](./attribute-coercion.html)
- [Some transition classes got a rename](./transition.html)
- [`<TransitionGroup>` now renders no wrapper element by default](./transition-group.html)
- [When watching an array, the callback will only trigger when the array is replaced. If you need to trigger on mutation, the `deep` option must be specified.](./watch.html)
- `<template>` tags with no special directives (`v-if/else-if/else`, `v-for`, or `v-slot`) are now treated as plain elements and will result in a native `<template>` element instead of rendering its inner content.
- [Mounted application does not replace the element it's mounted to](./mount-changes.html)
- [Lifecycle `hook:` events prefix changed to `vnode-`](./vnode-lifecycle-events.html)

### Removed APIs

- [`keyCode` support as `v-on` modifiers](./keycode-modifiers.html)
- [$on, $off and \$once instance methods](./events-api.html)
- [Filters](./filters.html)
- [Inline templates attributes](./inline-template-attribute.html)
- [`$children` instance property](./children.html)
- [`propsData` option](./props-data.html)
- `$destroy` instance method. Users should no longer manually manage the lifecycle of individual Vue components.
- Global functions `set` and `delete`, and the instance methods `$set` and `$delete`. They are no longer required with proxy-based change detection.
