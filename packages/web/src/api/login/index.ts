import { userAlova } from '@/api/index'
import { useRequest } from 'alova'
import { useCaptcha } from '@alova/scene-vue'
import type { LoginBody, UserPhoneCaptchaBody } from './type'
export const useLoginApi = (data: LoginBody) => {
  return useRequest(
    userAlova.Post('/user/userLogin', data, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    })
  )
}
export const updateToken = () => {
  const user = useUserStore()
  return useRequest(
    userAlova.Post('/user/updateToken', '', {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        Authorization: 'Bearer ' + user.refreshToken
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
