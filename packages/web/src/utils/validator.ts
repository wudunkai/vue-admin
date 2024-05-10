import type { Rule } from 'ant-design-vue/es/form'
const { t } = useI18nLocale()
// 校验手机号
export const validatorMobile = async (_rule: Rule, value: string | undefined) => {
  if (typeof value !== 'string' || !/^1[3|4|5|7|8][0-9]{9}$/.test(value)) {
    return Promise.reject(t('pages.login.phoneNumber.invalid'))
  } else {
    return Promise.resolve()
  }
}
interface extension {
  messages: string
}
// 校验
export const validator = async (_rule: Rule & extension, value: string | undefined) => {
  if (_rule?.messages && (typeof value !== 'string' || !value)) {
    return Promise.reject(t(_rule?.messages))
  } else {
    return Promise.resolve()
  }
}
