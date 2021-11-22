export interface AxiosRequestConfig {
  url?: string
  method?: string
  data?: any
  params?: any
  headers?: any
  baseURL?: string
  timeout?: number
}

export type Method = 'GET' | 'POST'

export interface AxiosPromise<T = unknown> extends Promise<T> {}

export interface Axios {
  request(config: AxiosRequestConfig): AxiosPromise
  get(url: string, config?: AxiosRequestConfig): AxiosPromise
  post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise
}

export interface Fulfied<T> {
  val: T | Promise<T>
}

export interface Rejected {
  error: any
}
