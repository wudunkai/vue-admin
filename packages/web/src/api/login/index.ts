import { userAlova } from '@/api/index'
import { useRequest } from 'alova'
import type { LoginBody } from './type'
export const useLogin = (data: LoginBody) => {
  return useRequest(
    userAlova.Post('/user/login', data, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    })
  )
}
