import locales from "./locales"

/**
 * @type {import('vitepress').UserConfig}
 */
export default {
  srcDir: 'src',
  locales: locales.vitepressConfig,
  

  themeConfig: {
    localeLinks: {
      items: [
        {text: 'English', link: '/'},
        {text: '中文简体', link: '/zh/'}
      ]
    },
    locales: locales.themeConfig
  }
}
