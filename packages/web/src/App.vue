<script setup lang="ts">
import { useThemeColorStore } from '@/stores/themeColor'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons-vue'
const app = useThemeColorStore()
</script>

<template>
  <a-config-provider :theme="app.themeConfig">
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </a-config-provider>
</template>

<style lang="scss">
@import '@/assets/styles/theme';
</style>
