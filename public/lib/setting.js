$(function () {
  // IMLib SDK初始化

  var appkey = "cpj2xarlchlzn";
  RongIMLib.RongIMClient.init(appkey);

  //状态监听器
  RongIMClient.setConnectionStatusListener({
    onChanged: function (status) {
      // status 标识当前连接状态
      switch (status) {
        case RongIMLib.ConnectionStatus.CONNECTED:
          console.log("链接成功");
          break;
        case RongIMLib.ConnectionStatus.CONNECTING:
          console.log("正在链接");
          break;
        case RongIMLib.ConnectionStatus.DISCONNECTED:
          console.log("断开连接");
          break;
        case RongIMLib.ConnectionStatus.KICKED_OFFLINE_BY_OTHER_CLIENT:
          console.log("其他设备登录, 本端被踢");
          break;
        case RongIMLib.ConnectionStatus.DOMAIN_INCORRECT:
          console.log("域名不正确, 请至开发者后台查看安全域名配置");
          break;
        case RongIMLib.ConnectionStatus.NETWORK_UNAVAILABLE:
          console.log("网络不可用, 此时可调用 reconnect 进行重连");
          break;
        default:
          console.log("链接状态为", status);
          break;
      }
    },
  });
  //消息监听器
  RongIMClient.setOnReceiveMessageListener({
    // 接收到的消息
    onReceived: function (message) {
      var messageContent = message.content;
      // 判断消息类型
      switch (message.messageType) {
        case RongIMClient.MessageType.TextMessage: // 文字消息
          console.log("文字内容", messageContent.content);
          break;
        case RongIMClient.MessageType.ImageMessage: // 图片消息
          console.log("图片缩略图 base64", messageContent.content);
          console.log("原图 url", messageContent.imageUri);
          break;
        case RongIMClient.MessageType.HQVoiceMessage: // 音频消息
          console.log("音频 type ", messageContent.type); // 编解码类型，默认为 aac 音频
          console.log("音频 url", messageContent.remoteUrl); // 播放：<audio src={remoteUrl} />
          console.log("音频 时长", messageContent.duration);
          break;
        case RongIMClient.MessageType.RichContentMessage: // 富文本(图文)消息
          console.log("文本内容", messageContent.content);
          console.log("图片 base64", messageContent.imageUri);
          console.log("原图 url", messageContent.url);
          break;
        case RongIMClient.MessageType.UnknownMessage: // 未知消息
          console.log("未知消息, 请检查消息自定义格式是否正确", message);
          break;
        default:
          console.log("收到消息", message);
          break;
      }
    },
  });

  $.ajax({
    async: false,
    type: "post",
    url: "/user/getUserInfo",
    data: null,
    success: function (response) {
      console.log(response);
    },
  });

  var token =
    getQueryVariable("token") + "=@sw4u.cn.rongnav.com;sw4u.cn.rongcfg.com";

  //连接接口
  RongIMClient.connect(token, {
    onSuccess: function (userId) {
      console.log("连接成功, 用户 id 为", userId);
      // 连接已成功, 此时可通过 getConversationList 获取会话列表并展示
      // 加入聊天室  通过url获取
      //   joinChatRoom(getQueryVariable("meetingId"));
    },
    onTokenIncorrect: function () {
      console.log("连接失败, 失败原因: token 无效");
    },
    onError: function (errorCode) {
      var info = "";
      switch (errorCode) {
        case RongIMLib.ErrorCode.TIMEOUT:
          info = "链接超时";
          break;
        case RongIMLib.ConnectionState.UNACCEPTABLE_PAROTOCOL_VERSION:
          info = "不可接受的协议版本";
          break;
        case RongIMLib.ConnectionState.IDENTIFIER_REJECTED:
          info = "appkey 不正确";
          break;
        case RongIMLib.ConnectionState.SERVER_UNAVAILABLE:
          info = "服务器不可用";
          break;
        default:
          info = errorCode;
          break;
      }
      console.log("连接失败, 失败原因: ", info);
    },
  });

  //#region 融云方法存放
  /**
   *
   *
   * @param {string} chatRoomId 传入字符串 加入聊天
   */
  function joinChatRoom(chatRoomId) {
    // var chatRoomId = "2312asd";
    var count = 10;
    RongIMClient.getInstance().joinChatRoom(chatRoomId, count, {
      onSuccess: function () {
        console.log("加入聊天室成功:", chatRoomId);
      },
      onError: function (error) {
        console.log("加入聊天室失败", error);
      },
    });
  }
  /**
   *
   *
   * @param {string} chatRoomId 退出聊天室
   */
  function exitChatRoom(chatRoomId) {
    RongIMClient.getInstance().quitChatRoom(chatRoomId, {
      onSuccess: function () {
        console.log("退出聊天室成功");
      },
      onError: function (error) {
        console.log("退出聊天室失败");
      },
    });
  }
  /**
   *聊天室消息发送
   *
   */
  function sendMessageToChatroom() {
    var content = {
      content: "hello，time：" + new Date().getTime(),
      extra: "RongCloud",
    };

    var conversationType = RongIMLib.ConversationType.CHATROOM; // 私聊
    var msg = new RongIMLib.TextMessage(content);

    var start = new Date().getTime();
    instance.sendMessage(conversationType, chatRoomId, msg, {
      onSuccess: function (message) {
        showResult("发送聊天室消息成功", message, start);
      },
      onError: function (errorCode, message) {
        showResult("发送聊天室消息失败", message, start);
      },
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
});

