import { defineStore } from 'pinia'
/**
 * layouts 配置 开启持久化
 */
export const useLayoutStore = defineStore({
  id: 'layouts',
  state: () => ({
    collapsed: false,
    selectedKeys: ['1'],
    rootSubmenuKeys: ['sub1', 'sub2'],
    openKeys: ['sub1'],
    preOpenKeys: ['sub1']
  }),
  actions: {
    async toggleCollapsed() {
      this.$patch({
        collapsed: !this.collapsed,
        openKeys: this.collapsed ? [] : this.preOpenKeys
      })
    }
  },
  getters: {}
  // persist: {
  // key: 'layouts', // 指定key进行存储，此时非key的值不会持久化，刷新就会丢失
  // storage: localStorage, // 指定换成地址
  // paths: ['darkMode', 'grayMode', 'colorWeak'] // 指定需要持久化的state的路径名称
  // }
})
