<script lang="ts" setup>
import LayoutHeader from './components/header/index.vue'
import LayoutMultiTab from './components/multi-tab/index.vue'
import LayoutMenu from './components/menu/index.vue'
import LayoutContent from './components/content/index.vue'
import SettingDrawer from './components/setting-drawer/index.vue'
import { animationNameList, localeList } from '@/config/default-setting'
const app = useAppStore()
const { layoutSetting } = storeToRefs(app)
const { t } = useI18nLocale()
</script>

<template>
  <a-layout id="layouts">
    <LayoutMenu />
    <a-layout class="content">
      <LayoutHeader />
      <LayoutMultiTab />
      <LayoutContent />
    </a-layout>
    <SettingDrawer
      v-model:open="layoutSetting.drawerVisible"
      :t="t"
      :theme="layoutSetting.theme"
      :color-primary="layoutSetting.colorPrimary"
      :color-weak="layoutSetting.colorWeak"
      :color-gray="layoutSetting.colorGray"
      :keep-alive="layoutSetting.keepAlive"
      :accordion-mode="layoutSetting.accordionMode"
      :animation-name="layoutSetting.animationName"
      :animation-name-list="animationNameList"
      :locale="layoutSetting.locale"
      :locale-list="localeList"
      :layout-setting="layoutSetting"
      @setting-change="app.changeSettingLayout"
    />
    <!-- :multi-tab="layoutSetting.multiTab"
      :multi-tab-fixed="layoutSetting.multiTabFixed"
      :watermark="layoutSetting.watermark"
      v-bind="layoutProps" -->
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
      margin: 0.5rem;
      border-radius: 0.5rem;
    }
  }
}
</style>
