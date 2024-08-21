import { registerPlugins } from '@/plugins'
import App from './app.vue'

import { createApp } from 'vue'
import { globalTranslatorMixin } from '@/plugins/i18n'

const app = createApp(App)
registerPlugins(app)
app.mixin(globalTranslatorMixin)
app.mount('#app')
