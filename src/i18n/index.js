import en from './locales/en'
import nl from './locales/nl'
import { createI18n } from 'vue-i18n'

const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: { en, nl }
})

export default i18n
