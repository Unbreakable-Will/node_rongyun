//创建 express 框架
const express = require("express");

//导入路由
const userRouter = require('./route/userRouter');
const connectRouter = require('./route/connectRouter');

//创建服务
const app = express();
//设置中间件
app.use(express.urlencoded({ extend : false }));


//端口号
const port = 5000;

//挂载路由

//用户管理
app.use('/user',userRouter);
//连接管理
app.use('/connect',connectRouter);


//监听指定端口  开启服务
app.listen(port, () => console.log(`Example app listening on port port!`));
