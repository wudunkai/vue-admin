<script setup lang="ts">
import * as icons from '@ant-design/icons-vue'
import { isFunction } from 'lodash'
import type { VNodeChild } from 'vue'

const props = defineProps<{
  icon: string | ((...args: any[]) => VNodeChild)
}>()
const Comp = computed(() => {
  if (isFunction(props.icon)) {
    const node = props.icon()
    if (node) return node
  } else {
    return (icons as any)[props.icon]
  }
  return undefined
})
</script>

<template>
  <component :is="Comp" v-if="icon" />
</template>
