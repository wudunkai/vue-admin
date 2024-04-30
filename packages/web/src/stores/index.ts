import { theme as anTdTheme } from 'ant-design-vue/es'
import type { ThemeType } from '@/layouts/basic-layout/typing'
import type { AnimationNameValueType } from '@/config/default-setting'
import defaultSetting from '@/config/default-setting'
export interface LayoutSetting {
  title?: string
  logo?: string
  theme: ThemeType
  collapsed: boolean
  drawerVisible: boolean
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
      this.$patch({
        layoutSetting: {
          locale
        }
      })
      lsLocaleState.value = locale
    },
    toggleColorPrimary(colorPrimary: string) {
      this.$patch({
        layoutSetting: {
          colorPrimary
        }
      })
    },
    async toggleDarkMode() {
      this.$patch({
        layoutSetting: {
          theme: this.layoutSetting.theme === 'light' ? 'dark' : 'light'
        }
      })
    },
    toggleGray(isGray = true) {
      this.$patch({
        layoutSetting: {
          colorGray: isGray
        }
      })
      const dom = document.querySelector('body')
      if (dom) {
        if (isGray) {
          this.toggleWeak(false)
          dom.style.filter = 'grayscale(100%)'
        } else {
          dom.style.filter = ''
        }
      }
    },
    toggleWeak(isWeak = true) {
      this.$patch({
        layoutSetting: {
          colorWeak: isWeak
        }
      })
      const dom = document.querySelector('body')
      if (dom) {
        if (isWeak) {
          this.toggleGray(false)
          dom.style.filter = 'invert(80%)'
        } else {
          dom.style.filter = ''
        }
      }
    },
    changeSettingLayout(key: keyof LayoutSetting, value: any) {
      const { setLocale } = useI18nLocale()
      if (key === 'locale') setLocale(value)
      else if (key === 'colorPrimary') this.toggleColorPrimary(value)
      // else if (key === 'layout') toggleLayout(value as LayoutType)
      else if (key === 'colorWeak') this.toggleWeak(value)
      else if (key === 'colorGray') this.toggleGray(value)
      else if (key in this.layoutSetting) (this.layoutSetting as any)[key] = value
    }
  },
  getters: {
    themeConfig(state) {
      document.documentElement.setAttribute('data-theme', state.layoutSetting.theme)
      // 主题配置
      return {
        token: {
          // colorBgContainer: '#fff',
          colorPrimary: state.layoutSetting.colorPrimary
        },
        algorithm:
          state.layoutSetting.theme === 'light'
            ? anTdTheme.defaultAlgorithm
            : anTdTheme.darkAlgorithm
      }
    }
  },
  persist: {
    storage: localStorage, // 指定换成地址
    paths: ['layoutSetting'] // 指定需要持久化的state的路径名称
  }
})
