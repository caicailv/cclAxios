import { AxiosRequestConfig } from './types/index'
export default function axios({
  url,
  data = null,
  params,
  headers,
  method = 'GET',
  timeout,
  baseURL = '',
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
    request.open(method.toLowerCase(), baseURL + url, true)

    if (headers) {
      for (let key in headers) {
        if (data === null && key.toLowerCase() === 'content-type') {
          delete headers[key]
        } else {
          request.setRequestHeader(key, headers[key])
        }
      }
    }
    request.send(data)
  })
}
