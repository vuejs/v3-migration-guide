import Theme from 'vitepress/theme'
import MigrationBadges from './MigrationBadges.vue'

export default {
  ...Theme,
  enhanceApp({ app }) {
    app.component('MigrationBadges', MigrationBadges)
  }
}
