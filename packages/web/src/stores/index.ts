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
    async toggleDarkMode($event: { clientX: any; clientY: any }) {
      const isDark = this.layoutSetting.theme === 'light'
      // 在 transition.ready 的 Promise 完成后，执行自定义动画
      // 获取到 transition API 实例
      const transition = document.startViewTransition(() => {
        this.$patch({
          layoutSetting: {
            theme: isDark ? 'dark' : 'light'
          }
        })
        document.documentElement.setAttribute('data-theme', this.layoutSetting.theme)
      })

      transition.ready.then(() => {
        // 由于我们要从鼠标点击的位置开始做动画，所以我们需要先获取到鼠标的位置
        const { clientX, clientY } = $event
        // 计算半径，以鼠标点击的位置为圆心，到四个角的距离中最大的那个作为半径
        const radius = Math.hypot(
          Math.max(clientX, innerWidth - clientX),
          Math.max(clientY, innerHeight - clientY)
        )
        const clipPath = [
          `circle(0% at ${clientX}px ${clientY}px)`,
          `circle(${radius}px at ${clientX}px ${clientY}px)`
        ]
        // 自定义动画
        document.documentElement.animate(
          {
            clipPath: isDark ? [...clipPath].reverse() : clipPath
          },
          {
            duration: 500,
            pseudoElement: isDark ? '::view-transition-old(root)' : '::view-transition-new(root)'
          }
        )
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
  persist: {
    storage: localStorage, // 指定换成地址
    paths: ['layoutSetting'] // 指定需要持久化的state的路径名称
  }
})
