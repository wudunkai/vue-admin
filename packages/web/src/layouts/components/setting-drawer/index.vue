<script setup lang="ts">
import Body from './body.vue'
import ThemeColor from './theme-color.vue'
import OtherSetting from './other-setting.vue'
import LayoutSetting from './layout-setting.vue'
import RegionalSetting from './regional-settings.vue'
const props = withDefaults(
  defineProps<{
    open?: boolean
    // theme?: ThemeType
    colorPrimary?: string
    colorList?: { key: string; color: string }[]
    // layout?: LayoutType
    // contentWidth?: ContentWidth
    keepAlive?: boolean
    accordionMode?: boolean
    leftCollapsed?: boolean
    colorWeak?: boolean
    colorGray?: boolean
    locale?: string
    localeList?: any[]
    animationName?: string
    animationNameList?: any[]
    layoutSetting?: Record<string, any>
    t?: (key: string, ...args: any[]) => string
  }>(),
  {
    theme: 'light',
    colorList: () => [
      { key: 'techBlue', color: '#1677FF' },
      { key: 'daybreak', color: '#1890ff' },
      { key: 'dust', color: '#F5222D' },
      { key: 'volcano', color: '#FA541C' },
      { key: 'sunset', color: '#FAAD14' },
      { key: 'cyan', color: '#13C2C2' },
      { key: 'green', color: '#52C41A' },
      { key: 'geekBlue', color: '#2F54EB' },
      { key: 'purple', color: '#722ED1' }
    ]
  }
)
const emit = defineEmits(['update:open', 'settingChange'])
function changeColor(color: string) {
  emit('settingChange', 'colorPrimary', color)
}
function handleVisible(open: boolean) {
  emit('update:open', open)
}
function changeSettingLayout(key: string, value: any) {
  emit('settingChange', key, value)
}
</script>

<template>
  <a-drawer
    :open="open"
    class="project-configuration"
    root-class-name="root-class-name"
    :title="t?.('app.setting.project')"
    :closable="false"
    @update:open="handleVisible"
    :footer-style="{ textAlign: 'right' }"
    placement="right"
  >
    <ScrollContainer>
      <div class="project-configuration-body">
        <a-divider>{{ t?.('app.setting.topic') }}</a-divider>
        <ThemeType />
        <Body :title="t?.('app.setting.themeColor') ?? '主题色'">
          <ThemeColor :t="t" :color-list="colorList" :color="colorPrimary" @change="changeColor" />
        </Body>
        <a-divider />
        <Body :title="t?.('app.setting.navigationMode')">
          <LayoutSetting
            :t="t"
            :keep-alive="keepAlive"
            :accordion-mode="accordionMode"
            :left-collapsed="leftCollapsed"
            @change-setting="changeSettingLayout"
          />
        </Body>
        <a-divider />
        <Body :title="t?.('app.setting.contentArea.title')">
          <RegionalSetting
            :t="t"
            :locale="locale"
            :locale-list="localeList"
            :animation-name="animationName"
            :animation-name-list="animationNameList"
            @change-setting="changeSettingLayout"
          />
        </Body>
        <a-divider />
        <Body :title="t?.('app.setting.otherSettings')">
          <OtherSetting
            :t="t"
            :color-weak="colorWeak"
            :color-gray="colorGray"
            @change-setting="changeSettingLayout"
          />
        </Body>
      </div>
    </ScrollContainer>
    <template #footer>
      <a-button style="margin-right: 8px" @click="changeSettingLayout('drawerVisible', false)">{{
        t?.('app.common.close')
      }}</a-button>
    </template>
  </a-drawer>
</template>

<style lang="scss">
.project-configuration {
  @include appRegion(no-drag);
  .ant-drawer-body {
    padding: 0px;
  }
  &-body {
    padding: 24px;
  }
}
</style>
