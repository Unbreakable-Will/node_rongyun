// 融云call初始化
var config = {
  timeout: 20000,
  RongIMLib: RongIMLib,
  RongRTC: RongRTC,
};
rongCallLib = RongCallLib.init(config);

// 发起通话
// 您可以直接给 mediaType 赋值 （ MEDIA_AUDIO: 1, MEDIA_VEDIO: 2 ）

var targetId = "QMWBW1";
var inviteUserIds = ["DNNZDM"];
var CallType = {
  MEDIA_AUDIO: 1,
  MEDIA_VEDIO: 2,
};
var params = {
  conversationType: RongIMLib.CONVERSATION_TYPE.PRIVATE,
  targetId: targetId,
  inviteUserIds: inviteUserIds,
  mediaType: CallType.MEDIA_AUDIO,
};

rongCallLib.call(params, function (error) {
  if (error) {
    console.error("发起通话失败", error);
  }
});

// 视频监听;
var videoWatcher = function (result) {
  var type = result.type;
  var boxEl = document.getElementById("box");
  if (type === "added") {
    // 添加音视频节点
    var video = result.data;
    boxEl.appendChild(video);
  } else if (type === "removed") {
    // 删除对应音视频节点
    var video = result.data;
    boxEl.removeChild(video);
  } else if (type == "leave") {
    // 音视频结束, 清空所有音视频 UI
  }
};
rongCallLib.videoWatch(videoWatcher);
//消息监听
var commandWatcher = function (message) {
  var messageType = message.messageType;
  // 根据消息类型做对应处理
  console.log(messageType);
};
rongCallLib.commandWatch(commandWatcher);
