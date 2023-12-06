<script lang="ts" setup>
import { useLogin, getUserPhoneCode } from '@/api/login'
import { useAppStore } from '@/stores/userInfo'
import { validatorMobile } from '@/utils/validator'
import { UserOutlined, LockOutlined, PhoneOutlined } from '@ant-design/icons-vue'
import type { FormInstance } from 'ant-design-vue'
const formPhoneRef = ref<FormInstance>()
const formForgotRef = ref<FormInstance>()
const app = useAppStore()
const router = useRouter()
const { VITE_GLOB_WEB_NAME, VITE_GLOB_WEB_TITLE, VITE_CAPTCHA_ID } = import.meta.env
const formState = reactive({
  loginType: 'formPassData',
  type: [{ name: '手机登录', type: 'formPhoneData' }],
  formPassData: {
    formLabel: [
      {
        name: 'username',
        field: 'username',
        rules: [{ required: true, message: '请输入您的账号！' }],
        prefix: UserOutlined,
        placeholder: '账号',
        show: true,
        autofocus: true,
        type: 'text'
      },
      {
        name: 'password',
        field: 'password',
        rules: [{ required: true, message: '请输入您的密码！' }],
        prefix: LockOutlined,
        placeholder: '密码',
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
        name: 'phone',
        field: 'phone',
        rules: [
          { required: true, message: '请输入您的手机号！' },
          { validator: validatorMobile, trigger: 'change' }
        ],
        prefix: PhoneOutlined,
        placeholder: '手机号',
        show: true,
        autofocus: true,
        type: 'text'
      },
      {
        name: 'code',
        field: 'code',
        rules: [{ required: true, message: '请输入验证码！' }],
        prefix: LockOutlined,
        placeholder: '验证码',
        show: true,
        suffix: {
          type: 'code',
          size: 'small',
          loading: false,
          countdown: ''
        }
      }
    ],
    data: {
      phone: '13888888888',
      code: '123456'
    }
  },
  formForgotData: {
    formLabel: [
      {
        name: 'username',
        field: 'username',
        rules: [{ required: true, message: '请输入您的账号！' }],
        prefix: UserOutlined,
        placeholder: '账号',
        show: true,
        autofocus: true,
        type: 'text'
      },
      {
        name: 'phone',
        field: 'phone',
        rules: [
          { required: true, message: '请输入您的手机号！' },
          { validator: validatorMobile, trigger: 'change' }
        ],
        prefix: PhoneOutlined,
        placeholder: '手机号',
        show: true,
        autofocus: true,
        type: 'text'
      },
      {
        name: 'code',
        field: 'code',
        rules: [{ required: true, message: '请输入验证码！' }],
        prefix: LockOutlined,
        placeholder: '验证码',
        show: true,
        suffix: {
          type: 'code',
          size: 'small',
          loading: false,
          countdown: ''
        }
      }
    ],
    data: {
      username: 'admin',
      phone: '13999999999',
      code: '123456'
    }
  }
})
const loading = ref<boolean>(false)
const changeLogin = (type: string) => {
  formState.loginType = type
}
const sendCode = () => {
  const loginType = formState.loginType
  let formRef
  switch (loginType) {
    case 'formPhoneData':
      formRef = formPhoneRef.value
      break
    case 'formForgotData':
      formRef = formForgotRef.value
      break
  }
  formRef
    .validateFields(['phone'], (err, values) => {
      if (err) return
    })
    .then((data) => {
      const {
        // 发送状态
        loading: sending,
        countdown,
        send: sendCodes
      } = getUserPhoneCode({ type: loginType })
      sendCodes()
      const code = formState[formState.loginType].formLabel.find((item) => item.field == 'code')
      code.suffix.loading = loading
      code.suffix.countdown = countdown
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
        const { data, onSuccess } = useLogin(result)
        onSuccess(() => {
          if (data.value.code == 200) {
            app.token = 'success'
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
    <themeColor class="-enter-x -enter-right-x" />
    <div class="container">
      <div class="container-left">
        <div class="app-logo-content -enter-x -enter-left-x">
          <img src="../../assets/images/logo.webp" class="app-logo" alt="Logo" />
          <div class="app-logo-title">{{ VITE_GLOB_WEB_NAME }}</div>
        </div>
        <div class="my-auto -enter-x -enter-left-x">
          <img alt="Admin" src="../../assets/svg/login-box-bg.svg" />
          <div class="text size">
            {{ VITE_GLOB_WEB_TITLE }}
          </div>
          <div class="text">— “{{ VITE_GLOB_WEB_NAME }}”业务中台 —</div>
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
              <div class="login-title">登录</div>
            </a-form-item>
            <FormItems v-bind="formState.formPassData" />
            <a-form-item>
              <div class="login-form-check-forgot">
                <a-form-item name="remember" no-style>
                  <a-checkbox v-model:checked="formState.formPassData.data.remember"
                    >记住我</a-checkbox
                  >
                </a-form-item>
                <a-button type="link" @click="changeLogin('formForgotData')">忘记密码？</a-button>
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
                登录
              </a-button>
            </a-form-item>
            <a-form-item>
              <div class="login-form-check">
                <a-button
                  v-for="item in formState.type"
                  :key="item.name"
                  @click="changeLogin(item.type)"
                  size="medium"
                  >{{ item.name }}</a-button
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
              <div class="login-title">手机登录</div>
            </a-form-item>
            <FormItems v-bind="formState.formPhoneData" @send-code="sendCode" />
            <a-form-item>
              <a-button
                type="primary"
                :loading="loading"
                html-type="submit"
                class="login-form-button"
                id="captcha"
              >
                登录
              </a-button>
            </a-form-item>
            <a-form-item>
              <a-button class="return-form-button" @click="formState.loginType = 'formPassData'">
                返回
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
              <div class="forgot-title">重置密码</div>
            </a-form-item>
            <FormItems v-bind="formState.formForgotData" @send-code="sendCode" />
            <a-form-item>
              <a-button
                type="primary"
                :loading="loading"
                html-type="submit"
                class="forgot-form-button"
                id="captcha"
              >
                登录
              </a-button>
            </a-form-item>
            <a-form-item>
              <a-button class="return-form-button" @click="formState.loginType = 'formPassData'">
                返回
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
  .theme-color {
    top: 1rem;
    right: 1rem;
    position: absolute;
  }
  .container {
    display: flex;
    padding: 2rem 6rem;
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
          color: #fff;
        }
        .size {
          font-size: 1.6rem;
        }
      }
    }
    .container-right {
      padding: 10rem;
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
html[data-dark='dark'] .w-login {
  &:before {
    background-image: url('../../assets/svg/login-bg-dark.svg');
  }
}
</style>
