//创建 express 框架
const express = require("express");
const path = require("path");
const axios = require("axios");
const urlencode = require("urlencode");

//创建服务
const app = express();

//导入路由
const userRouter = require('./route/userRouter');
const connectRouter = require('./route/connectRouter');

app.use(express.static(path.join(__dirname,'public')));

//设置中间件
app.use(express.urlencoded({ extended : false }));


//端口号
const port = 80;

//挂载路由

//用户管理
app.use('/user',userRouter);
//连接管理
// app.use('/connect',connectRouter);


//监听指定端口  开启服务
app.listen(port, () => console.log(`Example app listening on port port!`));
