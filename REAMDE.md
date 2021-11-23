npm-run-all -> 启动多个NPM命令,可以选择并行或串行
microbundle -> 基于rollup的打包器

支持全局配置 create方法
允许设置超时时间
支持get post
支持取消请求
支持xhr
axios =>默认使用get
axios.get
axios.post



TS热知识



函数型接口
```ts
// 返回一个函数 参数是val类型是T,返回值是一个promise<T>或者正常的T
export interface Fulfied<T> {
  (val: T): T | Promise<T>
}
// 实现
     // 这种实现无法为参数提供约束
function name(val):Fulfied<string> {
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
