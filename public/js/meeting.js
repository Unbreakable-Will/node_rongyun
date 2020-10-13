$(function () {
  // 获取用户ip
  $.ajax({
    asycn: false,
    type: "get",
    url:
      "http://api.tianapi.com/world/index?key=212bb6be30ba3b3d459583584400daef&num=6",
    data: null,
    success: function (response) {
      console.log(response);

      let newlist = response.newslist;
      let str = "";

      for (let i = 0; i < newlist.length; i++) {
        str += `
        <li>
          <div class="left-top-box">
            <h2>${newlist[i].title}</h2>
            <span class="des">${newlist[i].description}</span>
            <span class="time">${newlist[i].ctime}</span>
          </div>
          <div class="left-bottom-box">
            <a href="${newlist[i].url}">
              <img
                src="${newlist[i].picUrl}"
                alt="">
            </a>
          </div>
        </li>`;
      }
      console.log(str);
      $("#news-list").html(str);
    },
  });

  // 发送消息
  $("#bottom-btn").click(function (e) {
    var text = $("textarea").val();
    var div = document.querySelector(".center");
    e.preventDefault();
    // 发送消息
    if (text.trim()) {
      sendChatRoom(text);
      $("textarea").val("");
    }
    div.scrollTop = div.scrollHeight;
  });
  // 在input中写入视频链接   播放视频

  $("#btn").click(function () {
    var text = $(".bottom-key input").val();
    $(".bottom-key input").val("");
    console.log(text);
    // $.ajax({
    //   async: false, //改同步获取
    //   type: "POST", //默认get
    //   url: "url",
    //   data: {},
    //   success: function (response) {
    //     // $("iframe").prop("src");
    //     console.log(response);
    //   },
    // });
  });
});
