import router from '@/router'
import type { RouteLocationNormalizedLoaded } from 'vue-router'
/**
 * multi-tab 配置 开启持久化
 */
const allowList = ['/login', '/error']

export interface MultiTabItem {
  path: string
  fullPath: string
  title: string
  name?: string
  icon?: string
  locale?: string
  // 判断当前是不是一个固定的标签
  affix?: boolean
  loading?: boolean
}
export const useMultiTab = defineStore({
  id: 'multi-tab',
  state: () => ({
    cacheList: ref<string[]>([]),
    list: ref<MultiTabItem[]>([]),
    activeKey: shallowRef(),
    refreshItem: ref<MultiTabItem | null>(null)
  }),
  actions: {
    addItem(route: RouteLocationNormalizedLoaded) {
      const { layoutSetting } = useLayoutStore()
      if (!route) return
      // 判断是不是重定向的地址，如果是，那么就不进行处理
      if (route.path.startsWith('/redirect') || route.path.startsWith('/common')) return
      if (route.path === '/') return
      if (allowList.includes(route.path)) return
      // 设置当前的loading为false
      if (this.refreshItem) {
        // 增加一个取消的延迟
        setTimeout(() => {
          if (this.refreshItem) {
            this.refreshItem.loading = false
            this.refreshItem = null
          }
        }, 500)
      }
      if (this.list.some((item) => item.fullPath === route.fullPath)) {
        if (!this.cacheList.includes(route?.name as string) && layoutSetting.keepAlive) {
          if (route.meta.keepAlive && route.name) this.cacheList.push(route.name as string)
        }
        return
      }
      const item: MultiTabItem = {
        path: route.path,
        fullPath: route.fullPath,
        title: route.meta.title as string,
        name: route.name as string,
        icon: route.meta.icon as string,
        affix: route.meta.affix as boolean,
        locale: route.meta.locale as string
      }
      if (!this.cacheList.includes(item?.name as string) && layoutSetting.keepAlive) {
        if (route.meta.keepAlive && route.name) this.cacheList.push(route.name as string)
      }
      this.list.push(item)
    },
    close(key: string) {
      const { layoutSetting } = useLayoutStore()
      // 判断长度是不是小于等于1，如果是那么这个就不能被关闭
      if (this.list.length <= 1) {
        console.log('不能关闭最后一个标签页')
        // message.error('不能关闭最后一个标签页')
        return
      }
      const index = this.list.findIndex((item) => item.fullPath === key)
      if (index < 0) {
        console.log('当前页签不存在无法关闭')
        // message.error('当前页签不存在无法关闭')
        return
      }
      const item = this.list[index]
      // 需要判断当前的标签是不是被选中，如果是，还需要判断当前是不是第一个页签，如果是，那么就需要激活上一个页签，如果不是，那就需要激活下一个页签
      if (item.fullPath === this.activeKey) {
        const newItem = index === 0 ? this.list[index + 1] : this.list[index - 1]
        this.activeKey = newItem.fullPath
        router.push(newItem.fullPath)
      }
      // 去除缓存
      if (layoutSetting.keepAlive && item.name)
        this.cacheList = this.cacheList.filter((name) => name !== item.name)
      this.list = this.list.filter((item) => item.fullPath !== key)
    },
    refresh(key: string) {
      const item = this.list.find((item) => item.fullPath === key)
      if (item) {
        item.loading = true
        this.$patch({
          cacheList: this.cacheList.filter((name) => name !== item.name),
          refreshItem: item
        })
        router.replace(`/redirect/${encodeURIComponent(item.fullPath)}`)
      }
    },
    switchTab(key: string) {
      if (key === this.activeKey) return
      router.push(key)
    },
    closeOther(key: string) {
      this.switchTab(key)
      this.list.forEach((item) => {
        if (item.affix) return
        if (item.fullPath === key) return
        this.close(item.fullPath)
      })
    },
    closeLeft(key: string) {
      this.switchTab(key)
      const index = this.list.findIndex((item) => item.fullPath === key)
      const leftList = this.list.slice(0, index)
      leftList.forEach((item) => {
        if (item.affix) return
        this.close(item.fullPath)
      })
    },
    closeRight(key: string) {
      this.switchTab(key)
      const index = this.list.findIndex((item) => item.fullPath === key)
      const rightList = this.list.slice(index + 1)
      rightList.forEach((item) => {
        if (item.affix) return
        this.close(item.fullPath)
      })
    },
    clear() {
      this.$patch({
        list: [],
        cacheList: [],
        activeKey: undefined,
        refreshItem: null
      })
    }
  },
  getters: {}
  // persist: {
  //   key: 'multi-tab', // 指定key进行存储，此时非key的值不会持久化，刷新就会丢失
  //   storage: localStorage // 指定换成地址
  //   // paths: ['collapsed'] // 指定需要持久化的state的路径名称
  // }
})
