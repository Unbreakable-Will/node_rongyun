const urlencode = require('urlencode');

//引入user模块
const {
  registered,
  createChatroom
} = require('../sdkConfig/user');

const {
  addCreateUser,
  findMeetingId,
  findMeetingUser,
  findCountUser
} = require('../model/userModel');

//导入方法
const {
  generateMixed,
  getTouXiang,
} = require('../config/func');


//导出方法
//创建会议
module.exports.userRegistered = (req, res) => {

  //用户注册
  //用户后台生成的userId
  let id = generateMixed(6);


  //得到用户头像
  getTouXiang(urlencode(req.body.username), function (touXiangURL) {
    //调用融云SDK获取Token
    registered(id, req.body.username, touXiangURL, function (result) {
      //继续生成onlyid
      let onlyid = generateMixed(6);
      result.onlyId = onlyid;
      result.meetingId = req.body.meetingId;
      result.username = req.body.username;

      //日期转换
      Date.prototype.Format = function (fmt) { // author: meizz
        var o = {
          "M+": this.getMonth() + 1, // 月份
          "d+": this.getDate(), // 日
          "h+": this.getHours(), // 小时
          "m+": this.getMinutes(), // 分
          "s+": this.getSeconds(), // 秒
          "q+": Math.floor((this.getMonth() + 3) / 3), // 季度
          "S": this.getMilliseconds() // 毫秒
        };
        if (/(y+)/.test(fmt))
          fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
          if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
      }

      result.createTime = new Date().Format("yyyy-MM-dd hh:mm:ss");;
      console.log(result);
      if (result.code == 200) {
        // 添加到数据库中
        addCreateUser(result, function (results) {
          console.log('添加成功');
        });
      }

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

      let meetingId = result.meetingId;
      // console.log(meetingId);
      // 保存到session中
      req.session.user = result;
      // 保存聊天室房间号同时创建
      req.session.user.chatRoom = createChatroom(meetingId);
      //session里面存的数据应该放到数据库里面的
      // 下面的/api/getUserInfo会请求数据库拿数据的
      // console.log(req.session);
      // console.log(result);
      return res.send(result);
    });

  });
}




//加入会议
module.exports.userJoins = (req, res) => {
  //获取数据
  let {
    meetingId
  } = req.body;

  //查询数据库  找到meetingId相同的会议
  findMeetingId(meetingId, (results) => {
    if (results) {
      return res.send({
        code: 200,
        msg: '加入成功',
      });
    } else {
      return res.send({
        code: 400,
        msg: '加入失败',
      });
    }
  });
}




//显示会议中人员列表
module.exports.showUsers = (req, res) => {
  //获取会议id
  let {
    meetingId
  } = req.query;


  //查询数据库中  所有meetingId相同的人员
  findMeetingUser(meetingId, function (users) {
    //查询数据库中 所有meetingId相同人员个数
    findCountUser(meetingId, function (count) {
      let list = {};
      list.users = users;
      list.count = count;
      console.log(list);
      return res.send({
        code: 200,
        msg: '人员数据获取成功',
        result: list
      })
    })
  })
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

  res.render("meeting.html");
}