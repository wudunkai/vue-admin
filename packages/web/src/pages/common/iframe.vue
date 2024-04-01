<script setup lang="ts">
const route = useRoute()
const url: any = computed(() => route?.meta?.url)
const loading = ref(true)
function finishLoading() {
  loading.value = false
}
</script>

<template>
  <div class="ant-pro-iframe-wrap">
    <a-spin :spinning="loading">
      <iframe :src="url" @load="finishLoading" />
    </a-spin>
  </div>
</template>

<style lang="scss">
.ant-pro-iframe-wrap {
  display: flex;
  flex: 1 1 0%;
  flex-direction: column;
  height: 100%;
  .ant-spin-nested-loading {
    height: 100%;
    .ant-spin-container {
      height: 100% !important;
      width: 100% !important;
      display: flex;
      flex-direction: column;
      iframe {
        height: 100%;
      }
    }
  }
}
</style>
