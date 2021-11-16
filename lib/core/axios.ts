export default function axios(url, params) {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest()
    request.ontimeout = () => {
      console.log('请求超时');
      reject('请求超时')
    }
    console.log('asd');
    request.onreadystatechange = () => {
      if (!request || request.readyState !== 4) return
      const response = {
        data: JSON.parse(request.response),
        status: request.status,
        statusText: request.statusText,
      }
      resolve(response)
    }
    request.timeout = 50
    request.open('GET', url, true)
    request.setRequestHeader('Content-type', 'application/json')
    request.send(JSON.stringify(params))
  })
}
