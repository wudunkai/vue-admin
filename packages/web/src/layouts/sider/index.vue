<script lang="ts" setup>
import { useLayoutStore } from '@/stores/layouts'
import mock from '@/json/mock'
const app = useLayoutStore()
const router = useRouter()
const { VITE_GLOB_WEB_NAME } = import.meta.env
const onOpenChange = (openKeys: string[]) => {
  let keys = openKeys || app.selectedKeys[0]
  // if (keys.length === 1) {
  //   app.openKeys = keys
  // } else {
  //   app.openKeys = keys.length[('2', '2-1')]
  // }
  // const latestOpenKey = openKeys.find((key) => app.openKeys.indexOf(key) === -1)
  // if (app.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
  //   app.openKeys = openKeys
  // } else {
  //   app.openKeys = latestOpenKey ? [latestOpenKey] : []
  // }
}
watchEffect(() => {
  onOpenChange()
})
const openRouter = ({ item }) => {
  onOpenChange(item.originItemValue.key)
  router.push(item.path)
}
const items = reactive(mock.router)
</script>

<template>
  <a-layout-sider
    v-model:collapsed="app.collapsed"
    collapsedWidth="64"
    :trigger="null"
    collapsible
    class="sider-content"
  >
    <div class="logo">
      <img src="../../assets/images/logo.webp" class="app-logo" alt="Logo" />
      <div class="app-logo-title">{{ VITE_GLOB_WEB_NAME }}</div>
    </div>
    <a-menu
      v-model:selectedKeys="app.selectedKeys"
      mode="inline"
      theme="dark"
      :open-keys="app.openKeys"
      :items="items"
      @click="openRouter"
    ></a-menu>
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
  .logo {
    height: 2rem;
    margin: 1rem;
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
}
</style>
