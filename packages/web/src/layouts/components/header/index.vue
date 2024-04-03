<script lang="ts" setup>
import Icon, {
  MenuFoldOutlined,
  MinusOutlined,
  BorderOutlined,
  CloseOutlined,
  MenuUnfoldOutlined
} from '@ant-design/icons-vue'
// import { ipcRenderer } from 'electron'
const app = useLayoutStore()
const isMax = ref(true)
</script>

<template>
  <a-layout-header class="header">
    <div class="header-title">
      <ProjectConfiguration />
      <!-- <MinusOutlined class="icon-btn" title="最小化" @click="ipcRenderer.send('window-min')" />
      <BorderOutlined class="icon-btn"
        title="最大化"
        v-if="isMax"
        @click="(isMax = !isMax), ipcRenderer.send('window-max')"
      />
      <icon class="icon-btn" title="向下还原" v-else @click="(isMax = !isMax), ipcRenderer.send('window-max')">
        <template #component>
          <svg
            t="1711503849681"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="5161"
            width="1em"
            height="1em"
          >
            <path
              d="M165.712 334.501v537.51h537.51V334.5z m179.17-179.17v89.585h447.924v447.925h89.585V155.33z m-89.585-89.584h716.68v716.678h-179.17v179.17H76.126V244.916h179.17z"
              p-id="5162"
              fill="#001529"
            ></path>
          </svg>
        </template>
      </icon>
      <CloseOutlined  class="icon-btn close" @click="ipcRenderer.send('window-close')" title="关闭" /> -->
    </div>
    <div class="header-content">
      <div class="header-right">
        <a-button type="link" class="menu" @click="app.toggleCollapsed">
          <MenuUnfoldOutlined v-if="app.collapsed" />
          <MenuFoldOutlined v-else />
        </a-button>
        <Breadcrumb />
      </div>
    </div>
  </a-layout-header>
</template>

<style lang="scss">
#app {
  .header {
    position: relative;
    height: 2.5rem;
    display: flex;
    @include appRegion(drag);
    .header-title {
      position: absolute;
      right: 0;
      top: 0;
      line-height: normal;
      @include appRegion(no-drag);
      span {
        cursor: pointer;
        padding: 0.5rem 0.8rem;
      }
      .close {
        &:hover {
          background: red;
          color: #fff;
        }
      }
    }
    .header-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .header-right {
        display: flex;
        align-items: center;
        @include appRegion(no-drag);
      }
    }
  }
  html[data-dark='dark'] {
    .header {
      span {
        &:hover {
          color: #000;
        }
      }
    }
  }
}
</style>
