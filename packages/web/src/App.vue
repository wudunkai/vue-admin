<script setup lang="ts">
import { useAppStore } from '@/stores/themeColor'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons-vue'
const app = useAppStore()
</script>

<template>
  <a-config-provider :theme="app.themeConfig">
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
    <a-back-top />
  </a-config-provider>
</template>

<style lang="scss">
@import '@/assets/styles/theme';
</style>
