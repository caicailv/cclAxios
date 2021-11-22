import { AxiosPromise, AxiosRequestConfig } from '../types/index'
import xhr from '../xhr'
export default class Axios {
  defaultConfig: AxiosRequestConfig
  interceptors: any
  constructor(defaultConfig: AxiosRequestConfig) {
    this.defaultConfig = defaultConfig
    this.interceptors = {
      request: [],
      response: [],
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
    return xhr(config)
  }
  get(url: string, config?: AxiosRequestConfig) {
    return this.request(url, { ...config, method: 'get' })
  }
  post(url: string, config?: AxiosRequestConfig) {
    return this.request(url, { ...config, method: 'post' })
  }
}
