export interface AxiosRequestConfig {
  url?: string
  method?: string
  data?: any
  params?: any
  header?: any
  timeout?: number
}

export type Method = 'GET' | 'POST'

export interface AxiosPromise<T = unknown> extends Promise<T> {}

export interface Axios {
  request(config: AxiosRequestConfig): AxiosPromise
  get(url: string, config?: AxiosRequestConfig): AxiosPromise
  post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise
}
