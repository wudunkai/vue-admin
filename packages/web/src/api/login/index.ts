import { useRequest } from '@/hooks'
import request from '@/service'
import type { IGetParams, IGetRes } from './type'

const getLogin = (data: IGetParams) => {
  return request<IGetParams, IGetRes>({
    url: '/api/user/login',
    method: 'post',
    data
  })
}

export const userLogin = (data: IGetParams) => {
  return useRequest<IGetParams>(getLogin, data)
}
