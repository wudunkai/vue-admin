/// <reference types="vite/client" />
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}
interface Window {
  gt?: any
  initGeetest4?: any
}

interface Document {
  startViewTransition?: any
}

type Recordable<T> = Record<string, T>

declare interface Fn<T = any, R = T> {
  (...arg: T[]): R
}
