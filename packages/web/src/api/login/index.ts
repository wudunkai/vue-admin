import { userAlova } from '@/api/index'
import { useRequest } from 'alova'
import { useCaptcha } from '@alova/scene-vue'
import type { LoginBody } from './type'
export const useLogin = (data: LoginBody) => {
  return useRequest(
    userAlova.Post('/user/userLogin', data, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    })
  )
}
export const getUserPhoneCode = (data: string) => {
  return useCaptcha(() =>
    userAlova.Post('/user/getUserPhoneCode', data, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    })
  )
}
