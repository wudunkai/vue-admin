import { theme } from 'ant-design-vue'
/**
 * themeColor 配置 开启持久化
 */
export const useThemeColorStore = defineStore({
  id: 'themeColor',
  state: () => ({
    themeName: '#409eff', // 主题颜色
    darkMode: 'light', // 主题模式
    grayMode: false, // 灰色模式
    colorWeakMode: false, // 色弱模式
    locale: ref<string>(lsLocaleState.value)
  }),
  actions: {
    toggleLocale(locale: string) {
      lsLocaleState.value = locale
    },
    async setThemeName(value: string) {
      this.$patch({
        themeName: value
      })
    },
    async toggleDarkMode() {
      this.$patch({
        darkMode: this.darkMode === 'light' ? 'dark' : 'light'
      })
    }
  },
  getters: {
    themeConfig(state) {
      document.documentElement.setAttribute('data-theme', state.themeName)
      document.documentElement.setAttribute('data-dark', state.darkMode)
      document
        .getElementsByTagName('body')[0]
        .style.setProperty('--el-color-primary', state.themeName)
      const classNames: Array<string> = []
      state.grayMode && classNames.push('gray-mode')
      state.colorWeakMode && classNames.push('color-weak')
      document.getElementsByTagName('html')[0].className = classNames.join(' ')
      // 主题配置
      return {
        token: {
          colorPrimary: state.themeName
        },
        algorithm: state.darkMode === 'light' ? theme.defaultAlgorithm : theme.darkAlgorithm
      }
    }
  },
  persist: {
    key: 'themeColor', // 指定key进行存储，此时非key的值不会持久化，刷新就会丢失
    storage: localStorage, // 指定换成地址
    paths: ['darkMode', 'grayMode', 'colorWeakMode'] // 指定需要持久化的state的路径名称
  }
})
