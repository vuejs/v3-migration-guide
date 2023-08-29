import en from './en'
import zh from './zh'
import ja from './ja'
import uk from './uk'
import pt from './pt'

export default {
  vitepressConfig: {
    '/': en.vitepressConfig,
    '/zh/': zh.vitepressConfig,
    '/ja/': ja.vitepressConfig,
<<<<<<< HEAD
    '/uk/': uk.vitepressConfig,
=======
    '/pt/': pt.vitepressConfig,
>>>>>>> 6b27e5e (chore(i18n): enable the portuguese inside `locales/index.js`)
  },
  themeConfig: {
    '/': en.themeConfig,
    '/zh/': zh.themeConfig,
    '/ja/': ja.themeConfig,
<<<<<<< HEAD
    '/uk/': uk.themeConfig,
=======
    '/pt/': pt.themeConfig,
>>>>>>> 6b27e5e (chore(i18n): enable the portuguese inside `locales/index.js`)
  }
}
