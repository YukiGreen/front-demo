const net = require('net') // Node 中专门用来 TCP 网络通信的模块

// 创建一个 TCP 服务器
const server = net.createServer((socket) => {
  // 当有客户端请求进来的时候会执行这里的回调函数
  // 任何客户端请求进来都会执行这里，但是不同的客户端的 socket 是不一样的
  // socket 只是一个名字，通常表示套接字，插座，连接线缆的窟窿眼儿
  // socket 是客户端
  // 通过 socket 我们可以拿到对方的来源位置：比如端口号、IP 地址之类的信息、或者使用 socket 给对方发送消息
  console.log('有客户端请求进来了')

  // 请求相关的数据对象，我们把请求报文中解析到的数据放到这个对象里面方便操作
  const request = {}

  // 响应相关的对象，我们会把处理响应消息相关的功能放到它里面
  const response = {}

  // 接收客户端请求报文数据
  // 我们不能一次性的拿到客户端请求的数据，因为客户端的发送的数据大小无法确定，所有必须通过流的方式来接收
  const data = []
  socket.on('data', chunk => { // 本次接收到的数据块
    data.push(chunk)
  })
  socket.on('end', () => { // 数据接收完毕会触发 end 事件
    const reqHttpMessage = data.toString() // 原始的 HTTP 请求报文
    // 为了方便处理，我们通常会单独把：请求方法、请求地址、请求头 解析出来
    const arr = reqHttpMessage.split('\r\n')
    const httpFirstLine = arr[0]
    const [
      method,
      path,
      httpVersion
    ] = httpFirstLine.split(' ')
    request.method = method
    request.path = path
    request.httpVersion = httpVersion

    console.log(request)
  })


  // 测试一下：不管对方说啥，我给你发一个响应
  // socket.end('hello world') // 这个不行，对方不会理解

  // 响应首行必须的，不能少，响应头部字段都是可短的
  socket.end(`
HTTP/1.1 200 OK
Server: Hello

hello world
`)
})

// 启动 TCP 服务
server.listen(4000, () => {
  console.log('启动成功', server.address())
})
