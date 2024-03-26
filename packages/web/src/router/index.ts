import type { App } from 'vue'
import type { Router, RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import { createRouterGuards } from './router-guards'

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录'
    }
  },
  {
    path: '/',
    name: 'layouts',
    component: () => import('@/layouts/index.vue'),
    children: [
      {
        path: '/:pathMatch(.*)*',
        component: () => import('@/views/404/index.vue')
      }
    ]
  }
]
const router: Router = createRouter({
  history: createWebHistory(),
  routes
})

export function setupRouter(app: App) {
  createRouterGuards(router)
  app.use(router)
}

export default router
