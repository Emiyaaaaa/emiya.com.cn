import type * as ShikiInterface from 'shiki'
import { singlePromise } from './singlePromise'

const THEME = 'material-theme-palenight'

const shikiSinglePromise = singlePromise(async () => {
  const shiki = await import('shiki')
  shiki.setCDN('https://unpkg.com/shiki@latest/')
  return shiki
})

const getHighlighterSinglePromise = singlePromise(async () => {
  const shiki = await shikiSinglePromise()
  const highlighter = await shiki.getHighlighter({
    theme: { name: 'blank-theme', type: 'light', settings: [], fg: '#000', bg: '#fff' },
    langs: [],
  })
  await highlighter.loadTheme(THEME)
  return highlighter
})

class Shiki {
  private shiki?: typeof ShikiInterface
  private highlighter?: ShikiInterface.Highlighter

  async getShiki() {
    if (!this.shiki) {
      this.shiki = await shikiSinglePromise()
    }
    return this.shiki
  }

  async getHighlighter() {
    if (!this.highlighter) {
      this.highlighter = await getHighlighterSinglePromise()
    }
    return this.highlighter
  }

  async codeToHtml(code: string, lang: ShikiInterface.Lang) {
    const highlighter = await this.getHighlighter()
    const loadedLangs = highlighter.getLoadedLanguages()
    if (!loadedLangs.includes(lang)) {
      await highlighter.loadLanguage(lang)
    }
    return highlighter.codeToHtml(code, { lang, theme: THEME })
  }
}

const shiki = new Shiki()

export default shiki
