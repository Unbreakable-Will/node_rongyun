// IMLib SDK初始化
var im = RongIMLib.init({
  appkey: "cpj2xarlchlzn",
});

let token =
  getQueryVariable("token") + "=@sw4u.cn.rongnav.com;sw4u.cn.rongcfg.com";

// 按需调用各模块实例 API

// 设置监听
var conversationList = []; // 当前已存在的会话列表
im.watch({
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
  message: function (event) {
    var message = event.message;
    console.log("收到新消息", message);
  },
  status: function (event) {
    var status = event.status;
    switch (status) {
      case RongIMLib.CONNECTION_STATUS.CONNECTED:
        console.log("链接成功");
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

//连接接口
let user = {
  token: token,
};

im.connect(user)
  .then(function (user) {
    console.log("链接成功, 链接用户 id 为: ", user.id);
    joinChatRoom();
    getChatRoomMessages();
    getChatRoomInfo();
  })
  .catch(function (error) {
    console.log("链接失败: ", error.code, error.msg);
  });

//聊天室模块初始化
let chatRoom = im.ChatRoom.get({
  id: getQueryVariable("meetingId"),
});

/**
 *  加入聊天室
 */
function joinChatRoom() {
  chatRoom
    .join({
      count: 20, // 进入后, 自动拉取 20 条聊天室最新消息
    })
    .then(function () {
      console.log("加入聊天室成功");
    });
}
// 发送消息,在metting里面写了
// $("#userText").keypress(function (e) {
//   if (e.keyCode == 13) {
//     $(this).val();
//     // sendChatRoom("123");
//   }
// });

/**
 *
 * @param {string} userText  发送的文本内容
 */
function sendChatRoom(userText) {
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
 * 得到聊天室的历史消息
 */
function getChatRoomMessages() {
  var option = {
    timestrap: +new Date(),
    count: 20,
  };
  chatRoom.getMessages(option).then(function (result) {
    var list = result.list; // 历史消息列表
    var hasMore = result.hasMore; // 是否还有历史消息可以获取
    console.log("获取聊天室历史消息成功", list, hasMore);
  });
}
/**
 *得到聊天室人员信息
 */
function getChatRoomInfo() {
  chatRoom.getInfo().then(function (result) {
    var userCount = result.userCount;
    var userInfos = result.userInfos;
    console.log("获取聊天室信息成功", userCount, userInfos);
  });
}

//#endregion

//#region  函数方法存放
/**
 *
 * @param {string} variable 传入网页参数
 */
function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) {
      return pair[1];
    }
  }
  return false;
}
//#endregion