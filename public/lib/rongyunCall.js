var config = {
  timeout: 20000,
  RongIMLib: RongIMLib,
  RongRTC: RongRTC,
};
rongCallLib = RongCallLib.init(config);
console.log(rongCallLib);

var CallType = RongIMLib.VoIPMediaType;
var targetId = "user2";
var inviteUserIds = ["user2"];
var params = {
  // RongIMLib.ConversationType.PRIVATE,
  conversationType: RongIMLib.CONVERSATION_TYPE.PRIVATE,
  targetId: targetId,
  inviteUserIds: inviteUserIds,
  mediaType: CallType.MEDIA_VIDEO,
};
rongCallLib.call(params, function (error) {
  if (error) {
    console.error("发起通话失败", error);
  }
});