import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from './types'
// import CancelToken from './cancel/CancelToken'
import Cancel from './cancel/Cancel'
export default function axios(config: AxiosRequestConfig): AxiosPromise {
  const {
    url,
    data = null,
    params,
    headers,
    method = 'GET',
    timeout,
    baseURL = '',
    cancelToken,
    withCredentials,
  } = config
  console.log('configh', config)
  return new Promise((resolve, reject) => {
    if (cancelToken) {
      cancelToken.subscribe((cancel: Cancel) => {
        reject(cancel.message || 'cancel_request')
      })
    }

    const request = new XMLHttpRequest()
    request.ontimeout = () => {
      reject('请求超时')
    }
    request.onreadystatechange = () => {
      if (!request || request.readyState !== 4) return
      let data = ''
      try {
        data = JSON.parse(request.response)
      } catch (error) {
        data = request.response
      }

      const response = {
        data,
        status: request.status,
        statusText: request.statusText,
        headers,
        config,
        request,
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
    if (withCredentials) {
      request.withCredentials = true
    }
    request.send(data)
    if (cancelToken) {
      // 直接取消请求
      cancelToken.subscribe((cancel: Cancel) => {
        request.abort()
        reject(cancel.message || 'cancel_request')
      })
    }
  })
}
