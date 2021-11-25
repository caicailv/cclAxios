npm-run-all -> 启动多个 NPM 命令,可以选择并行或串行
microbundle -> 基于 rollup 的打包器

支持全局配置 create 方法
允许设置超时时间
支持 get post
支持取消请求
支持 xhr
支持 withCredentials
axios =>默认使用 get
axios.get
axios.post

axios 的拦截器,本质上是构造了一个 promise 数组,然后用一个 whire 循环,去执行数组中的 promise,完成了依次返回
axios的取消请求,本质上是一个发布订阅 在发现配置了取消请求选项时,
向listener队列中添加监听函数,则执行request.about()或者直接reject.如果在请求完成前,触发了回调,则执行这些监听器中的函数,实现取消请求

xhr.withCredentials 设置为true时,允许跨域携带cookie(也需要后端做相应配置才能接收)

TS 热知识

函数型接口

```ts
// 返回一个函数 参数是val类型是T,返回值是一个promise<T>或者正常的T
export interface Fulfied<T> {
  (val: T): T | Promise<T>
}
// 实现
// 这种实现无法为参数提供约束
function name(val): Fulfied<string> {
  return val
}
const bbb: Fulfied<string> = (a) => {
  return a
}

// 实现
export interface Full<T> {
  (val: T): T | Promise<T>
  aaa: string
}

function gg(val): Full<string> {
  return val
}
gg.aaa = 2
```
