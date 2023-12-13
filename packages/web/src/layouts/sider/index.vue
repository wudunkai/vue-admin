<script lang="ts" setup>
import { useLayoutStore } from '@/stores/layouts'
import { MailOutlined, AppstoreOutlined } from '@ant-design/icons-vue'
const app = useLayoutStore()
const { VITE_GLOB_WEB_NAME } = import.meta.env
watch(
  () => app.openKeys,
  (_val, oldVal) => {
    app.preOpenKeys = oldVal
  }
)
const onOpenChange = (openKeys: string[]) => {
  const latestOpenKey = openKeys.find((key) => app.openKeys.indexOf(key) === -1)
  if (app.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
    app.openKeys = openKeys
  } else {
    app.openKeys = latestOpenKey ? [latestOpenKey] : []
  }
}
const items = reactive([
  {
    key: 'sub1',
    icon: () => h(MailOutlined),
    label: 'Navigation One',
    title: 'Navigation One',
    children: [
      {
        key: '1',
        label: 'Option 5',
        title: 'Option 5'
      },
      {
        key: '6',
        label: 'Option 6',
        title: 'Option 6'
      },
      {
        key: '7',
        label: 'Option 7',
        title: 'Option 7'
      },
      {
        key: '8',
        label: 'Option 8',
        title: 'Option 8'
      }
    ]
  },
  {
    key: 'sub2',
    icon: () => h(AppstoreOutlined),
    label: 'Navigation Two',
    title: 'Navigation Two',
    children: [
      {
        key: '9',
        label: 'Option 9',
        title: 'Option 9'
      },
      {
        key: '10',
        label: 'Option 10',
        title: 'Option 10'
      },
      {
        key: 'sub3',
        label: 'Submenu',
        title: 'Submenu',
        children: [
          {
            key: '11',
            label: 'Option 11',
            title: 'Option 11'
          },
          {
            key: '12',
            label: 'Option 12',
            title: 'Option 12'
          }
        ]
      }
    ]
  }
])
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
      :inline-collapsed="app.collapsed"
      :items="items"
      @openChange="onOpenChange"
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
