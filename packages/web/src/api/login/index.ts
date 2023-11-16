import request from '@/service'
import { useRequest } from '@/hooks'
import type { LoginBody } from './type'
export const getLogin = (data: LoginBody) => {
  return request<LoginBody>({
    url: '/user/login',
    method: 'post',
    data
  })
}

export const useLogin = (data: LoginBody) => {
  return useRequest<LoginBody>(getLogin, data)
}
