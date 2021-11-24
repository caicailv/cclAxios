export interface AxiosRequestConfig {
  url?: string
  method?: string
  data?: any
  params?: any
  headers?: any
  baseURL?: string
  timeout?: number
  cancelToken?: any
}

export interface AxiosResponse<T = any> {
  data: T
  status: number
  statusText: string
  headers: any
  config: AxiosRequestConfig
  request: any
}
export type Method = 'GET' | 'POST'

// export interface AxiosPromise<T = unknown> extends Promise<T> {}
export interface AxiosPromise<T = any> extends Promise<AxiosResponse<T>> {}

export interface Axios {
  request(config: AxiosRequestConfig): AxiosPromise
  get(url: string, config?: AxiosRequestConfig): AxiosPromise
  post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise
}

export interface Fulfied<T> {
  (val: T): T | Promise<T>
}

export interface Rejected {
  (reason: any): any
}
export interface Canceler {
  (message?: string): void
}
export interface CancelExecutor {
  (cancel: Canceler): void
}
