//引入express框架
const express = require('express');

//引入controller层
const { userLogin } = require('../controller/userCtrl');

//使用express 的 Router 方法创建路由
const userRouter = express.Router();

//创建具体路由
userRouter.post('/login',userLogin);

//导出路由
module.exports = userRouter;