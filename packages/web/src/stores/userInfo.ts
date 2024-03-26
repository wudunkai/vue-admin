import { defineStore } from 'pinia'
import router from '@/router'
import { getTreeToArr } from '@/utils/methods'
import mock from '@/json/mock'
/**
 * userInfo 配置 开启持久化
 */
export const useAppStore = defineStore({
  id: 'userInfo',
  state: () => ({
    token: '123', // token
    routes: mock.router
  }),
  actions: {
    async addRoute(routes: Array<any>) {
      //路由未添加，我们判断是否添加过，没添加过就添加
      if (router.getRoutes().length === 3) {
        const addRouterList = filterAsyncRouter(
          JSON.parse(JSON.stringify(routes)) //这里深拷贝下，不然会出问题
        )
        addRouterList.forEach((i: any) => {
          router.addRoute('layouts', i)
        })
      }
    },
    async login(token: any) {
      this.$patch({
        token
      })
      //触发添加路由方法，里面会判断是否需要添加
      await this.addRoute(this.routes)
    },
    //注销
    async logout(routerList: Array<any>) {
      return new Promise((resolve) => {
        //拷贝一下
        const delRouterList = JSON.parse(JSON.stringify(routerList))
        //删除添加的路由，如果路由是多层的 递归下。。
        delRouterList.forEach((route: any) => {
          router.removeRoute(route.name)
        })
        //删除路由,清空用户信息
        this.$patch({
          token: ''
        })
        resolve('注销 success， 清空路由，用户信息')
      })
    }
  },
  persist: {
    key: 'userInfo', // 指定key进行存储，此时非key的值不会持久化，刷新就会丢失
    storage: localStorage, // 指定换成地址
    paths: ['token'] // 指定需要持久化的state的路径名称
  }
})

// 路由懒加载
const loadView = (view: any) => {
  const component = () => import(`@/views/${view}.vue`)
  return component
}
//为权限路由异步添加组件
const filterAsyncRouter = (routeList: any) => {
  const newRouteList = getTreeToArr(routeList)
  return newRouteList.filter((route: any) => {
    const { title } = route
    route.meta = {
      title
    }
    if (route.component) {
      // 如果不是布局组件就只能是页面的引用了
      // 利用懒加载函数将实际页面赋值给它
      route.component = loadView(route.component)
      // 判断是否存在子路由，并递归调用自己
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children)
      }
      return true
    }
  })
}
