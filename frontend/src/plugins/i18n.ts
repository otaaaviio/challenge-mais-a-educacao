import { createI18n } from 'vue-i18n'
import en from '../locales/en.json'
import br from '../locales/br.json'

export const i18n = createI18n({
  locale: localStorage.getItem('locale') || 'br',
  fallbackLocale: 'en',
  messages: {
    en,
    br,
  },
})
