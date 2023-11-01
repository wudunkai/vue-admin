import request from './request'
import type { AxiosResponse } from 'axios'

import type { RequestConfig } from './request/types'

export interface Response<T> {
  statusCode: number
  desc: string
  result: T
}

// 重写返回类型
interface RequestConfigData<T, R> extends RequestConfig<Response<R>> {
  data?: T
}

const axios = new request({
  baseURL: import.meta.env.VITE_GLOB_API_URL,
  timeout: 1000 * 60 * 5,
  interceptors: {
    // 请求拦截器
    requestInterceptors: (config) => config,
    // 响应拦截器
    responseInterceptors: (result: AxiosResponse) => {
      return result
    }
  }
})

/**
 * @description: 函数的描述
 * @generic D 请求参数
 * @generic T 响应结构
 * @param {RequestConfigData} config 不管是GET还是POST请求都使用data
 * @returns {Promise}
 */
const Request = <D = any, T = any>(config: RequestConfigData<D, T>) => {
  const { method = 'GET' } = config
  if (method === 'get' || method === 'GET') {
    config.params = config.data
  }
  return axios.request<Response<T>>(config)
}
// // 取消请求
// export const cancelRequest = (url: string | string[]) => {
//   return request.cancelRequest(url)
// }
// // 取消全部请求
// export const cancelAllRequest = () => {
//   return request.cancelAllRequest()
// }

export default Request
