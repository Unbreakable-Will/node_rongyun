$(function () {
	
	  //用户刷新重新获取username: username, //用户自定义名称
  //   meetingId: meetingId, //加入的会议id
  $.ajax({
    async: false,
    type: "post",
    url: "/api/registered",
    data: {
      username: getQueryString("username"), //用户自定义名称
      meetingId: getQueryString("meetingId"),
    },
    success: function (response) {
      //   console.log(response);
      if (response.code == 200) {
      }
    },
  });

	
	
	
	
	
  //#region
  // 初始化融云 https://docs.rongcloud.cn/im/imlib/web-v3/init/
  var im = RongIMLib.init({
    appkey: "cpj2xarlchlzn",
  });
  //   console.log(im);
  var conversationList = []; // 当前已存在的会话列表

  //聊天室房间
  var chatRoom = im.ChatRoom.get({
    id: "1100",
  });
  //   console.log(getQueryString("meetingId"));
  //   用户加入的房间号
  //   chatRoom.id = getQueryString("meetingId");
  im.watch({
    //   conversation	Function	否	会话列表变化时触发
    conversation: function (event) {
      var updatedConversationList = event.updatedConversationList; // 更新的会话列表
      console.log("更新会话汇总:", updatedConversationList);
      console.log(
        "最新会话列表:",
        im.Conversation.merge({
          conversationList: conversationList,
          updatedConversationList: updatedConversationList,
        })
      );
    },
    // message	Function	否	接收消息时触发
    message: function (event) {
      var message = event.message;
      console.log("收到新消息", message);

      //这里是收到消息渲染数据用的
    },
    // status	Function	否	IM 链接状态变化时触发
    status: function (event) {
      var status = event.status;
      switch (status) {
        case RongIMLib.CONNECTION_STATUS.CONNECTED:
          console.log("链接成功");
          joinChatRoom();
          //   sendchatRoom();
          break;
        case RongIMLib.CONNECTION_STATUS.CONNECTING:
          console.log("正在连接中");
          break;
        case RongIMLib.CONNECTION_STATUS.DISCONNECTED:
          console.log("已主动断开连接");
          break;
        case RongIMLib.CONNECTION_STATUS.NETWORK_UNAVAILABLE:
          console.log("网络不可用"); // SDK 内部会自动进行重连
          break;
        case RongIMLib.CONNECTION_STATUS.SOCKET_ERROR:
          console.log("Socket 链接错误"); // SDK 内部会自动进行重连
          break;
        case RongIMLib.CONNECTION_STATUS.KICKED_OFFLINE_BY_OTHER_CLIENT:
          console.log("其他设备登录, 本端被踢"); // 己端被踢, 不可进行重连. 否则会造成多端循环互踢
          break;
        case RongIMLib.CONNECTION_STATUS.BLOCKED:
          console.log("链接断开, 用户已被封禁");
          break;
        default:
          console.log("链接状态变化为:", status);
          break;
      }
    },
  });
  //#endregion

  //   console.log(window.rongYunUserInfo);

  var user = {};

  //#region  链接接口
  $.ajax({
    //改同步函数
    async: false,
    type: "post",
    url: "/api/getUserInfo",
    data: {
      //传入url中的key
      url: getQueryString("meetingId"),
    },
    success: function (response) {
      //#region 数据格式
      // {
      //     code: 200,
      //     userId: 'KRGWVR44L',
      //     token: 'cvPamadv0uqFRrCmJSg5wEeecvrf3wREvRoYX7RLjn0=@sw4u.cn.rongnav.com;sw4u.cn.rongcfg.com',
      //     portrait: 'http://hd215.api.yesapi.cn/?s=Ext.Avatar.Show&app_key=BA6BBB3D9C90B515C6CAF6310D2BFFB4&nickname=%E5%8F%B6%E8%89%AF%E8%BE%B0',
      //     meetingId: '213213',
      //     username: '叶良辰'
      //   }
      //#endregion
      //   console.log(response);
      if (response.code == 200) {
        //保存token
        user.token = response.data.token;
        // 保存会议id
        chatRoom.id = response.data.meetingId;
        window.userInfo = response.data;
        // console.log(user);
      }
    },
  });

  //用户刷新页面获取token
  if (user == null) {
    user.token = window.userInfo.token;
  }

  //用户连接
  im.connect(user)
    .then(function (user) {
      console.log("链接成功, 链接用户 id 为: ", user.id);
    })
    .catch(function (error) {
      console.log("链接失败: ", error.code, error.msg);
    });

  //#endregion

  /**
   *加入聊天室
   *
   */
  function joinChatRoom() {
    chatRoom
      .join({
        count: 20, // 进入后, 自动拉取 20 条聊天室最新消息
      })
      .then(function () {
        console.log("加入聊天室成功:聊天室id", chatRoom.id);
      });
  }
  // 发送聊天室信息
  /**
   *
   *
   * @param {string} userText 用户输入的信息
   */
  function sendchatRoom(userText) {
    chatRoom
      .send({
        messageType: RongIMLib.MESSAGE_TYPE.TEXT, // 'RC:TxtMsg'
        content: {
          content: userText, // 发送文本内容
        },
      })
      .then(function (message) {
        console.log("发送文字消息成功", message);
      });
  }

  /**
   *
   * 得到url中的数值
   * @param {string} name 传入url中的key
   * @returns
   */
  function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
      return unescape(r[2]);
    }
    return null;
  }

  //用户输入文字

  $("#userText").keypress(function (e) {
    if (e.keyCode == 13) {
      sendchatRoom($(this).val());
      $(this).val("");
    }
  });
});
