import type { VNodeChild } from 'vue'

export type MenuData = MenuDataItem[]

export type CheckedType = boolean | string | number

export type ThemeType = 'light' | 'dark'

export interface MenuDataItem {
  // 唯一id
  id?: string | number
  // 标题
  title: string | (() => VNodeChild)
  // 图标
  icon?: string | (() => VNodeChild)
  // 地址
  path: string
  // 绑定的哪个组件
  component?: string
  // 子集菜单
  children?: MenuDataItem[]
  // 重定向地址
  redirect?: string
  // 哪些是固定页签
  affix?: boolean
  // 父级菜单的id
  parentId?: string | number | null
  // 同路由中的name，主要是用于保活的左右
  name?: string
  // 是否隐藏当前菜单
  hideInMenu?: boolean
  // 如果使用了隐藏，那么点击当前菜单的时候，可以使用父级的key
  parentKeys?: string[]
  // 是否套用iframe
  isIframe?: boolean
  // 如果当前是iframe的模式，需要有一个跳转的url支撑，其不能和path重复，path还是为路由
  url?: string
  // 是否存在面包屑
  hideInBreadcrumb?: boolean
  // 是否需要显示所有的子菜单
  hideChildrenInMenu?: boolean
  // 是否保活
  keepAlive?: boolean
  // 这里包含所有的父级元素
  matched?: MenuDataItem[]
  // 全连接跳转模式
  target?: '_blank' | '_self' | '_parent'
  // 多语言配置
  locale?: string
}
