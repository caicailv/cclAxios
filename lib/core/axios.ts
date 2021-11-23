import {
  AxiosRequestConfig,
  Fulfied,
  Rejected,
} from '../types/index'
import InterceptorManager from './InterceptorManager'
import xhr from '../xhr'

type interceptorsType<T> = {
  fulfiled: Fulfied<T>
  rejected: Rejected | null
}

// (Fulfied<AxiosRequestConfig> | Rejected | null)[]
export default class Axios {
  defaultConfig: AxiosRequestConfig
  interceptors: {
    request: InterceptorManager<AxiosRequestConfig>
    response: InterceptorManager<AxiosRequestConfig>
  }
  constructor(defaultConfig: AxiosRequestConfig) {
    this.defaultConfig = defaultConfig
    this.interceptors = {
      request: new InterceptorManager(),
      response: new InterceptorManager(),
    }
  }
  request(url: any, config?: any) {
    if (typeof url === 'string') {
      config = config || {}
      config.url = url
    } else {
      config = url
    }
    config = { ...this.defaultConfig, ...config }
    // 处理拦截器, 构造promise数组
    let interceptors: interceptorsType<any>[] = [
      {
        fulfiled: xhr,
        rejected: null,
      },
    ]
    // 取出请求拦截器
    this.interceptors.request.forEach(({ fulfiled, rejected }) => {
      interceptors.unshift({ fulfiled, rejected })
    })
    this.interceptors.response.forEach(({ fulfiled, rejected }) => {
      interceptors.push({ fulfiled, rejected })
    })
    let promise = Promise.resolve(config)
    while (interceptors.length) {
      const { fulfiled, rejected } = interceptors.shift()
      promise = promise.then(fulfiled, rejected)
    }
    return promise
  }
  get(url: string, config?: AxiosRequestConfig) {
    return this.request(url, { ...config, method: 'get' })
  }
  post(url: string, config?: AxiosRequestConfig) {
    return this.request(url, { ...config, method: 'post' })
  }
}
