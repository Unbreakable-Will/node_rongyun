//引入express框架
const express = require('express');

//引入controller层
const { userRegistered , getUserInfo , meetings } = require('../controller/userCtrl');

//使用express 的 Router 方法创建路由
const userRouter = express.Router();

//创建具体路由
userRouter.post('/api/registered',userRegistered);

// 获取用户数据
userRouter.post("/api/getUserInfo",getUserInfo);

//会议页面渲染
userRouter.get("/api/meeting", meetings);

//导出路由
module.exports = userRouter;