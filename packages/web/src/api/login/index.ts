import request from '@/service'
import type { LoginBody } from './type'

export const getLogin = (data: LoginBody) => {
  return request<LoginBody>({
    url: '/user/login',
    method: 'post',
    data
  })
}
