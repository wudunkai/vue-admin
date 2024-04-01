<script lang="ts" setup>
import { RouteLocationRaw } from 'vue-router'
const app = useLayoutStore()
const route = useRoute()
const router = useRouter()
const checkRouteName = ref(route.meta.title)
watch(
  () => route,
  () => {
    const { title } = route.meta
    checkRouteName.value = title
  },
  { deep: true }
)
const routes = ref([])
const changeRouter = (item: { key: any; path: RouteLocationRaw }) => {
  const selectedKeys: any = [item.key]
  app.selectedKeys = selectedKeys
  router.push(item.path)
}
</script>

<template>
  <a-breadcrumb>
    <a-breadcrumb-item v-for="item in routes" :key="item.path">
      {{ item.title }}
      <template #overlay v-if="item.children">
        <a-menu>
          <a-menu-item v-for="child in item.children" :key="child.path">
            <a @click="changeRouter(child)" href="javascript:;">{{ child.title }}</a>
          </a-menu-item>
        </a-menu>
      </template>
    </a-breadcrumb-item>
    <a-breadcrumb-item>
      {{ checkRouteName || 404 }}
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>
