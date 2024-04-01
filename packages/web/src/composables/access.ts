import { toArray } from 'lodash'
import type { AccessEnum } from '@/utils/constant'

export function useAccess() {
  const userStore = useAppStore()
  const roles = computed(() => userStore.roles)
  const hasAccess = (roles: (string | number)[] | string | number | AccessEnum) => {
    const accessRoles = userStore.roles
    const roleArr = toArray(roles).flat(1)
    return roleArr.some((role) => accessRoles?.includes(role))
  }
  return {
    hasAccess,
    roles
  }
}
