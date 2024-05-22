<script lang="ts" setup>
import SubMenu from './sub-menu.vue'
import { isUrl } from '@/utils/methods'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue'
const app = useAppStore()
const user = useUserStore()
const router = useRouter()
const layout = useLayoutStore()
const { layoutSetting } = storeToRefs(app)
const { VITE_GLOB_WEB_NAME } = import.meta.env
watch(
  () => user.menuData,
  (val) => {
    layout.toMapMenuData(val, layout.menuDataMap)
    layout.changeMenu()
  },
  { immediate: true, flush: 'post' }
)
watch(router.currentRoute, (route) => {
  // 路由发生变化
  if (route.path === layout.selectedKeys[0]) return
  layout.changeMenu()
})
const handleOpenKeys = (val: string[]) => {
  if (layoutSetting.value.accordionMode) layout.handleAccordionMode(val)
  else layout.openKeys = val
}
const handleSelectedKeys = (val: string[]) => {
  // 如果点击的是外部的菜单，那么我们就不需要设置成为激活的状态
  const path = val[0]
  if (!isUrl(path)) layout.selectedKeys = val
}
</script>

<template>
  <a-layout-sider
    v-model:collapsed="layoutSetting.collapsed"
    collapsedWidth="64"
    :trigger="null"
    collapsible
    class="sider-content"
  >
    <div class="logo">
      <img :src="layoutSetting.logo" class="app-logo" alt="Logo" />
      <div class="app-logo-title">{{ VITE_GLOB_WEB_NAME }}</div>
    </div>
    <Scrollbar>
      <a-menu
        :selected-keys="layout.selectedKeys"
        @update:open-keys="handleOpenKeys"
        @update:selected-keys="handleSelectedKeys"
        mode="inline"
        theme="dark"
        :open-keys="layoutSetting.collapsed ? [] : layout.openKeys"
      >
        <template v-for="item in user.menuData">
          <template v-if="!item.hideInMenu">
            <SubMenu :key="item.path" :item="item" />
          </template>
        </template>
      </a-menu>
    </Scrollbar>
    <a-menu
      v-if="layoutSetting.leftCollapsed"
      class="ant-sider-collapsed-button"
      mode="inline"
      theme="dark"
      :selectable="false"
      @click="app.toggleCollapsed"
    >
      <a-menu-item>
        <template #icon>
          <MenuUnfoldOutlined v-if="layoutSetting.collapsed" />
          <MenuFoldOutlined v-else />
        </template>
      </a-menu-item>
    </a-menu>
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
  }
}
</style>
