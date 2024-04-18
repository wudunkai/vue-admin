<script lang="ts" setup>
import { isFunction } from 'lodash'
import type { VNodeChild } from 'vue'
import { isUrl } from '@/utils/methods'
const layout = useLayoutStore()
const route = useRoute()
const router = useRouter()
const getCurrentItem = () => {
  const key: any = route.meta?.originPath ?? route.path
  if (key && layout.menuDataMap.has(key)) return layout.menuDataMap.get(key)
  return {} as any
}
const currentItem = shallowRef(getCurrentItem())
onBeforeMount(() => {
  currentItem.value = getCurrentItem()
})
let timer: ReturnType<typeof setTimeout> | undefined
watch(
  () => route.path,
  () => {
    if (timer) {
      clearTimeout(timer)
      timer = undefined
    }
    timer = setTimeout(() => {
      currentItem.value = getCurrentItem()
    }, 300)
  }
)
const changeRouter = (item: { path: any }) => {
  const path = item.path
  if (!isUrl(path)) router.push(path)
  else window.open(path, '_blank')
}
function renderTitle(title: VNodeChild | (() => VNodeChild)) {
  if (isFunction(title)) return title()
  return title
}
</script>

<template>
  <a-breadcrumb>
    <a-breadcrumb-item v-for="item in currentItem.matched" :key="item.path">
      {{ renderTitle(item.title) }}
      <template #overlay v-if="item.children">
        <a-menu>
          <a-menu-item v-for="child in item.children" :key="child.path">
            <a @click="changeRouter(child)" href="javascript:;">{{ renderTitle(child.title) }}</a>
          </a-menu-item>
        </a-menu>
      </template>
    </a-breadcrumb-item>
    <a-breadcrumb-item>
      {{ renderTitle(currentItem.title) }}
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>
