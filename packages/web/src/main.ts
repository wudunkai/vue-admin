import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import stores from './stores'
import AntD from 'ant-design-vue'
import 'reset-css/reset.css'
import 'ant-design-vue/dist/reset.css'
const app = createApp(App)

app.use(router).use(stores).use(AntD).mount('#app')
