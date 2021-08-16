// Node 中其实内置了一个模块：http，它是基于 net 模块开发的。已经把请求和响应的协议都处理好了，上层使用更佳方便
const http = require('http')
const fs = require('fs')

// 为了方便我们使用，它在内部封装提供了 request 和 response 对象
const server = http.createServer((req, res) => {
  // 请求对象，里面的数据基本上都是解析 HTTP 请求报文而来的a
  console.log(req.method)
  console.log(req.url)
  console.log(req.httpVersion)

  // 响应对象：提供了响应相关的 API
  // 它在内部会自动把你发送的数据包装为 HTTP 响应报文
  // res.end('hello world')

  // res.end(`
  // <!DOCTYPE html>
  // <html lang="en">
  // <head>
  //   <meta charset="UTF-8">
  //   <meta http-equiv="X-UA-Compatible" content="IE=edge">
  //   <meta name="viewport" content="width=device-width, initial-scale=1.0">
  //   <title>Document</title>
  // </head>
  // <body>
  //   <h1>hello world 你好世界</h1>
  // </body>
  // </html>
  // `)

  // 我设计一个规则：
  // /  给你首页
  // /foo 给你 data.json
  // /denglu 给你 login.html
  // 所谓的请求路径只不过是一个”标识“而已。

  const url = req.url

  if (url === '/') {
    // 发送一个文件（本质还是字符串）
    fs.readFile('./index.html', (err, data) => {
      if (err) {
        // 如果发送错误，说明该文件不存在，我应该告诉客户端没有这个资源
        // HTTP/1.1 404 NOTfOUND
        res.statusCode = 404
        res.end()
        return
      }
      console.log(data.toString())
      res.end(data) // 可以直接发送 Buffer 二进制数据，也可以发送字符串
    })
  } else if (url === '/denglu') {
    // 发送一个文件（本质还是字符串）
    fs.readFile('./login.html', (err, data) => {
      if (err) {
        // 如果发送错误，说明该文件不存在，我应该告诉客户端没有这个资源
        // HTTP/1.1 404 NOTfOUND
        res.statusCode = 404
        res.end()
        return
      }
      console.log(data.toString())
      res.end(data) // 可以直接发送 Buffer 二进制数据，也可以发送字符串
    })
  } else if (url === '/foo') {
    // 发送一个文件（本质还是字符串）
    fs.readFile('./data.json', (err, data) => {
      if (err) {
        // 如果发送错误，说明该文件不存在，我应该告诉客户端没有这个资源
        // HTTP/1.1 404 NOTfOUND
        res.statusCode = 404
        res.end()
        return
      }
      console.log(data.toString())
      res.end(data) // 可以直接发送 Buffer 二进制数据，也可以发送字符串
    })
  } else {
    res.statusCode = 404
    res.setHeader('Content-Type', 'text/plain; charset=utf8')
    res.end('没有数据')
  }
})

server.listen(4000, () => {
  console.log('http://localhost:4000/')
})
