import type { RouteRecordRaw } from 'vue-router'

const Layout = () => import('@/layouts/index.vue')

export default [
  {
    path: '/login',
    component: () => import('@/pages/common/login/index.vue'),
    meta: {
      title: '登录'
    }
  },
  {
    path: '/common',
    name: 'LayoutBasicRedirect',
    component: Layout,
    redirect: '/common/redirect',
    children: [
      {
        path: '/common/redirect',
        component: () => import('@/pages/common/route-view.vue'),
        name: 'CommonRedirect',
        redirect: '/redirect',
        children: [
          {
            path: '/redirect/:path(.*)',
            name: 'RedirectPath',
            component: () => import('@/pages/common/redirect.vue')
          }
        ]
      }
    ]
  },
  {
    path: '/:pathMatch(.*)',
    meta: {
      title: '找不到页面'
    },
    component: () => import('@/pages/exception/error.vue')
  }
] as RouteRecordRaw[]
