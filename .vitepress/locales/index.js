import en from './en'
import zh from './zh'
import ja from './ja'

export default {
  vitepressConfig: {
    '/': en.vitepressConfig,
    '/zh/': zh.vitepressConfig,
    '/ja/': ja.vitepressConfig,
  },
  themeConfig: {
    '/': en.themeConfig,
    '/zh/': zh.themeConfig,
    '/ja/': ja.themeConfig,
  }
}
