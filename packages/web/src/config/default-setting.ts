import type { LayoutSetting } from '@/stores/index'

export default {
  title: 'Antdv Pro',
  theme: 'light',
  logo: '/logo.webp',
  collapsed: false,
  drawerVisible: false,
  colorPrimary: '#1677FF',
  // layout: 'mix',
  // contentWidth: 'Fluid',
  // fixedHeader: false,
  // fixedSider: true,
  // splitMenus: false,
  // header: true,
  // menu: true,
  // watermark: true,
  // menuHeader: true,
  // footer: false,
  colorWeak: false,
  colorGray: false,
  // multiTab: true,
  // multiTabFixed: false,
  locale: lsLocaleState.value,
  keepAlive: true,
  accordionMode: false,
  // headerHeight: 48,
  copyright: 'Antdv Pro Team 2023',
  animationName: 'slide-fadein-right'
} as LayoutSetting

export const animationNameList = [
  {
    label: 'None',
    value: 'none'
  },
  {
    label: 'Fadein Up',
    value: 'slide-fadein-up'
  },
  {
    label: 'Fadein Right',
    value: 'slide-fadein-right'
  },
  {
    label: 'Zoom Fadein',
    value: 'zoom-fadein'
  },
  {
    label: 'Fadein',
    value: 'fadein'
  }
]

export const localeList = [
  {
    label: '简体中文',
    value: 'zh-CN'
  },
  {
    label: 'English',
    value: 'en-US'
  }
]

export type AnimationNameValueType =
  | 'none'
  | 'slide-fadein-up'
  | 'slide-fadein-right'
  | 'zoom-fadein'
  | 'fadein'
