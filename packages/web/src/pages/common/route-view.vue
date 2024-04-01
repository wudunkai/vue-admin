<script lang="ts" setup>
import { ParentCompConsumer } from '@/layouts/basic-layout/parent-comp-consumer'
const app = useLayoutStore()
const { layoutSetting } = storeToRefs(app)
const multiTabStore = useMultiTab()
const { cacheList } = storeToRefs(multiTabStore)
console.log(cacheList)
</script>

<template>
  <ParentCompConsumer>
    <RouterView>
      <template #default="{ Component, route }">
        <Transition appear :name="layoutSetting.animationName" mode="out-in">
          <KeepAlive v-if="layoutSetting.keepAlive" :include="cacheList">
            <component :is="Component" :key="route.fullPath" />
          </KeepAlive>
          <component :is="Component" v-else :key="route.fullPath" />
        </Transition>
      </template>
    </RouterView>
  </ParentCompConsumer>
</template>
