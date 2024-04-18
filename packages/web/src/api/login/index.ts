import { userAlova } from '@/api/index'
import { useRequest } from 'alova'
import { useCaptcha } from '@alova/scene-vue'
import type { LoginBody, UserPhoneCaptchaBody } from './type'
export const useLogin = (data: LoginBody) => {
  return useRequest(
    userAlova.Post('/user/userLogin', data, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    })
  )
}
export const getUserPhoneCaptcha = (data: UserPhoneCaptchaBody) => {
  return useCaptcha(() =>
    userAlova.Post('/user/getUserPhoneCaptcha', data, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    })
  )
}
