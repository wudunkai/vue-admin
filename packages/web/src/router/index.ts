import { createRouter, createWebHistory } from 'vue-router'

const history = createWebHistory()
const routes = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue')
  }
]
const router = createRouter({
  history,
  routes
})

// 全局前置导航钩子
router.beforeEach((to, from, next) => {
  console.log(to, from)
  if (to.path === '/login') return next()
  const userInfo = localStorage.getItem('userInfo')
  const token = userInfo && JSON.parse(userInfo).token
  if (token) {
    next()
  } else {
    next('/login')
  }
})

export default router
