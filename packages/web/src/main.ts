import { createApp } from 'vue'
import App from './App.vue'
import router, { setupRouter } from './router'
import stores from './stores'
import AntD from 'ant-design-vue'
import 'reset-css/reset.css'
import 'ant-design-vue/dist/reset.css'
const app = createApp(App)
// 挂载路由
app.use(stores).use(AntD)
setupRouter(app)
// 路由准备就绪后挂载APP实例
router.isReady().then(() => app.mount('#app'))
