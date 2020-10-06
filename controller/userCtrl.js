const urlencode = require('urlencode');

//引入user模块
const {
  registered,
  createChatroom
} = require('../sdkConfig/user');
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
  //用户后台生成的userId
  let id = generateMixed(6);


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


      let user = {

        //用户唯一id
        onlyId: generateMixed(6),
        //状态码
        code: result.code,
        //加入会议ID
        meetingId: req.body.meetingId,
        //用户头像
        touXiang: touXiangURL,
        //token
        token: result.token,
        //融云返回的用户id
        userId: result.userId,
        //用户id
        username: req.body.username,
      }
      //添加到session中
      req.session.user = user;
      //发送 
      return res.send(user);
    });

  });


}


// 获取用户数据
module.exports.getUserInfo = (req, res) => {
  // console.log(req.session.user);
  let meetingId = req.body.url;
  // console.log(req.body.url);
  req.session.user.chatRoom = createChatroom(meetingId);
  // console.log(createChatroom(meetingId));
  // createChatroom(meetingId);
  res.send({
    code: 200,
    data: req.session.user,
  });
};

//会议页面渲染
module.exports.meetings = (req, res) => {
  // console.log(req.session.user);
  //添加到数据库中
  addUser(req.session.user, function (results) {
    console.log('添加成功');
  });
  res.render("meeting.html");
}