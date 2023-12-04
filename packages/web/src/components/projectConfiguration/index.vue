<script setup lang="ts">
import { h } from 'vue'
import { useAppStore } from '@/stores/themeColor'
import { SettingOutlined } from '@ant-design/icons-vue'
const app = useAppStore()
const open = ref<boolean>(false)
const showDrawer = () => {
  open.value = true
}
const interfaceDisplayList = {
  grayMode: '灰色模式',
  colorWeak: '色弱模式'
}
</script>

<template>
  <a-tooltip title="项目配置">
    <a-button @click="showDrawer" type="primary" shape="circle" :icon="h(SettingOutlined)" />
  </a-tooltip>
  <a-drawer
    v-model:open="open"
    class="project-configuration"
    root-class-name="root-class-name"
    title="项目配置"
    placement="right"
  >
    <div class="project-configuration-content">
      <a-divider>主题</a-divider>
      <themeColor />
      <a-divider>界面显示</a-divider>
      <ul class="interface-display">
        <li v-for="(item, index) in interfaceDisplayList" :key="index">
          <span>{{ item }}</span>
          <a-switch v-model:checked="app[index]" checked-children="开" un-checked-children="关" />
        </li>
      </ul>
    </div>
  </a-drawer>
</template>

<style lang="scss">
.project-configuration {
  .project-configuration-content {
    .interface-display {
      li {
        margin-top: 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
  }
}
</style>
