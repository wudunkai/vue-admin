import { userAlova } from '@/api/index'
import { useRequest } from 'alova'
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
export const getUserDetail = (data: string) => {
  return useRequest(userAlova.Get(`/user/getUserDetail/${data}`))
}
