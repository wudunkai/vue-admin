<script setup lang="ts">
import { SettingOutlined } from '@ant-design/icons-vue'
const theme = useThemeColorStore()
const layout = useLayoutStore()
const open = ref<boolean>(false)
const showDrawer = () => {
  open.value = true
}
const interfaceDisplayList = {
  grayMode: '灰色模式',
  colorWeak: '色弱模式'
}
const contentAreaList = {
  animation: '动画'
}
const navigationModeList = {
  accordionMode: '菜单手风琴模式'
}
</script>

<template>
  <SettingOutlined class="icon-btn" title="项目配置" @click="showDrawer" />
  <a-drawer
    v-model:open="open"
    class="project-configuration"
    root-class-name="root-class-name"
    title="项目配置"
    :closable="false"
    :footer-style="{ textAlign: 'right' }"
    placement="right"
  >
    <div class="project-configuration-content">
      <a-divider>主题</a-divider>
      <themeColor />
      <a-divider>界面显示</a-divider>
      <ul class="interface-display">
        <li v-for="(item, index) in interfaceDisplayList" :key="index">
          <span>{{ item }}</span>
          <a-switch v-model:checked="theme[index]" checked-children="开" un-checked-children="关" />
        </li>
      </ul>
      <a-divider>导航模式</a-divider>
      <ul class="interface-display">
        <li v-for="(item, index) in navigationModeList" :key="index">
          <span>{{ item }}</span>
          <a-switch
            v-model:checked="layout.layoutSetting[index]"
            checked-children="开"
            un-checked-children="关"
          />
        </li>
      </ul>
    </div>
    <template #footer>
      <a-button style="margin-right: 8px" @click="open = false">关闭</a-button>
    </template>
  </a-drawer>
</template>

<style lang="scss">
.project-configuration {
  @include appRegion(no-drag);
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
