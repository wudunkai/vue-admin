import type { MenuData, MenuDataItem } from '@/layouts/basic-layout/typing'
import router from '@/router'
import { deepFind } from '@/utils/tree'

/**
 * layouts 配置 开启持久化
 */
export const useLayoutStore = defineStore({
  id: 'layouts',
  state: () => ({
    menuDataMap: reactive(new Map<string, MenuDataItem>()),
    selectedKeys: ref<string[]>([]),
    openKeys: ref<string[]>([])
  }),
  actions: {
    toMapMenuData(
      menuData: MenuData,
      menuDataMap: Map<string, MenuDataItem>,
      matched: MenuDataItem[] = []
    ) {
      menuData.forEach((v) => {
        menuDataMap.set(v.path, { ...v, matched })
        if (v.children && v.children.length)
          this.toMapMenuData(v.children, menuDataMap, [...matched, v])
      })
    },
    changeMenu() {
      const { layoutSetting } = useAppStore()
      const route = router.currentRoute.value
      const path: any = route.meta?.originPath ?? route.path
      if (this.menuDataMap.has(path)) {
        const menu = this.menuDataMap.get(path)
        this.selectedKeys = []
        if (menu) {
          if (menu.parentKeys && menu.parentKeys.length) this.selectedKeys = menu.parentKeys
          else this.selectedKeys = [menu.path]
        }
        // 设置openkeys
        if (menu?.matched) {
          const newOpenKeys = menu.matched.map((v) => v.path)
          if (!layoutSetting.accordionMode)
            this.openKeys = [...new Set([...this.openKeys, ...newOpenKeys])]
          else this.openKeys = newOpenKeys
        }
      }
    },
    handleAccordionMode(innerOpenKeys: string[]) {
      const findMenuByPath = (path: string) => {
        return (obj: MenuData) => deepFind((o) => o.path === path)(obj)
      }
      const { menuData } = storeToRefs(useUserStore())
      const rootSubmenuKeys: string[] | undefined = menuData.value?.map((item) => {
        return item.path
      })
      const latestOpenKey = innerOpenKeys.find((key) => !this.openKeys.includes(key))
      if (latestOpenKey) {
        if (!rootSubmenuKeys.includes(latestOpenKey)) {
          // 与 前一项比较 是否为同一级，同级则移除前一项
          const prevKey = innerOpenKeys[innerOpenKeys.length - 2]
          const preMenuItem: any = findMenuByPath(prevKey)(menuData.value)
          const latestOpenMenuItem: any = findMenuByPath(latestOpenKey)(menuData.value)
          if (
            preMenuItem &&
            latestOpenMenuItem &&
            preMenuItem.parentId === latestOpenMenuItem.parentId
          )
            innerOpenKeys.splice(innerOpenKeys.indexOf(prevKey), 1)
          this.openKeys = innerOpenKeys
        } else {
          this.openKeys = [latestOpenKey]
        }
      } else {
        this.openKeys = innerOpenKeys
      }
    },
    clear() {
      this.$patch({
        openKeys: [],
        selectedKeys: []
      })
    }
  }
})
