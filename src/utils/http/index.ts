/*
 * @Author: 朽木白
 * @Date: 2023-02-06 11:02:58
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-02-07 11:51:39
 * @Description: axios请求封装
 */
import axios from 'axios'
import type {
  AxiosInstance,
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios'
import { ElMessage } from 'element-plus'
import { localGet } from '../cache'
import { TOKEN_KEY } from '../../enums/cacheEnum'

const service: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 25000,
})

/**
 * @description: 请求拦截器
 * @returns {*}
 */
service.interceptors.request.use(
  (config) => {
    const token = localGet(TOKEN_KEY)
    if (token) {
      config.headers.Authorization = `${token}`
    }
    return config
  },
  (error: AxiosError) => {
    ElMessage.error(error.message)
    return Promise.reject(error)
  },
)
/**
 * @description: 响应拦截器
 * @returns {*}
 */
service.interceptors.response.use(
  (response: AxiosResponse) => {
    const { code, message, data } = response.data

    // 根据自定义错误码判断请求是否成功
    if (code === 20000 || code === 200) {
      // 将组件用的数据返回
      return data
    } else {
      // 处理业务错误。
      ElMessage.error(message || 'Error')
      // return Promise.reject(new Error(message))
    }
  },
  (error: AxiosError) => {
    // 处理 HTTP 网络错误
    let message = ''
    // HTTP 状态码
    const status = error.response?.status
    switch (status) {
      case 401:
        message = 'token 失效，请重新登录'
        break
      case 403:
        message = '拒绝访问'
        break
      case 404:
        message = '请求地址错误'
        break
      case 500:
        message = '服务器故障'
        break
      default:
        message = '网络连接故障'
    }

    ElMessage.error(message)
    return Promise.reject(error)
  },
)

/**
 * @description: 导出封装的请求方法
 * @returns {*}
 */
const http = {
  get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return service.get(url, config)
  },

  post<T = any>(
    url: string,
    data?: object,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    return service.post(url, data, config)
  },

  put<T = any>(
    url: string,
    data?: object,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    return service.put(url, data, config)
  },

  delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return service.delete(url, config)
  },
}

export default http
