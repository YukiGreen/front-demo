当你输入：https://www.baidu.com/

浏览器会把这个请求解析为 HTTP 协议的语言报文发送给服务器：

```http
GET / HTTP/1.1
Host: www.baidu.com
Connection: keep-alive
Cache-Control: max-age=0
```

GET / HTTP/1.1：请求首行。

- GET：请求方法，常见的有 GET（获取）、POST（添加）、PUT（更新）、DELETE（删除）
- /：表示请求路径，所有的请求路径都以 / 开头，也就是域名后的部分
  - 比如 /a、/b、/login、/users/1、/users?id=10
- HTTP/1.1：使用的什么语言、以及语言的版本号

请求首行下面的是**请求首部字段**，不同的字段有不同的含义：

Host: www.baidu.com：告诉对方我访问的域名是什么
Connection: keep-alive：告诉对方我要进行长连接
Cache-Control: max-age=0：它是 HTTP 缓存相关的头部字段

如果有请求体（一般就是表单数据），那么请求方法对应就是 PUT、POST 之类的。请求体数据会和首部字段隔行放置。

```http
POST /login HTTP/1.1
Host: www.baidu.com
Connection: keep-alive
Cache-Control: max-age=0

# JSON 格式的请求体：application/json，常用于接口交互
{ "username": "admin", "password": 123456 }

# form-urlencoded 格式的请求体：application/x-www-form-urlencoded，常用于普通表单提交
username=admin&password=123456

# 带有文件的请求体：multipart/form-data
xxx
```

## HTTP 响应报文

服务器接收到客户端请求的 HTTP 请求报文后，解析处理，最后发送响应给客户端。

响应给客户端的数据也要使用 HTTP 协议。

举个例子：

```http
HTTP/1.1 200 OK
Server: Apache
Content-Length: 123
xxx: xxx
Content-Type: text/html

<h1>hello world</h1>  # HTMl格式的字符串、图片、JSON 数据、各种各样的数据
```

## 使用 Node 来构建一个简单的 HTTP 服务

> 可以是任何能够进行网络编程通信的后台，Java、Python、PHP、Node 等
