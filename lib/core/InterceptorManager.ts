import { AxiosRequestConfig, Fulfied, Rejected } from '../types'
interface Interceptor<T> {
  fulfiled: Fulfied<T>
  rejected?: Rejected
}
export default class InterceptorManager<T> {
  handlers: Array<Interceptor<T>>
  constructor() {
    this.handlers = []
  }
  use(fulfiled: Fulfied<T>, rejected?: Rejected) {
    this.handlers.push({ fulfiled, rejected })
    return this.handlers.length - 1
  }
  forEach(fn: (handler: Interceptor<T>) => void) {
    this.handlers.forEach(fn)
  }
  // eject()
}
