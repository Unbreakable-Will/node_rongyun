let rongRTC = new RongRTC({
  // 开启调试模式，SDK 会向控制台输出日志，默认 false
  debug: true,
  // IM SDK 实例
  RongIMLib: RongIMLib,
});
// 按需调用各模块实例 API
let { Room, Stream, Message, Device, Storage, StreamType } = rongRTC;
// 根据 url 模拟选数据
var queryString = location.search;
var userId = queryString.substring(1, queryString.length);

var room = new Room({
  // 音视频房间 Id
  id: "test", // 设置房间 id  为 test
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
  // 成员已发布资源，此时可按需订阅
  published: function (user) {
    stream.subscribe(user).then((user) => {
      let {
        id,
        stream: { tag, mediaStream },
      } = user;
      // 订阅成功后会获取到对方媒体流，将媒体流添加到页面上的 video 节点即可展示对方音视频画面
      let node = document.createElement("video");
      node.autoplay = true;
      node.srcObject = mediaStream;
      node.id = id;
      document.body.appendChild(node);
    });
  },
  // 成员已取消发布资源，此时需关闭流
  unpublished: function (user) {
    // 当对方成员取消订阅后，会自动触发此函数，此时己方取消订阅对方音视频流，然后做页面移除对方 video 节点即可
    stream.unsubscribe(user).then(function () {
      let node = document.getElementById(user.id);
      node.remove();
    });
  },
});

function join() {
  let user = {
    id: userId,
  };
  // 调用 room.join 方法，加入 RTC 房间
  room.join(user).then(
    () => {
      console.log("join successfully");
      // 获取己方媒体流
      getMedia();
    },
    (error) => {
      console.log(error);
    }
  );
}
// 获取本地视频流
function getMedia() {
  // 调用 stream.get 获取本地视频流
  stream.get().then(
    function ({ mediaStream }) {
      console.log(mediaStream);
      let node = document.createElement("video");
      node.srcObject = mediaStream;
      node.autoplay = true;
      node.id = userId;
      document.body.appendChild(node);
      // 发布己方媒体流
      publish(mediaStream);
    },
    (error) => {
      console.error(error);
    }
  );
}
// 发布视频流
function publish(mediaStream) {
  let user = {
    id: userId,
    stream: {
      tag: "test",
      type: StreamType.AUDIO_AND_VIDEO,
      mediaStream: mediaStream,
    },
  };
  // 调用 stream.publish 发布己方视频流到 RTC 房间
  stream.publish(user).then(
    (result) => {
      console.log("publish success");
    },
    (error) => {
      console.log(error);
    }
  );
}

function quit() {
  let user = {
    id: userId,
    stream: {
      tag: "test",
      type: StreamType.AUDIO_AND_VIDEO,
    },
  };
  //调用 stream.unpublish 接口，取消发布己方视频流
  stream.unpublish(user).then(
    (result) => {
      console.log("取消推送成功");
      // 调用 room.leave 接口，退出 RTC 房间
      room.leave().then(
        () => {
          console.log("leave successfully");
          let nodes = document.querySelectorAll("video");
          nodes.forEach((video) => {
            video.remove();
          });
        },
        (error) => {
          console.log(error);
        }
      );
    },
    (error) => {
      console.log(error);
    }
  );
}
