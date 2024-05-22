<script setup lang="ts">
const { colorPrimary, algorithm } = useThemeConfig()
const { antd } = useI18nLocale()
const themeConfig = reactive({
  token: {
    colorPrimary
  },
  algorithm
})
</script>

<template>
  <a-config-provider :theme="themeConfig" :locale="antd">
    <RouterView />
  </a-config-provider>
</template>

<style lang="scss">
@import '@/assets/styles/theme';
</style>
