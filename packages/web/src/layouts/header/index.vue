<script lang="ts" setup>
import { useLayoutStore } from '@/stores/layouts'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue'
const app = useLayoutStore()
</script>

<template>
  <a-layout-header class="header">
    <div class="header-right">
      <a-button type="link" class="menu" @click="app.toggleCollapsed">
        <MenuUnfoldOutlined v-if="app.collapsed" />
        <MenuFoldOutlined v-else />
      </a-button>
      <Breadcrumb />
    </div>
    <div class="header-left">
      <projectConfiguration />
    </div>
  </a-layout-header>
</template>

<style lang="scss">
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .header-right {
    display: flex;
    align-items: center;
  }
  .header-left {
    display: flex;
    align-items: center;
    margin: 0 20px;
  }
}
</style>
