/**
 * layouts 配置 开启持久化
 */
export const useLayoutStore = defineStore({
  id: 'layouts',
  state: () => ({
    collapsed: false,
    selectedKeys: computed(() => {
      const multiTabStore = useMultiTab()
      const { activeKey } = storeToRefs(multiTabStore)
      return activeKey.value ? [activeKey.value] : []
    }),
    openKeys: ref<string[]>([]),
    rootSubmenuKeys: computed(() => {
      const { menuData } = useAppStore()
      const rootSubmenuKey = menuData.filter((i) => i.children)
      return rootSubmenuKey.map((i) => i.path)
    }),
    layoutSetting: reactive({
      animationName: 'slide-fadein-right',
      keepAlive: true
    })
  }),
  actions: {
    async toggleCollapsed() {
      this.$patch({
        collapsed: !this.collapsed
      })
    }
  },
  persist: {
    key: 'layouts', // 指定key进行存储，此时非key的值不会持久化，刷新就会丢失
    storage: localStorage // 指定换成地址
    // paths: ['collapsed'] // 指定需要持久化的state的路径名称
  }
})
