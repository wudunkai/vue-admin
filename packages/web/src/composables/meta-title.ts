import type { RouteLocationNormalizedLoaded, RouteRecordRaw } from 'vue-router'

export function useMetaTitle(route: RouteRecordRaw | RouteLocationNormalizedLoaded) {
  const { title } = route.meta ?? {}
  if (title) {
    useTitle(title)
  }
}
