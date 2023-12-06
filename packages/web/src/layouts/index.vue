<script lang="ts" setup>
import { reactive, watch, h } from 'vue'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  MailOutlined,
  DesktopOutlined,
  InboxOutlined,
  AppstoreOutlined
} from '@ant-design/icons-vue'
const { VITE_GLOB_WEB_NAME } = import.meta.env
const state = reactive({
  collapsed: false,
  selectedKeys: ['1'],
  rootSubmenuKeys: ['sub1', 'sub2'],
  openKeys: ['sub1'],
  preOpenKeys: ['sub1']
})
const items = reactive([
  {
    key: '1',
    icon: () => h(PieChartOutlined),
    label: 'Option 1',
    title: 'Option 1'
  },
  {
    key: '2',
    icon: () => h(DesktopOutlined),
    label: 'Option 2',
    title: 'Option 2'
  },
  {
    key: '3',
    icon: () => h(InboxOutlined),
    label: 'Option 3',
    title: 'Option 3'
  },
  {
    key: 'sub1',
    icon: () => h(MailOutlined),
    label: 'Navigation One',
    title: 'Navigation One',
    children: [
      {
        key: '5',
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
watch(
  () => state.openKeys,
  (_val, oldVal) => {
    state.preOpenKeys = oldVal
  }
)
const toggleCollapsed = () => {
  state.collapsed = !state.collapsed
  state.openKeys = state.collapsed ? [] : state.preOpenKeys
}
const onOpenChange = (openKeys: string[]) => {
  const latestOpenKey = openKeys.find((key) => state.openKeys.indexOf(key) === -1)
  if (state.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
    state.openKeys = openKeys
  } else {
    state.openKeys = latestOpenKey ? [latestOpenKey] : []
  }
}
</script>

<template>
  <a-layout id="layouts">
    <a-layout-sider
      v-model:collapsed="state.collapsed"
      collapsedWidth="64"
      :trigger="null"
      collapsible
      class="sider"
    >
      <div class="logo">
        <img src="../assets/images/logo.webp" class="app-logo" alt="Logo" />
        <div class="app-logo-title">{{ VITE_GLOB_WEB_NAME }}</div>
      </div>
      <a-menu
        v-model:selectedKeys="state.selectedKeys"
        mode="inline"
        theme="dark"
        :open-keys="state.openKeys"
        :inline-collapsed="state.collapsed"
        :items="items"
        @openChange="onOpenChange"
      ></a-menu>
    </a-layout-sider>
    <a-layout class="content">
      <a-layout-header class="header">
        <a-button type="link" class="menu" @click="toggleCollapsed">
          <MenuUnfoldOutlined v-if="state.collapsed" />
          <MenuFoldOutlined v-else />
        </a-button>
        <projectConfiguration />
      </a-layout-header>
      <a-breadcrumb style="margin: 16px 0">
        <a-breadcrumb-item>Home</a-breadcrumb-item>
        <a-breadcrumb-item>List</a-breadcrumb-item>
        <a-breadcrumb-item>App</a-breadcrumb-item>
      </a-breadcrumb>
      <a-layout-content
        :style="{
          margin: '0 16px 24px 16px',
          padding: '24px'
        }"
      >
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<style lang="scss">
#layouts {
  height: 100%;
  .sider {
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
  .content {
    height: 100%;
    z-index: 1;
    .header {
      padding: 0;
      .menu {
        margin-bottom: 16px;
      }
    }
  }
}
</style>
