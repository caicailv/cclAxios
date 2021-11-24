import { CancelExecutor } from '../types'
interface ResolvePromise {
  (reason?: string): void
}
export default class CancelToken {
  promise: Promise<string>
  reason?: string
  listener: any[] | undefined
  constructor(executor: CancelExecutor) {
    let promiseResolve: ResolvePromise
    new Promise((resolve) => {
      promiseResolve = resolve
    }).then((res) => {})
    executor((message) => {
      if (this.reason) return
      this.reason = message
      promiseResolve(message)
    })
  }
  // 触发取消信号
  subscribe(fn) {
    if (this.listener) {
      this.listener.push(fn)
    } else {
      this.listener = [fn]
    }
  }

  // 如果请求已经完成,则删除所有监听
  unsubscribe() {}
}
let b
let t = new CancelToken((c) => {
  b = c
})

b('ggg')
// t.subscribe(()=>{

// })
