<script lang="ts" setup>
import LayoutHeader from './header/index.vue'
import LayoutSideBar from './sider/index.vue'
import LayoutContent from './content/index.vue'
</script>

<template>
  <a-layout id="layouts">
    <LayoutSideBar />
    <a-layout class="content">
      <LayoutHeader />
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
      padding: 1.5rem;
    }
  }
}
</style>
