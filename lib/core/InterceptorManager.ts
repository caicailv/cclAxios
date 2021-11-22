import { Fulfied, Rejected } from '../types'

interface Interceptor<T> {
  resolved: Fulfied<T>
  rejected?: Rejected
}
export default class InterceptorManager {
  handlers = []
  constructor() {
    this.handlers = []
  }
  use(fulfiled = undefined, rejected = undefined) {
    this.handlers.push({ fulfiled, rejected })
  }
  forEach(fn) {
    this.handlers.forEach(fn)
  }
}
