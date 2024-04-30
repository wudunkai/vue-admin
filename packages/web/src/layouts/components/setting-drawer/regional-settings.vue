<script setup lang="ts">
import type { SelectValue } from 'ant-design-vue/es/select'
import type { CheckedType } from '../../basic-layout/typing'

const props = defineProps<{
  locale?: string
  localeList?: any[]
  animationName?: string
  animationNameList?: any[]
  t?: (key: string, ...args: any[]) => string
}>()

const emit = defineEmits(['changeSetting'])
const list = computed(() => [
  {
    title: '语言',
    key: 'locale',
    disabled: false,
    disabledReason: ''
  },
  {
    title: '动画',
    key: 'animationName',
    disabled: false,
    disabledReason: ''
  }
])

function handleChangeSetting(key: string, value: any) {
  emit('changeSetting', key, value)
}
</script>

<template>
  <a-list :data-source="list" :split="false">
    <template #renderItem="{ item }">
      <a-tooltip :title="item.disabled ? item.disabledReason : ''" placement="left">
        <a-list-item>
          <template #actions>
            <a-select
              v-if="item.key == 'locale'"
              style="width: 120px"
              :value="locale"
              :options="localeList"
              size="small"
              @update:value="(e: SelectValue) => handleChangeSetting(item.key, e)"
            />
            <a-select
              v-else-if="item.key == 'animationName'"
              style="width: 120px"
              :value="animationName"
              :options="animationNameList"
              size="small"
              @update:value="(e: SelectValue) => handleChangeSetting(item.key, e)"
            />
            <a-switch
              v-else
              size="small"
              :checked="(props as any)[item.key]"
              :disabled="item.disabled"
              @update:checked="(e: CheckedType) => handleChangeSetting(item.key, e)"
            />
          </template>
          <span :style="{ opacity: item.disabled ? '0.5' : '1' }">
            {{ t?.(`app.setting.content-area.${item.key}`, item.title) ?? item.title }}
          </span>
        </a-list-item>
      </a-tooltip>
    </template>
  </a-list>
</template>
