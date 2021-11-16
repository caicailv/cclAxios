import { AxiosRequestConfig } from './types/index'
export default function axios({
  url,
  data,
  params,
  header,
  method = 'GET',
  timeout,
}: AxiosRequestConfig) {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest()
    request.ontimeout = () => {
      reject('请求超时')
    }
    request.onreadystatechange = () => {
      if (!request || request.readyState !== 4) return
      const response = {
        data: JSON.parse(request.response),
        status: request.status,
        statusText: request.statusText,
      }
      resolve(response)
    }
    if (timeout) request.timeout = timeout
    request.open(method.toLowerCase(), url, true)
    
    
    
    
    request.setRequestHeader('Content-type', 'application/json')
    // request.send(JSON.stringify(params))
  })
}
