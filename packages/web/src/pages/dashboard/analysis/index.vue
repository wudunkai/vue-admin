<script lang="ts" setup>
defineOptions({
  name: 'DashboardAnalysis'
})
const value1 = ref<string>('')
watch(value1, () => {
  console.log(value1.value)
})
</script>

<template>
  <a-space direction="vertical">
    <a-input v-model:value.lazy="value1" autofocus placeholder="Lazy usage" />
  </a-space>
</template>
