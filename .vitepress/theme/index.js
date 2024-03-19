import { h } from 'vue'
import Theme from 'vitepress/theme'
import TranslationStatus from 'vitepress-translation-helper/ui/TranslationStatus.vue'
import MigrationBadges from './MigrationBadges.vue'
import status from '../translation-status.json'

const i18nLabels = {
  zh: '该翻译已同步到了 ${date} 的版本，其对应的 commit hash 是 <code>${hash}</code>。',
}

export default {
  ...Theme,
  Layout() {
    return h(Theme.Layout, null, {
      'doc-before': () => h(TranslationStatus, { status, i18nLabels }),
    })
  },
  enhanceApp({ app }) {
    app.component('MigrationBadges', MigrationBadges)
  }
}
