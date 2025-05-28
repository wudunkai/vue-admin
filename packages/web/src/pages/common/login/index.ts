import { useLoginApi, getUserPhoneCaptcha } from '@/api/login'
import { validatorMobile, validator } from '@/utils/validator'
import { UserOutlined, LockOutlined, PhoneOutlined } from '@ant-design/icons-vue'
import type { FormInstance } from 'ant-design-vue'

export function useLogin(){
  const app = useAppStore()
  const router = useRouter()
  const user = useUserStore()
  const { setLocale } = useI18nLocale()
  const { VITE_CAPTCHA_ID } = import.meta.env

  const loading = ref<boolean>(false)
  const formPhoneRef = ref<FormInstance>()
  const { layoutSetting } = storeToRefs(app)
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
    }
  })
  const handleClick = ({ key }: any)=> {
    setLocale(key)
  }
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
    }
    formRef
      .validateFields(['phone'], (err: any) => {
        if (err) return
      })
      .then(() => {
        const {
          // 发送状态
          loading,
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
          const { username, password } = formState[formState.loginType].data
          const result = gt.getValidate()
          Object.assign(result, { username, password })
          const { data, onSuccess }: any = useLoginApi(result)
          onSuccess(() => {
            if (data.value.code == 200) {
              user.accessToken = data.value.data.accessToken
              user.refreshToken = data.value.data.refreshToken
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
  return {
    loading,
    formPhoneRef,
    layoutSetting,
    formState,
    handleClick,
    changeLogin,
    sendCaptcha,
    onFinish
  }
}