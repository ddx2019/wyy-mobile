/**
 * axios的二次封装
 */

import axios from 'axios'
import { Toast } from 'vant'

axios.defaults.timeout = 10000 //请求超时时间
axios.defaults.baseURL = 'http://localhost:3000/'

/**请求拦截器 */
axios.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

/**响应拦截器 */
axios.interceptors.response.use(
  (response) => {
    const res = response.data
    //根据返回的状态码 作出逻辑处理
    //.......
    if (res && res.code == 200) {
      return res
    }
  },
  (error) => {
    if (error.message.indexOf('timeout') != -1) {
      Toast('本次请求超时，请重试！')
    } else if (error.message.indexOf('503') != -1) {
      return Promise.reject(error)
    } else {
      Toast('系统请求异常')
    }
    return Promise.reject(error)
  }
)

export default axios
