<script setup lang="ts">
const app = useThemeColorStore()
</script>

<template>
  <a-config-provider :theme="app.themeConfig">
    <RouterView />
  </a-config-provider>
</template>

<style lang="scss">
@import '@/assets/styles/theme';
</style>
