<script setup lang="ts">
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
const emit = defineEmits(['send-code'])
</script>

<template>
  <template v-for="item in formLabel" :key="item.field">
    <a-form-item v-if="item.show" :validateFirst="true" :name="item.name" :rules="item.rules">
      <a-input-password
        v-if="item.type == 'password'"
        v-model:value="formData[item.field]"
        :disabled="item.disabled"
        :placeholder="item.placeholder"
        :size="item.size"
        autocomplete="off"
      >
        <template #prefix>
          <component :is="item.prefix" />
        </template>
      </a-input-password>
      <a-input
        v-else
        v-model:value="formData[item.field]"
        :disabled="item.disabled"
        :autofocus="item.autofocus"
        :placeholder="item.placeholder"
        :size="item.size"
        autocomplete="off"
      >
        <template #prefix>
          <component :is="item.prefix" />
        </template>
        <template #suffix v-if="item.suffix">
          <a-button
            v-if="item.suffix.type == 'code'"
            @click="emit('send-code')"
            :size="item.suffix.size"
            :loading="item.suffix.loading"
            :disabled="item.suffix.loading || item.suffix.countdown > 0"
            type="link"
          >
            {{
              item.suffix.loading
                ? '发送中...'
                : item.suffix.countdown > 0
                ? `${item.suffix.countdown}后可重发`
                : '发送验证码'
            }}</a-button
          >
        </template>
      </a-input>
    </a-form-item>
  </template>
</template>
