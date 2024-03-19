import { defineConfig } from 'vitepress'
import { en, zh, ja, uk, pt } from "./locales"

export default defineConfig({
  srcDir: 'src',
  locales: {
    root: { label: 'English', lang: 'en-US', link: '/', ...en },
    zh: { label: '中文简体',  lang: 'zh-CN', link: '/zh/', ...zh },
    ja: { label: '日本語', lang: 'ja-JP', link: '/ja/', ...ja },
    uk: { label: 'Українська', lang: 'uk', link: '/uk/', ...uk },
    pt: { label: 'Português', lang: 'pt-BR', link: '/pt/', ...pt },
  }
})
