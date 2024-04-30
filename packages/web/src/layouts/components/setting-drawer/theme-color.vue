<script setup lang="ts">
import { CheckOutlined } from '@ant-design/icons-vue'

defineProps<{
  colorList: { key: string; color: string }[]
  color?: string
  onChange?: (color: string) => void
  t?: (key: string, ...args: any[]) => string
}>()
</script>

<template>
  <div class="drawer-setting-theme-color">
    <a-tooltip v-for="item in colorList" :key="item.color">
      <template #title>
        {{ t?.(`app.setting.themeColor.${item.key}`) }}
      </template>
      <div
        class="drawer-setting-theme-color-block"
        :style="{ backgroundColor: item.color }"
        @click="onChange?.(item.color)"
      >
        <CheckOutlined v-show="color === item.color" />
      </div>
    </a-tooltip>
  </div>
</template>

<style lang="scss">
.drawer-setting-theme-color {
  margin-top: 16px;
  overflow: hidden;

  &-block {
    float: left;
    width: 20px;
    height: 20px;
    margin-top: 8px;
    margin-right: 8px;
    font-weight: 700;
    display: flex;
    color: #fff;
    align-items: center;
    justify-content: center;
    border-radius: 2px;
    cursor: pointer;
  }
}
</style>
