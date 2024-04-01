<script lang="ts" setup>
import SubMenu from './sub-menu.vue'
const app = useAppStore()
const layout = useLayoutStore()
const { VITE_GLOB_WEB_NAME } = import.meta.env
const onOpenChange = (openKeys: string[]) => {
  const latestOpenKey: string = openKeys.find((key) => layout.openKeys.indexOf(key) === -1) || ''
  if (layout.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
    layout.openKeys = openKeys
  } else {
    layout.openKeys = latestOpenKey ? [latestOpenKey] : []
  }
}
</script>

<template>
  <a-layout-sider
    v-model:collapsed="layout.collapsed"
    collapsedWidth="64"
    :trigger="null"
    collapsible
    class="sider-content"
  >
    <div class="logo">
      <img src="../../../assets/images/logo.webp" class="app-logo" alt="Logo" />
      <div class="app-logo-title">{{ VITE_GLOB_WEB_NAME }}</div>
    </div>
    <div class="menu scrollbar">
      <a-menu
        v-model:selectedKeys="layout.selectedKeys"
        mode="inline"
        theme="dark"
        :open-keys="layout.openKeys"
        @openChange="onOpenChange"
      >
        <template v-for="item in app.menuData">
          <template v-if="!item.hideInMenu">
            <SubMenu :key="item.path" :item="item" />
          </template>
        </template>
      </a-menu>
    </div>
  </a-layout-sider>
</template>

<style lang="scss">
.sider-content {
  overflow: 'auto';
  height: '100vh';
  position: 'fixed';
  left: 0;
  top: 0;
  bottom: 0;
  .ant-layout-sider-children {
    display: flex;
    flex-direction: column;
    height: 100%;
    .logo {
      height: 2rem;
      margin: 2rem 1rem 1rem 1rem;
      display: flex;
      align-items: center;
      .app-logo {
        height: 100%;
      }
      .app-logo-title {
        color: #fff;
        margin-left: 1rem;
        transition: all 0.5s;
        font-size: 1rem;
        font-weight: 700;
        line-height: normal;
      }
    }
    .menu {
      flex: 1;
      overflow-y: auto;
      overflow-x: hidden;
    }
  }
}
</style>
