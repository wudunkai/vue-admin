<script setup lang="ts">
const app = useAppStore()
const { antd } = useI18nLocale()
</script>

<template>
  <a-config-provider :theme="app.themeConfig" :locale="antd">
    <RouterView />
  </a-config-provider>
</template>

<style lang="scss">
@import '@/assets/styles/theme';
</style>
