import type { RouteRecordRaw } from 'vue-router'
import { basicRouteMap } from './router-modules'

export default [
  {
    path: '/dashboard',
    redirect: '/dashboard/analysis',
    name: 'Dashboard',
    meta: {
      title: '仪表盘',
      icon: 'DashboardOutlined'
    },
    component: basicRouteMap.RouteView,
    children: [
      {
        path: '/dashboard/analysis',
        name: 'DashboardAnalysis',
        component: () => import('@/pages/dashboard/analysis/index.vue'),
        meta: {
          title: '分析页'
        }
      }
    ]
  }
] as RouteRecordRaw[]
