$(function () {
    $("body").click(function () {
      $(".key7-click").hide();
      $(".key4-click").hide();
      $(".share").hide();
      $(".camera").hide();
      $(".mute").hide();

    });

  $(".box-click")
    .children()
    .click(function (e) {
      e.stopPropagation();

      console.log($(this));
    });
  $(".left1").mouseover(function () {
    $(".left1-click").show();
    console.log(111);
  });
  $(".left1").mouseout(function () {
    console.log(222);
    $(".left1-click").hide();
  });

  $(".key7").click(function (e) {
    e.stopPropagation();
    console.log(111);
    $(".key7-click").toggle().siblings().hide();
  });

  $(".key6").click(function () {
    $(".member").toggle().siblings().hide();
    console.log($(".member").css("display") == "none");
    if ($(".member").css("display") == "none") {
      var num = 608 / 192;
      $(".chat .center").css("height", num + "rem");
      var num2 = 140 / 192;

      $(".chat .bottom-text ").css("height", num2 + "rem");
    } else {
      var num = 183 / 192;
      $(".chat .center").css("height", num + "rem");
      var num2 = 110 / 192;
      $(".chat .bottom-text ").css("height", num2 + "rem");
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

  $("textarea").bind("input propertychange", function () {
    if ($("textarea").val() != "") {
      $(".bottom-text>span").addClass("fasong");
    } else {
      $(".bottom-text>span").removeClass("fasong");
    }
  });

  $(".key4").click(function (e) {
    e.stopPropagation();
    $(".key4-click").toggle().siblings().hide();
  });
  $(".key3")
    .next()
    .click(function (e) {
      e.stopPropagation();
      $(".share").toggle().siblings().hide();
    });
  $(".key2")
    .next()
    .click(function (e) {
      e.stopPropagation();
      $(".camera").toggle().siblings().hide();
    });
  $(".key1")
    .next()
    .click(function (e) {
      e.stopPropagation();
      $(".mute").toggle().siblings().hide();
    });
});
