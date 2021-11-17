import { AxiosRequestConfig } from './types/index'
export default function axios({
  url,
  data = null,
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

    if (header) {
      for (let key in header) {
        if (data === null && key.toLowerCase() === 'content-type') {
          delete header[key]
        } else {
          request.setRequestHeader(key, header[key])
        }
      }
    }
    request.send(data)
  })
}
