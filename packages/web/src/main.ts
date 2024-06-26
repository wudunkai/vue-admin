import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import AntD from 'ant-design-vue'
import 'reset-css/reset.css'
import 'ant-design-vue/dist/reset.css'
import './router/router-guard'
import { setupI18n } from './locales'

async function start() {
  const app = createApp(App)
  const stores = createPinia()
  stores.use(piniaPluginPersistedstate)
  app.use(stores)
  app.use(AntD)
  await setupI18n(app)
  app.use(router)
  router.isReady().then(() => app.mount('#app'))
  app.config.performance = true
}
start()
