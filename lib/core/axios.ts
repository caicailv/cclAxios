import { AxiosPromise, AxiosRequestConfig } from '../types/index'
import InterceptorManager from './InterceptorManager'
import xhr from '../xhr'

export default class Axios {
  defaultConfig: AxiosRequestConfig
  interceptors: {
    request: InterceptorManager
    response: InterceptorManager
  }
  constructor(defaultConfig: AxiosRequestConfig) {
    this.defaultConfig = defaultConfig
    this.interceptors = {
      request: new InterceptorManager(),
      response: new InterceptorManager(),
    }
  }
  request(url: any, config?: any): AxiosPromise {
    if (typeof url === 'string') {
      config = config || {}
      config.url = url
    } else {
      config = url
    }
    config = { ...this.defaultConfig, ...config }

    // 构造拦截器数组
    let interceptors = []
    // 取出请求拦截器
    this.interceptors.request.forEach(()=>{
      interceptors.push()
    })
    return xhr(config)
  }
  get(url: string, config?: AxiosRequestConfig) {
    return this.request(url, { ...config, method: 'get' })
  }
  post(url: string, config?: AxiosRequestConfig) {
    return this.request(url, { ...config, method: 'post' })
  }
}
