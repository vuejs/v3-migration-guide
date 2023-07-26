---
title: v-on.native modifier removed
badges:
  - breaking
---

# `v-on.native` modifier removed <MigrationBadges :badges="$frontmatter.badges" />

## Overview

The `.native` modifier for `v-on` has been removed.

## 2.x Syntax

Event listeners passed to a component with `v-on` are by default only triggered by emitting an event with `this.$emit`. To add a native DOM listener to the child component's root element instead, the `.native` modifier can be used:

```html
<my-component
  v-on:close="handleComponentEvent"
  v-on:click.native="handleNativeClickEvent"
/>
```

## 3.x Syntax

The `.native` modifier for `v-on` has been removed. At the same time, the [new `emits` option](./emits-option.md) allows the child to define which events it does indeed emit.

Consequently, Vue will now add all event listeners that are _not_ defined as component-emitted events in the child as native event listeners to the child's root element (unless `inheritAttrs: false` has been set in the child's options).

```html
<my-component
  v-on:close="handleComponentEvent"
  v-on:click="handleNativeClickEvent"
/>
```

`MyComponent.vue`

```html
<script>
  export default {
    emits: ['close']
  }
</script>
```

## Migration Strategy

- remove all instances of the `.native` modifier.
- ensure that all your components document their events with the `emits` option.

[Migration build flag: `COMPILER_V_ON_NATIVE`](../migration-build.html#compat-configuration)

## Parent and Child Migration Strategy

If you are running the migration build you will need to consider both the parent and the child component interaction. If you make a parent component use the Vue 3.x syntax by removing `.native` from a child component then the child component must:

- either already be in Vue 3 mode and set `MODE: 3` in compatConfig
- or must set `INSTANCE_LISTENERS: false` in compatConfig

For example, in a parent component migrated to use 3.x syntax:

```html
<my-component
   v-on:click="handleNativeClickEvent"
/>
```

Then the corresponding config required in the child `MyComponent.vue` is:

```javascript
export default {
  compatConfig: {
    INSTANCE_LISTENERS: false,
  }
}
```

A migration strategy taking into account both the parent and the child would be:

1. Keep `.native` in templates until the children are ready to handle native events in the Vue 3 way
2. Migrate the children:
    1. First, migrate any children that use `$listeners` to use `$attrs` instead (usually used in combination with `inheritAttrs: false`) [more info](listeners-removed.html)
    2. Document emitted events in child components with `emits: []` [more info](emits-option.html)
    3. In each of these child components, set INSTANCE_LISTENERS compat behavior to `false` as shown in the example above
3. You can now migrate the parents:
    1. Remove all usage of .native

For a fuller discussion, see this [GitHub issue comment](https://github.com/vuejs/core/issues/4566#issuecomment-917997056).

## See also

- [Relevant RFC](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0031-attr-fallthrough.md#v-on-listener-fallthrough)
- [Migration guide - New Emits Option](./emits-option.md)
- [Migration guide - `$listeners` removed](./listeners-removed.md)
- [Migration guide - Changes in the Render Functions API](./render-function-api.md)
