<script lang="ts" setup>
import Icon from '@ant-design/icons-vue'
import { useLogin, getUserPhoneCaptcha } from '@/api/login'
import { validatorMobile, validator } from '@/utils/validator'
import { UserOutlined, LockOutlined, PhoneOutlined } from '@ant-design/icons-vue'
import type { FormInstance } from 'ant-design-vue'
const app = useAppStore()
const { layoutSetting } = storeToRefs(app)
const formPhoneRef = ref<FormInstance>()
const formForgotRef = ref<FormInstance>()
const user = useUserStore()
const router = useRouter()
const { locale, setLocale, t } = useI18nLocale()
function handleClick({ key }: any) {
  setLocale(key)
}
const { VITE_GLOB_WEB_NAME, VITE_CAPTCHA_ID } = import.meta.env
const formState: any = reactive({
  loginType: 'formPassData',
  type: [{ name: 'pages.login.phoneLogin.tab', type: 'formPhoneData' }],
  formPassData: {
    formLabel: [
      {
        field: 'username',
        rules: [{ validator, messages: 'pages.login.username.required' }],
        prefix: UserOutlined,
        placeholder: 'pages.login.username.placeholder',
        show: true,
        autofocus: true,
        type: 'text'
      },
      {
        field: 'password',
        rules: [{ validator, messages: 'pages.login.password.required' }],
        prefix: LockOutlined,
        placeholder: 'pages.login.password.placeholder',
        show: true,
        type: 'password'
      }
    ],
    data: {
      username: 'admin',
      password: '123456',
      remember: true
    }
  },
  formPhoneData: {
    formLabel: [
      {
        field: 'phone',
        rules: [{ validator: validatorMobile, trigger: 'change' }],
        prefix: PhoneOutlined,
        placeholder: 'pages.login.phoneNumber.placeholder',
        show: true,
        autofocus: true,
        type: 'text'
      },
      {
        field: 'captcha',
        rules: [{ validator, messages: 'pages.login.captcha.required' }],
        prefix: LockOutlined,
        placeholder: 'pages.login.captcha.placeholder',
        show: true,
        suffix: {
          type: 'captcha',
          size: 'small',
          loading: false,
          countdown: ''
        }
      }
    ],
    data: {
      phone: '13888888888',
      captcha: '123456'
    }
  },
  formForgotData: {
    formLabel: [
      {
        field: 'username',
        rules: [{ validator, messages: 'pages.login.username.required' }],
        prefix: UserOutlined,
        placeholder: 'pages.login.username.placeholder',
        show: true,
        autofocus: true,
        type: 'text'
      },
      {
        field: 'phone',
        rules: [{ validator: validatorMobile, trigger: 'change' }],
        prefix: PhoneOutlined,
        placeholder: 'pages.login.phoneNumber.placeholder',
        show: true,
        autofocus: true,
        type: 'text'
      },
      {
        field: 'captcha',
        rules: [{ validator, messages: 'pages.login.captcha.required' }],
        prefix: LockOutlined,
        placeholder: 'pages.login.captcha.placeholder',
        show: true,
        suffix: {
          type: 'captcha',
          size: 'small',
          loading: false,
          countdown: ''
        }
      }
    ],
    data: {
      username: 'admin',
      phone: '13999999999',
      captcha: '123456'
    }
  }
})
const loading = ref<boolean>(false)
const changeLogin = (type: string) => {
  formState.loginType = type
}
const sendCaptcha = () => {
  const loginType = formState.loginType
  let formRef: any
  switch (loginType) {
    case 'formPhoneData':
      formRef = formPhoneRef.value
      break
    case 'formForgotData':
      formRef = formForgotRef.value
      break
  }
  formRef
    .validateFields(['phone'], (err: any) => {
      if (err) return
    })
    .then(() => {
      const {
        // 发送状态
        loading: sending,
        countdown,
        send: sendCaptchas
      } = getUserPhoneCaptcha({ type: loginType })
      sendCaptchas()
      const captcha = formState[loginType].formLabel.find(
        (item: { field: string }) => item.field == 'captcha'
      )
      captcha.suffix.loading = loading
      captcha.suffix.countdown = countdown
    })
}
const onFinish = async () => {
  window.gt.showBox()
}
window.initGeetest4(
  {
    captchaId: VITE_CAPTCHA_ID,
    product: 'bind'
  },
  (gt: any) => {
    gt.appendTo('#captcha')
    gt.onReady(() => {
      window.gt = gt
    })
      .onSuccess(() => {
        loading.value = true
        const result = gt.getValidate()
        const { data, onSuccess }: any = useLogin(result)
        onSuccess(() => {
          if (data.value.code == 200) {
            user.token = 'success'
            router.push('/')
          }
          loading.value = false
        })
      })
      .onError(() => {
        window.gt.reset()
      })
  }
)
</script>

<template>
  <div class="w-login">
    <div class="-enter-x -enter-right-x login-top-setting">
      <a-dropdown>
        <icon class="icon-btn">
          <template #component>
            <CarbonLanguage />
          </template>
        </icon>
        <template #overlay>
          <a-menu :selected-keys="[locale]" @click="handleClick">
            <a-menu-item key="zh-CN">
              <template #icon>
                <span> 🇨🇳 </span>
              </template>
              简体中文
            </a-menu-item>
            <a-menu-item key="en-US">
              <template #icon>
                <span> 🇺🇸 </span>
              </template>
              English
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
      <ThemeType />
    </div>
    <div class="container">
      <div class="container-left">
        <div class="app-logo-content -enter-x -enter-left-x">
          <img :src="layoutSetting.logo" class="app-logo" alt="Logo" />
          <div class="app-logo-title">{{ VITE_GLOB_WEB_NAME }}</div>
        </div>
        <div class="my-auto -enter-x -enter-left-x">
          <img alt="Admin" src="../../assets/svg/login-box-bg.svg" />
          <div class="text">
            {{ t('pages.layouts.userLayout.title') }}
          </div>
        </div>
      </div>
      <div class="container-right">
        <div class="container-right-content">
          <a-form
            :model="formState.formPassData.data"
            class="login-form -enter-x -enter-right-x"
            size="large"
            @finish="onFinish"
            v-if="formState.loginType == 'formPassData'"
          >
            <a-form-item>
              <div class="login-title">{{ t('pages.login.accountLogin.tab') }}</div>
            </a-form-item>
            <FormItems v-bind="formState.formPassData" />
            <a-form-item>
              <div class="login-form-check-forgot">
                <a-form-item name="remember" no-style>
                  <a-checkbox v-model:checked="formState.formPassData.data.remember">{{
                    t('pages.login.rememberMe')
                  }}</a-checkbox>
                </a-form-item>
                <a-button type="link" @click="changeLogin('formForgotData')">
                  {{ t('pages.login.forgotPassword') }}</a-button
                >
              </div>
            </a-form-item>
            <a-form-item>
              <a-button
                type="primary"
                :loading="loading"
                html-type="submit"
                class="login-form-button"
                id="captcha"
              >
                {{ t('pages.login.submit') }}
              </a-button>
            </a-form-item>
            <a-form-item>
              <div class="login-form-check">
                <a-button
                  v-for="item in formState.type"
                  :key="item.name"
                  @click="changeLogin(item.type)"
                  size="medium"
                  >{{ t(item.name) }}</a-button
                >
              </div>
            </a-form-item>
          </a-form>
          <a-form
            :model="formState.formPhoneData.data"
            class="login-form -enter-x -enter-right-x"
            size="large"
            @finish="onFinish"
            ref="formPhoneRef"
            v-else-if="formState.loginType == 'formPhoneData'"
          >
            <a-form-item>
              <div class="login-title">{{ t('pages.login.phoneLogin.tab') }}</div>
            </a-form-item>
            <FormItems v-bind="formState.formPhoneData" @send-captcha="sendCaptcha" />
            <a-form-item>
              <a-button
                type="primary"
                :loading="loading"
                html-type="submit"
                class="login-form-button"
                id="captcha"
              >
                {{ t('pages.login.submit') }}
              </a-button>
            </a-form-item>
            <a-form-item>
              <a-button class="return-form-button" @click="formState.loginType = 'formPassData'">
                {{ t('pages.login.return') }}
              </a-button></a-form-item
            >
          </a-form>
          <a-form
            :model="formState.formForgotData.data"
            class="forgot-form -enter-x -enter-right-x"
            size="large"
            @finish="onFinish"
            ref="formForgotRef"
            v-else-if="formState.loginType == 'formForgotData'"
          >
            <a-form-item>
              <div class="forgot-title">{{ t('pages.reset.password.tab') }}</div>
            </a-form-item>
            <FormItems v-bind="formState.formForgotData" @send-captcha="sendCaptcha" />
            <a-form-item>
              <a-button
                type="primary"
                :loading="loading"
                html-type="submit"
                class="forgot-form-button"
                id="captcha"
              >
                {{ t('pages.login.submit') }}
              </a-button>
            </a-form-item>
            <a-form-item>
              <a-button class="return-form-button" @click="formState.loginType = 'formPassData'">
                {{ t('pages.login.return') }}
              </a-button></a-form-item
            >
          </a-form>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.w-login {
  position: relative;
  width: 100%;
  min-height: 100%;
  .login-top-setting {
    top: 1rem;
    right: 1rem;
    position: absolute;
    display: flex;
    align-items: center;
    .icon-btn {
      margin-right: 0.5rem;
      padding: 0.2rem;
    }
  }
  .container {
    display: flex;
    padding: 4rem 6rem 0 6rem;
    .container-left,
    .container-right {
      flex: 1;
    }
    .container-left {
      z-index: 9;
      .app-logo-content {
        display: flex;
        align-items: center;
        .app-logo {
          width: 3rem;
        }
        .app-logo-title {
          color: #fff;
          margin-left: 1rem;
          transition: all 0.5s;
          font-size: 1.8rem;
          font-weight: 700;
          line-height: normal;
        }
      }
      .my-auto {
        margin-top: 10rem;
        img {
          width: 23rem;
          margin-bottom: 1rem;
        }
        .text {
          margin-top: 2rem;
          font-weight: 500;
          line-height: 1.5rem;
          color: #fff;
        }
      }
    }
    .container-right {
      padding: 10rem 0;
      .container-right-content {
        padding: 1rem 5rem;
        .login-form,
        .forgot-form {
          .login-title,
          .forgot-title {
            font-weight: 700;
            font-size: 1.8rem;
          }
          .login-form-check-forgot {
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
          .login-form-button,
          .forgot-form-button,
          .return-form-button {
            width: 100%;
          }
        }
      }
    }
  }
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    margin-left: -48%;
    background-image: url('../../assets/svg/login-bg.svg');
    background-repeat: no-repeat;
    background-position: 100%;
    background-size: auto 100%;
  }
}
html[data-theme='dark'] .w-login {
  &:before {
    background-image: url('../../assets/svg/login-bg-dark.svg');
  }
}
</style>
