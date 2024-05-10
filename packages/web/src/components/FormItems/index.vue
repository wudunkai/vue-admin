<script setup lang="ts">
const { t } = useI18nLocale()
const props = defineProps({
  // 表单列表
  formLabel: {
    type: Array as PropType<any>,
    default: () => []
  },
  data: {
    type: Object,
    default: () => {}
  }
})
const formData = computed(() => props.data)
const emit = defineEmits(['send-captcha', 'change-select'])
const changeSelect = (value: string) => {
  emit('change-select', value)
}
const getTextI18n = (text: string) => {
  if (!text) return
  return t(text)
}
</script>

<template>
  <template v-for="item in formLabel" :key="item.field">
    <a-form-item
      v-if="item.show"
      :validateFirst="true"
      :label="getTextI18n(item.title)"
      :name="item.field"
      :rules="item.rules"
    >
      <a-input-password
        v-if="item.type == 'password'"
        v-model:value="formData[item.field]"
        :disabled="item.disabled"
        :placeholder="getTextI18n(item.placeholder)"
        :size="item.size"
        autocomplete="off"
      >
        <template #prefix>
          <component :is="item.prefix" />
        </template>
      </a-input-password>
      <a-select
        v-else-if="item.type == 'select'"
        v-model:value="formData[item.field]"
        :disabled="item.disabled"
        :placeholder="getTextI18n(item.placeholder)"
        :size="item.size"
        @change="changeSelect"
      >
        <a-select-option
          v-for="opt in item.options"
          :key="opt.value"
          :value="opt.value"
          :disabled="opt.disabled"
        >
          {{ opt.label }}
        </a-select-option>
      </a-select>
      <a-input
        v-else
        v-model:value="formData[item.field]"
        :disabled="item.disabled"
        :autofocus="item.autofocus"
        :placeholder="getTextI18n(item.placeholder)"
        :size="item.size"
        autocomplete="off"
      >
        <template #prefix>
          <component :is="item.prefix" />
        </template>
        <template #suffix v-if="item.suffix">
          <a-button
            v-if="item.suffix.type == 'captcha'"
            @click="emit('send-captcha')"
            :size="item.suffix.size"
            :loading="item.suffix.loading"
            :disabled="item.suffix.loading || item.suffix.countdown > 0"
            type="link"
          >
            {{
              item.suffix.loading
                ? $t('pages.login.captcha.sending')
                : item.suffix.countdown > 0
                ? `${item.suffix.countdown}${$t('pages.getCaptchaSecondText')}`
                : $t('pages.login.phoneLogin.getVerificationCode')
            }}</a-button
          >
        </template>
      </a-input>
      <template #error="{ errors }">
        {{ errors }}
        <!-- 当验证失败时，errors 数组包含错误信息 -->
        <div v-if="errors" style="color: red">
          <div v-for="error in errors" :key="error">{{ error }}</div>
        </div>
      </template>
    </a-form-item>
  </template>
</template>
