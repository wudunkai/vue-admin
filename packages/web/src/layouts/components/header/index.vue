<script lang="ts" setup>
import Breadcrumb from './breadcrumb.vue'
import Icon, {
  SettingOutlined,
  MenuFoldOutlined,
  MinusOutlined,
  BorderOutlined,
  CloseOutlined,
  MenuUnfoldOutlined
} from '@ant-design/icons-vue'
const { t } = useI18nLocale()
import { ipcRenderer } from 'electron'
const app = useAppStore()
const isMax = ref(true)
</script>

<template>
  <a-layout-header class="header">
    <div class="header-title">
      <SettingOutlined
        class="icon-btn"
        :title="t('app.setting.project')"
        @click="app.changeSettingLayout('drawerVisible', true)"
      />
      <MinusOutlined
        class="icon-btn"
        :title="$t('app.common.minimize')"
        @click="ipcRenderer.send('window-min')"
      />
      <BorderOutlined
        class="icon-btn"
        :title="$t('app.common.maximize')"
        v-if="isMax"
        @click="(isMax = !isMax), ipcRenderer.send('window-max')"
      />
      <icon
        class="icon-btn"
        :title="$t('app.common.restoreDown')"
        v-else
        @click="(isMax = !isMax), ipcRenderer.send('window-max')"
      >
        <template #component>
          <restoreDown class="icon" />
        </template>
      </icon>
      <CloseOutlined
        class="icon-btn close"
        @click="ipcRenderer.send('window-close')"
        :title="$t('app.common.close')"
      />
    </div>
    <div class="header-content">
      <div class="header-right">
        <icon class="icon-btn" @click="app.toggleCollapsed">
          <template #component>
            <MenuUnfoldOutlined class="icon" v-if="app.layoutSetting.collapsed" />
            <MenuFoldOutlined class="icon" v-else />
          </template>
        </icon>
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
        .icon-btn {
          cursor: pointer;
          padding: 0.5rem 0.8rem;
        }
      }
    }
  }
  html[data-theme='dark'] {
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
