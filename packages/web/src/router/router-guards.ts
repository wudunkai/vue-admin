import type { Router } from 'vue-router'
import { useAppStore } from '@/stores/userInfo'
import { getTreeToArr } from '@/utils/methods'
const whiteList = ['/login']

export function createRouterGuards(router: Router) {
  router.beforeEach(async (to, from, next) => {
    //获取用户信息
    console.log(to)
    const app = useAppStore()
    //有用户信息 除非添加路由
    if (app.token) {
      //触发添加路由方法，里面会判断是否需要添加
      await app.addRoute(app.routes)
      //根据to.name来判断是否为动态路由, 是否有人知道还有更好的判断方法？
      const newRouteList = getTreeToArr(app.routes)
      if (!to.name) {
        //当前路由是动态的，确定是有的, 有就跳自己，没有就跳404,, tip: 刷新后动态路由的to.name为空
        if (newRouteList.findIndex((i) => i.path === to.path) !== -1) {
          next({ ...to, replace: true })
        } else {
          next()
        }
      } else {
        next()
      }
    } else {
      // 没有token
      if (whiteList.indexOf(to.path) !== -1) {
        // 在免登录白名单，直接进入
        next()
      } else {
        next(`/login?redirect=${to.fullPath}`) // 否则全部重定向到登录页
      }
    }
  })
}
