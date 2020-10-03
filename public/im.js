var appkey = "cpj2xarlchlzn"; //填入您的 appkey
var users = {
  1001: {
    token:
      "A2k0HQcZLwjA3u63CudScMhB+8Q4hCwQEvcqBbZwljQ=@sw4u.cn.rongnav.com;sw4u.cn.rongcfg.com", // 填入用 userId 为 1001 获取的 token
  },
  1002: {
    token:
      "oGyc1qIju3HA3u63CudScPdI1YbBYVObm8+izNoXvPI=@sw4u.cn.rongnav.com;sw4u.cn.rongcfg.com", // 填入用 userId 为 1002 获取的 token
  },
};

// 通过 url 选取用户
var queryString = location.search;
var userId = queryString.substring(1, queryString.length);
var token = users[userId].token;

// 可在融云开发者后台获取
RongIMLib.RongIMClient.init(appkey);

// 连接状态监听器
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
        console.log("其他设备登录");
        break;
      case RongIMLib.ConnectionStatus.DOMAIN_INCORRECT:
        console.log("域名不正确");
        break;
      case RongIMLib.ConnectionStatus.NETWORK_UNAVAILABLE:
        console.log("网络不可用");
        break;
    }
  },
});
// 消息监听器
RongIMClient.setOnReceiveMessageListener({
  onReceived: function (message) {
    console.log(message);
  },
});

// 开发者后台获取或 Server API
RongIMClient.connect(token, {
  onSuccess: function (userId) {
    console.log("Connect successfully. " + userId);
  },
  onTokenIncorrect: function () {
    console.log("token 无效");
  },
  onError: function (errorCode) {
    var info = "";
    switch (errorCode) {
      case RongIMLib.ErrorCode.TIMEOUT:
        info = "超时";
        break;
      case RongIMLib.ConnectionState.UNACCEPTABLE_PAROTOCOL_VERSION:
        info = "不可接受的协议版本";
        break;
      case RongIMLib.ConnectionState.IDENTIFIER_REJECTED:
        info = "appkey不正确";
        break;
      case RongIMLib.ConnectionState.SERVER_UNAVAILABLE:
        info = "服务器不可用";
        break;
    }
    console.log(info);
  },
});
