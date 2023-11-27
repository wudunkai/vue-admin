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
            :model="formState"
            class="login-form -enter-x -enter-right-x"
            size="large"
            @finish="onFinish"
          >
            <a-form-item>
              <div class="login-title">登录</div>
            </a-form-item>
            <a-form-item name="username" :rules="[{ required: true, message: '请输入您的账号！' }]">
              <a-input v-model:value="formState.username" placeholder="账号">
                <template #prefix>
                  <UserOutlined class="site-form-item-icon" />
                </template>
              </a-input>
            </a-form-item>
            <a-form-item name="password" :rules="[{ required: true, message: '请输入您的密码！' }]">
              <a-input-password v-model:value="formState.password" placeholder="密码">
                <template #prefix>
                  <LockOutlined class="site-form-item-icon" />
                </template>
              </a-input-password>
            </a-form-item>
            <a-form-item>
              <div class="login-form-check-forgot">
                <a-form-item name="remember" no-style>
                  <a-checkbox v-model:checked="formState.remember">记住我</a-checkbox>
                </a-form-item>
                <router-link class="login-form-forgot" to="">忘记密码？</router-link>
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
          </a-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
// import waves from "@directives/waves";
import { useLogin, getUserDetail } from '@/api/login'
import { useAppStore } from '@/stores/userInfo'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
// const vWaves = waves;
const app = useAppStore()
const router = useRouter()
const { VITE_GLOB_WEB_NAME, VITE_GLOB_WEB_TITLE, VITE_CAPTCHA_ID } = import.meta.env
interface FormState {
  username: string
  password: string
  remember: boolean
}
const formState = reactive<FormState>({
  username: '',
  password: '',
  remember: false
})
getUserDetail(1)
const loading = ref<boolean>(false)
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
          if (data.value.success) {
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
        .login-form {
          .login-title {
            font-weight: 700;
            font-size: 1.8rem;
          }
          .login-form-check-forgot {
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
          .login-form-button {
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
