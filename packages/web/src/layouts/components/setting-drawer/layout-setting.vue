<script setup lang="ts">
import type { CheckedType } from '../../basic-layout/typing'
const props = defineProps<{
  keepAlive?: boolean
  accordionMode?: boolean
  leftCollapsed?: boolean
  t?: (key: string, ...args: any[]) => string
}>()

const emit = defineEmits(['changeSetting'])
const list = computed(() => [
  {
    title: '缓存功能',
    key: 'keepAlive',
    disabled: false,
    disabledReason: ''
  },
  {
    title: '菜单手风琴模式',
    key: 'accordionMode',
    disabled: false,
    disabledReason: ''
  },
  {
    title: '侧边菜单折叠左侧',
    key: 'leftCollapsed',
    disabled: false,
    disabledReason: ''
  }
])
function handleChangeSetting(key: string, value: any) {
  emit('changeSetting', key, value)
}
function isToggleChecked(key: string) {
  return Reflect.get(props, key)
}
</script>

<template>
  <a-list :data-source="list" :split="false">
    <template #renderItem="{ item }">
      <a-tooltip :title="item.disabled ? item.disabledReason : ''" placement="left">
        <a-list-item>
          <template #actions>
            <a-switch
              size="small"
              :checked="isToggleChecked(item.key)"
              :disabled="item.disabled"
              @update:checked="(e: CheckedType) => handleChangeSetting(item.key, e)"
            />
          </template>
          <span :style="{ opacity: item.disabled ? '0.5' : '1' }">
            {{ t?.(`app.setting.content-width.${item.key}`, item.title) ?? item.title }}
          </span>
        </a-list-item>
      </a-tooltip>
    </template>
  </a-list>
</template>
