var div = document.querySelector(".center");
$(function () {
  $(".left1").mouseover(function () {
    $(".left1-click").show();
    console.log(111);
  });
  $(".left1").mouseout(function () {
    console.log(222);
    $(".left1-click").hide();
  });

  $(".key6").click(function () {
    $(".member").toggle().siblings().hide();
    div.scrollTop = div.scrollHeight;

    // console.log($(".member").css("display") == "none");
    if ($(".member").css("display") == "none") {
      var num = 780 / 192;
      $(".chat .center").css("height", num + "rem");
      var num2 = 600 / 192;
      $(".chat .center ").css("height", num2 + "rem");
      var num3 = 150 / 192;
      //   $(".chat .bottom-text ").css("height", num3 + "rem");
      $(".chat textarea").css("height", num3 + "rem");

      console.log(111);
    } else {
      var num = 300 / 192;
      $(".chat .center").css("height", num + "rem");
      var num2 = 130 / 192;
      $(".chat textarea").css("height", num2 + "rem");
      console.log(222);
    }
  });

  $(".member-list li").mouseover(function () {
    $(this).find(".status div").show();
    $(this).find(".status span").hide();
  });
  $(".member-list li").mouseout(function () {
    $(this).find(".status div").hide();
    $(this).find(".status span").show();
  });

  // 定时器

  var divHour = $("#divHour"); //时
  var divMin = $("#divMin"); //分
  var divSec = $("#divSec"); //秒
  //2.设置计时器
  setInterval(function () {
    //2.1 获取当前这个div里面的文字
    var txtHour = +divHour.text(); //转成number类型
    var txtMin = +divMin.text();
    var txtSec = +divSec.text();
    // console.log(+txtSec++);
    //2.2 把这个文本修改
    txtSec++;

    //如果秒钟小于0，则分钟-1，秒钟从59开始
    if (txtSec > 60) {
      txtSec = 01;
      txtMin++;
    }
    //如果分钟小于0，则时钟-1，分钟从59开始
    if (txtMin > 60) {
      txtMin = 01;
      txtHour++;
    }
    //2.3 如果时分秒是一个一位数，就要补全成两位数
    txtHour = txtHour < 10 ? "0" + txtHour : txtHour;
    txtMin = txtMin < 10 ? "0" + txtMin : txtMin;
    txtSec = txtSec < 10 ? "0" + txtSec : txtSec;
    //2.4 把这新的文本，重新的赋值给这个div
    $("#divSec").text(txtSec);
    $("#divMin").text(txtMin);
    $("#divHour").text(txtHour);
  }, 1000);

  //   点击改名

  $(".rename").click(function () {
    $(".revise").show();
    var oldtext = $(this).parent().prev().find(".member-name").text().trim();
    // console.log($(this).parent().prev().prev().find('img').attr('src'));
    var img = $(this).parent().prev().prev().find("img");
    var name = $(this).parent().prev().find(".member-name");
    var input = $(".revise").find("input");
    var btn = $(".revise").find("button");
    input.val(oldtext);
    // console.log(input);
    // var flag = true;
    input.keyup(function () {
      console.log(input.val().length);
      var newtext = input.val();
      if (input.val().length == 0) {
        btn.css("background-color", "#80b7ff");
        btn.attr("disabled", true);
        // flag = false;
      } else {
        // flag = true;
        btn.css("background-color", "#006fff");
        btn.attr("disabled", false);
        btn.on("click", function () {
          $(".revise").hide();
          name.text(newtext);
          $(".main .member-name").text(newtext);
          $(".touxiang img").attr(
            "src",
            "http://hd215.api.yesapi.cn/?s=Ext.Avatar.Show&app_key=BA6BBB3D9C90B515C6CAF6310D2BFFB4&nickname=" +
              newtext
          );
          // console.log(
          img.attr(
            "src",
            "http://hd215.api.yesapi.cn/?s=Ext.Avatar.Show&app_key=BA6BBB3D9C90B515C6CAF6310D2BFFB4&nickname=" +
              newtext
          );
          // );
        });
      }
      // console.log(111);
    });
    btn.on("click", function () {
      $(".revise").hide();
    });
    $(".revise")
      .find("span")
      .click(function () {
        $(".revise").hide();
      });
  });
});

// 发送消息
$(function () {
  var str = "";

  var name = $(".main .member-name").text();
  $("textarea").keypress(function (e) {
    var text = $("textarea").val();
    if (e.keyCode == 13 && text.trim() != "") {
      e.preventDefault();
      var myDate = new Date();
      var newdate = myDate.toLocaleString();
      var mytime = myDate.toLocaleTimeString();
      console.log(newdate);
      console.log(text);
      $("textarea").val("");
      str += `<div class="message">
      <p class="name">${name}: ${mytime}</p>
      <p class="">${text}</p>
    </div>
      `;
      $(".chat .center").html(str);
      console.log(str);

      div.scrollTop = div.scrollHeight;
    }
  });
});
