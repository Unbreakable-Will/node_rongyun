$(function () {
  let rongRTC = new RongRTC({
    // 开启调试模式，SDK 会向控制台输出日志，默认 false
    debug: false,
    // IM SDK ，使用可参考: https://docs.rongcloud.cn/im/imlib/web/summary/
    RongIMLib: RongIMLib,
    //音视频模式说明，RTC_MODE.RTC普通音视频，RTC_MODE.LIVE 直播音视频
    mode: RongRTC.Mode.RTC,
    //直播类型，默认音视频
    liveType: RongRTC.LiveType.AUDIO_AND_VIDEO,
    //直播角色，默认主播
    liveRole: RongRTC.ROLE.ANCHOR,

    created: function () {},
    mounted: function () {},
    destroyed: function () {},
    error: function (error) {},
  });
  let { Room, Stream, Message, Device, Storage, StreamType } = rongRTC;
  // 按需调用各模块实例 API
  $(".key2").click(function (e) {
    e.preventDefault();
    //加入房间
    joinRoot(getQueryVariable(getQueryVariable("meetingId")));
  });

  function joinRoot(roomId) {
    var room = new Room({
      id: roomId,
      joined: function (user) {
        // user.id 加入房间
        console.log(user, "加入房间");
        // 获取己方媒体流
      },
      left: function (user) {
        // user.id 离开房间
        console.log(user, "离开房间");
      },
    });

    let user = {
      id: getQueryVariable("userId"),
    };
    room.join(user).then(
      () => {
        console.log("join successfully", user.id);
        getMedia();
      },
      (error) => {
        console.log(error);
      }
    );
  }

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
        // document.body.appendChild(node);
        // console.log(node);
        // $("#fang").html(node);
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
  /**
   *得到本地视频流
   */
  function getMedia() {
    // 调用 stream.get 获取本地视频流
    stream.get().then(
      function ({ mediaStream }) {
        console.log(mediaStream);
        let node = document.createElement("video");
        node.srcObject = mediaStream;
        node.autoplay = true;
        node.id = getQueryVariable("userId");
        $("#fang").html(node);

        // 发布己方媒体流
        publish(mediaStream);
      },
      (error) => {
        console.error(error);
      }
    );
  }
  /**
   * 发布视频流
   * @param {*} mediaStream
   */
  function publish(mediaStream) {
    let user = {
      id: getQueryVariable("userId"),
      stream: {
        tag: "test",
        type: StreamType.AUDIO_AND_VIDEO,
        mediaStream: mediaStream,
      },
    };
    // 调用 stream.publish 发布己方视频流到 RTC 房间
    stream.publish(user).then(
      (result) => {
        console.log("publish success 推流成功");
      },
      (error) => {
        console.log(error);
      }
    );
  }

  /**
   *
   *
   * @param {string} variable 输入url中的参数返回值
   * @returns
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
});
