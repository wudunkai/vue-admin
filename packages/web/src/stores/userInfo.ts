import { defineStore } from 'pinia'

/**
 * userInfo 配置 开启持久化
 */
export const useAppStore = defineStore({
  id: 'userInfo',
  state: () => ({
    token: '' // token
  }),
  persist: {
    key: 'userInfo', // 指定key进行存储，此时非key的值不会持久化，刷新就会丢失
    storage: localStorage, // 指定换成地址
    paths: ['token'] // 指定需要持久化的state的路径名称
  }
})
