import vuetify from './vuetify'
import pinia from '../stores'
import router from '../router'
import { i18n } from './i18n'
import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

import type { App } from 'vue'

export function registerPlugins (app: App) {
  app
    .use(vuetify)
    .use(router)
    .use(pinia)
    .use(i18n)
    .use(Vue3Toastify, {
      autoClose: 3000,
    } as ToastContainerOptions)
}
