import { CancelExecutor } from '../types'
import Cancel from './Cancel'

export default class CancelToken {
  reason?: Cancel
  listener: any[] | undefined
  constructor(executor: CancelExecutor) {
    executor((msg) => {
      setTimeout(() => {
        if (this.reason) return
        this.reason = new Cancel(msg)
        // 执行所有监听器
        if (!this.listener) return
        while (this.listener.length) {
          this.listener.shift()(this.reason)
        }
      }, 0)
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
  unsubscribe() {
    delete this.listener
    delete this.reason
  }
}
let b
let t = new CancelToken((c) => {
  b = c
})
