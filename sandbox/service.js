const fs = require('fs')
const url = require('url')
const path = require('path')
const http = require('http')
let server

function pipeFileToResponse(res, file, type) {
  if (type) {
    res.writeHead(200, {
      'Content-Type': type,
    })
  }

  fs.createReadStream(path.join(__dirname, file)).pipe(res)
}

function handleApi(req, res) {
  let status
  let result
  let data = ''
  req.on('data', function (chunk) {
    data += chunk
  })
  req.on('end', function () {
    try {
      status = 200
      result = {
        url: req.url,
        data: data ? JSON.parse(data) : undefined,
        method: req.method,
        headers: req.headers,
      }
    } catch (e) {
      console.error('Error:', e.message)
      status = 400
      result = {
        error: e.message,
      }
    }

    setTimeout(() => {
      res.writeHead(status, {
        'Content-Type': 'application/json',
      })
      res.end(JSON.stringify(result))
    }, 1000);
  })
}

// 创建http服务
server = http.createServer((req, res) => {
  req.setEncoding('utf8')
  res.setHeader('Access-Control-Allow-Origin', '*')
  const parsed = url.parse(req.url, true)
  const pathname = parsed.pathname
  if (pathname === '/') return pipeFileToResponse(res, './index.html')
  if (pathname === '/dist/axios.js')
    return pipeFileToResponse(res, '../dist/axios.js', 'text/javascript')

  if (pathname === '/axios.min.js')
    return pipeFileToResponse(res, '../axios.min.js', 'text/javascript')
  if (pathname.includes('/api')) return handleApi(req, res)
  res.writeHead(404)
  res.end('<h1>404 Not Found</h1>')
})
const port = 3000
const cmdMsg = `服务已启动
http://localhost:${port}
http://localhost:${port}/b.html
http://localhost:${port}/c.html
`

server.listen(port, () => {
  console.log(cmdMsg)
})
server.on('error', (err) => {
  if (error.code === 'EADDRINUSE') {
    console.log(`当前端口 localhost:${port} 已被占用,无法启动`)
    server.close()
  } else {
    console.log('服务错误,', err)
  }
})
