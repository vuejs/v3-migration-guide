# Vue 2 -> Vue 3 Migration Guide

This is split from the legacy v3 documentation into a standalone repo.

Deployed at [v3-migration.vuejs.org](https://v3-migration.vuejs.org)

## Translation guide

All the documentation files can be found in `src`. It contains the English markdown files while translation(s) are stored in their corresponding `<lang>` sub-folder(s):

- [`zh`](https://github.com/vuejs/v3-migration-guide/tree/main/packages/docs/zh): Chinese translation.
- [`ja`](https://github.com/vuejs/v3-migration-guide/tree/main/packages/docs/ja): Japanese translation.
- [`pt`](https://github.com/vuejs/v3-migration-guide/tree/main/packages/docs/pt): Portuguese translation.
- [`uk`](https://github.com/vuejs/v3-migration-guide/tree/main/packages/docs/uk): Ukrainian translation.

Besides that, the `.vitepress` sub-folder contains the config and theme, including the i18n information.

- `pnpm dev`: Start the docs dev server.
- `pnpm build`: Build the docs.
- `pnpm serve`: Serve the built docs.

To add or maintain the translations, we follow the [Vue Ecosystem Translation Guidelines](https://github.com/vuejs-translations/guidelines/blob/main/README_ECOSYSTEM.md).

- `pnpm translation:status [<lang>]`: Show the translation status for your language. If you don't specify a language, it will show the status for all languages.
- `pnpm translation:compare <lang>`: Compare the docs with the latest checkpoint for your language.
- `pnpm translation:update <lang> [<commit>]`: Update the checkpoint for your language. The checkpoint will be set by the latest commit hash. However, you can also specify a commit hash manually.
