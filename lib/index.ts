export default function axios(url, params) {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest()
    request.onreadystatechange = function () {
      if (!request || request.readyState !== 4) return
    }
    request.open('POST', url, true)
    request.setRequestHeader('Content-type', 'application/json')
    request.send()
  })
}
