<script setup lang="ts">
import { SettingOutlined } from '@ant-design/icons-vue'
const app = useAppStore()
const { setLocale, t } = useI18nLocale()
const open = ref<boolean>(false)
const showDrawer = () => {
  open.value = true
}
const interfaceDisplayList = [
  { title: 'app.setting.colorGray', field: 'colorGray', type: 'switch', show: true },
  { title: 'app.setting.colorWeak', field: 'colorWeak', type: 'switch', show: true },
  {
    title: 'app.setting.lang',
    field: 'locale',
    type: 'select',
    show: true,
    size: 'small',
    options: [
      { label: '简体中文', value: 'zh-CN' },
      { label: 'English', value: 'en-US' }
    ]
  }
]
const navigationModeList = [
  {
    title: 'app.setting.content-width.accordionMode',
    field: 'accordionMode',
    type: 'switch',
    show: true
  }
]
const changeSelect = (key: string) => {
  setLocale(key)
}
const formItemLayout = computed(() => {
  return {
    labelAlign: 'left',
    labelCol: { span: 16 },
    wrapperCol: { span: 8 }
  }
})
</script>

<template>
  <SettingOutlined class="icon-btn" :title="t('app.setting.project')" @click="showDrawer" />
  <a-drawer
    v-model:open="open"
    class="project-configuration"
    root-class-name="root-class-name"
    :title="t('app.setting.project')"
    :closable="false"
    :footer-style="{ textAlign: 'right' }"
    placement="right"
  >
    <div class="project-configuration-content">
      <a-divider>{{ t('app.setting.topic') }}</a-divider>
      <themeColor />
      <a-divider>{{ t('app.setting.interfaceDisplay') }}</a-divider>
      <a-form class="form-setting" v-bind="formItemLayout">
        <FormItems
          :formLabel="interfaceDisplayList"
          :data="app.layoutSetting"
          @change-select="changeSelect"
        />
      </a-form>
      <a-divider>{{ t('app.setting.navigationMode') }}</a-divider>
      <a-form class="form-setting" v-bind="formItemLayout">
        <FormItems :formLabel="navigationModeList" :data="app.layoutSetting" />
      </a-form>
    </div>
    <template #footer>
      <a-button style="margin-right: 8px" @click="open = false">{{
        t('app.common.close')
      }}</a-button>
    </template>
  </a-drawer>
</template>

<style lang="scss">
.project-configuration {
  @include appRegion(no-drag);
}
</style>
