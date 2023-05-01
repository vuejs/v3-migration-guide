import en from './en'
import zh from './zh'
import ja from './ja'
import uk from './uk'

export default {
  vitepressConfig: {
    '/': en.vitepressConfig,
    '/zh/': zh.vitepressConfig,
    '/ja/': ja.vitepressConfig,
    '/uk/': uk.vitepressConfig,
  },
  themeConfig: {
    '/': en.themeConfig,
    '/zh/': zh.themeConfig,
    '/ja/': ja.themeConfig,
    '/uk/': uk.themeConfig,
  }
}
