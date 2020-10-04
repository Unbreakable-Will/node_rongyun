const urlencode = require('urlencode');

//引入
const {
  getUserToken,
  registered
} = require('../sdkConfig/userConfig');
const {
  addUser
} = require('../model/userModel');
//导入方法
const {
  generateMixed,
  getTouXiang
} = require('../config/func');


//导出方法
//注册功能
module.exports.userRegistered = (req, res) => {

  //用户注册
  //用户唯一id
  let id = generateMixed(6);

  let user = {};

  //得到用户头像
  getTouXiang(urlencode(req.body.username), function (touXiangURL) {
    //调用融云SDK获取Token
    registered(id, req.body.username, touXiangURL, function (result) {

      // result = {
      //   code: 200, // 融云返回的code
      // meetingId: "520", //用户输入的加入会议id
      //   portrait: // 服务端生成的头像地址
      //     "http://hd215.api.yesapi.cn/?s=Ext.Avatar.Show&app_key=BA6BBB3D9C90B515C6CAF6310D2BFFB4&nickname=200",
      //   token: // 融云返回的token
      //     "O12AnPa03igWCFE7vnZRky3ir7Nea7Rlr3ujYgxfPJg=@sw4u.cn.rongnav.com;sw4u.cn.rongcfg.com",
      //   userId: "HWVMP4", // 融云返回的用户id
      //   username: "200", // 用户自己输入的用户id
      // };
      user = {
        //用户唯一id
        onlyId : id,
        //状态码
        code : result.code,
        //加入会议ID
        meetingId : req.body.meetingId,
        //用户头像
        touXiang: touXiangURL,
        //token
        token: result.token,
        //融云返回的用户id
        userId : result.userId,
        //用户id
        username: req.body.username,
      }

      // 将值添加到数据库中
      addUser(user, function (results) {
        console.log('添加成功');
      });

      res.send(result);
    });
  });


  //     id: 'ujadk90ha',
  //     name: 'Maritn',
  //     portrait: 'http://7xogjk.com1.z0.glb.clouddn.com/IuDkFprSQ1493563384017406982'


  // //创建对象
  // let user = {
  //     id: 'ujadk90ha',
  //     name: 'Maritn', 
  //     portrait: 'http://7xogjk.com1.z0.glb.clouddn.com/IuDkFprSQ1493563384017406982'
  // }

  // //调用函数 获取token
  // getUserToken(user,function(results){
  //     console.log(results);

  //     res.send('请求成功');
  // });
}