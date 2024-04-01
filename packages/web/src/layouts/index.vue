<script lang="ts" setup>
import LayoutHeader from './components/header/index.vue'
import LayoutMultiTab from './components/multi-tab/index.vue'
import LayoutMenu from './components/menu/index.vue'
import LayoutContent from './components/content/index.vue'
</script>

<template>
  <a-layout id="layouts">
    <LayoutMenu />
    <a-layout class="content">
      <LayoutHeader />
      <LayoutMultiTab />
      <LayoutContent />
    </a-layout>
  </a-layout>
</template>

<style lang="scss">
#layouts {
  height: 100%;
  .content {
    height: 100%;
    z-index: 1;
    .ant-layout-header {
      padding: 0;
    }
    .ant-layout-content {
      margin: 0 1rem 1.5rem 1rem;
      border-radius: 0.5rem;
    }
  }
}
</style>
