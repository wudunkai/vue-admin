import type { Rule } from 'ant-design-vue/es/form'
// 校验手机号
export const validatorMobile = async (_rule: Rule, value: string) => {
  const val = /^1[3|4|5|7|8][0-9]{9}$/.test(value)
  if (!val) {
    return Promise.reject('请填写正确手机号码')
  } else {
    return Promise.resolve()
  }
}
