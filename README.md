# webmount
一行命令让网站的静态资源请求指向本地目录。

## 安装
`npm install webmount -g`

## 使用
1. 挂载目录
`webmount -h yourhost -p yourport`

2. 添加host
`webmount host -d yourdomain -i yourip`

3. 查看host列表
`webmount ls`

4. 重置代理设置
`webmount reset`
 
## 例子

### webmount -h
`cd hellopao/dist`

`webmount -h hellopao.com`

所有hellopao.com请求的静态资源文件将会指向hellopao/dist目录，如果文件不存在，再将请求转到实际服务器。

### webmount -h -p 
`cd hellopao/dist`

`webmount -h hellopao.com -p 8888`

所有hellopao.com:8888请求的静态资源文件将会指向hellopao/dist目录，如果文件不存在，再将请求转到实际服务器。

### webmount -h -r
`cd hellopao/dist`

`webmount -h hellopao.com -r v1`

所有hellopao.com请求的静态资源文件将会指向hellopao/dist/v1目录，如果文件不存在，再将请求转到实际服务器。

## 原理
1. 修改系统http代理(windows上通过修改注册表实现)
2. 创建http服务器
3. 处理资源请求
