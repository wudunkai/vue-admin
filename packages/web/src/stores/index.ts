import { theme as anTdTheme } from 'ant-design-vue/es'
import type { ThemeType } from '@/layouts/basic-layout/typing'
import type { AnimationNameValueType } from '@/config/default-setting'
import defaultSetting from '@/config/default-setting'
export interface LayoutSetting {
  title?: string
  logo?: string
  theme: ThemeType
  collapsed: boolean
  // drawerVisible: boolean
  colorPrimary: string
  // layout?: LayoutType
  // contentWidth?: ContentWidth
  // fixedHeader?: boolean
  // fixedSider?: boolean
  // splitMenus?: boolean
  // watermark?: boolean
  // header?: boolean
  // footer?: boolean
  // menu?: boolean
  // menuHeader?: boolean
  colorWeak?: boolean
  colorGray?: boolean
  // multiTab?: boolean
  // multiTabFixed?: boolean
  // headerHeight?: number
  // copyright?: string
  locale: string
  keepAlive?: boolean
  accordionMode?: boolean
  leftCollapsed?: boolean
  compactAlgorithm?: boolean
  animationName?: AnimationNameValueType
}
/**
 * app 配置 开启持久化
 */
export const useAppStore = defineStore({
  id: 'app',
  state: () => ({
    layoutSetting: reactive<LayoutSetting>(defaultSetting)
  }),
  actions: {
    async toggleCollapsed() {
      this.$patch({
        layoutSetting: {
          collapsed: !this.layoutSetting.collapsed
        }
      })
    },
    toggleLocale(locale: string) {
      lsLocaleState.value = locale
    },
    async setThemeName(value: string) {
      this.$patch({
        layoutSetting: {
          colorPrimary: value
        }
      })
    },
    async toggleDarkMode() {
      this.$patch({
        layoutSetting: {
          theme: this.layoutSetting.theme === 'light' ? 'dark' : 'light'
        }
      })
    }
  },
  getters: {
    themeConfig(state) {
      document.documentElement.setAttribute('data-theme', state.layoutSetting.colorPrimary)
      document.documentElement.setAttribute('data-dark', state.layoutSetting.theme)
      document
        .getElementsByTagName('body')[0]
        .style.setProperty('--el-color-primary', state.layoutSetting.colorPrimary)
      const classNames: Array<string> = []
      state.layoutSetting.colorGray && classNames.push('color-gray')
      state.layoutSetting.colorWeak && classNames.push('color-weak')
      document.getElementsByTagName('html')[0].className = classNames.join(' ')
      // 主题配置
      return {
        token: {
          colorPrimary: state.layoutSetting.colorPrimary
        },
        algorithm:
          state.layoutSetting.theme === 'light'
            ? anTdTheme.defaultAlgorithm
            : anTdTheme.darkAlgorithm
      }
    }
  }
  // persist: {
  //   key: 'layouts', // 指定key进行存储，此时非key的值不会持久化，刷新就会丢失
  //   storage: localStorage, // 指定换成地址
  //   paths: ['layoutSetting'] // 指定需要持久化的state的路径名称
  // }
})
