$(function () {
  let rongRTC = new RongRTC({
    // 开启调试模式，SDK 会向控制台输出日志，默认 false
    debug: true,
    // IM SDK 实例
    RongIMLib: RongIMLib,
  });
  // 按需调用各模块实例 API
  let { Room, Stream, Message, Device, Storage, StreamType } = rongRTC;

  var room = new Room({
    // 音视频房间 Id
    id: "213213", // 设置房间 id  为 test
    joined: function (user) {
      // user.id 加入房间
      console.log(user, "加入");
    },
    left: function (user) {
      // user.id 离开房间
      console.log(user, "离开");
    },
  });

  let stream = new Stream({
    /* 成员已发布资源，此时可按需订阅 */
    published: function (user) {
      stream.subscribe(user).then((user) => {
        let {
          id,
          stream: { tag, mediaStream },
        } = user;
        let node = document.createElement("video");
        node.srcObject = mediaStream;
        // 将 node 添加至页面或指定容器
      });
    },
    /* 成员已取消发布资源，此时需关闭流 */
    unpublished: function (user) {
      stream.unsubscribe(user);
    },
    /* 成员禁用摄像头时触发，此时需关闭视频流 */
    disabled: function (user) {
      stream.unsubscribe(user);
    },
    /* 成员启用摄像头时触发，此时需要重新打开视频流 */
    enabled: function (user) {
      stream.subscribe(user);
    },
    /* 成员禁用麦克风时触发 */
    muted: function (user) {},
    /* 成员禁用麦克风时触发，此时需要重新打开此成员声音 */
    unmuted: function (user) {
      stream.subscribe(user);
    },
  });
});
