import { AxiosError } from 'axios'
import router from '@/router'
import { useMetaTitle } from '@/composables/meta-title'
import { setRouteEmitter } from '@/utils/route-listener'

const allowList = ['/login', '/error']
const loginPath = '/login'

router.beforeEach(async (to, _, next) => {
  console.log(to)
  setRouteEmitter(to)
  // 获取
  const user = useUserStore()
  if (!user.token) {
    //  如果token不存在就跳转到登录页面
    if (!allowList.includes(to.path) && !to.path.startsWith('/redirect')) {
      next({
        path: loginPath,
        query: {
          redirect: encodeURIComponent(to.fullPath)
        }
      })
      return
    }
  } else {
    if (!user.userInfo && !allowList.includes(to.path) && !to.path.startsWith('/redirect')) {
      // 获取用户信息
      await user.getUserInfo()
      await user.generateDynamicRoutes()
      try {
        next({ ...to, replace: true })
        return
      } catch (e) {
        if (e instanceof AxiosError && e?.response?.status === 401) {
          // 跳转到error页面
          next({
            path: '/401'
          })
        }
      }
    } else {
      // 如果当前是登录页面就跳转到首页
      if (to.path === loginPath) {
        next({
          path: '/'
        })
        return
      }
    }
  }
  next()
})

router.afterEach((to) => {
  useMetaTitle(to)
  useLoadingCheck()
  useScrollToTop()
})
