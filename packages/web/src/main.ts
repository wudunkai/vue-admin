import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import stores from './stores'
import AntD from 'ant-design-vue'
import 'reset-css/reset.css'
import 'ant-design-vue/dist/reset.css'
import './router/router-guard'
const app = createApp(App)
// 挂载路由
app.use(router).use(stores).use(AntD)
// 路由准备就绪后挂载APP实例
router.isReady().then(() => app.mount('#app'))
