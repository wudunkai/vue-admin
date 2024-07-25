import { createAlova } from 'alova'
import VueHook from 'alova/vue'
import GlobalFetch from 'alova/GlobalFetch'
import { axiosRequestAdapter } from '@alova/adapter-axios'

// user alova instance
export const userAlova = createAlova({
  baseURL: import.meta.env.VITE_GLOB_API_URL,
  statesHook: VueHook,
  requestAdapter: GlobalFetch(),
  timeout: 2 * 60 * 1000,
  responded: (response) => {
    if (response.status === 500) {
      const error: any = new Error(response.statusText)
      error.name = response.status
      throw error
    }
    return response.json()
  }
})

// // order alova instance
// export const orderAlova = createAlova({
//   baseURL: 'https://api-order.alovajs.org',
//   statesHook: VueHook,
//   requestAdapter: GlobalFetch(),
//   async responded(method) {
//     method.config.headers.token = 'order token'
//   }
// })

// upload alova instance
export const uploadAlova = createAlova({
  baseURL: 'https://api-order.alovajs.org',
  statesHook: VueHook,
  requestAdapter: axiosRequestAdapter()
})
