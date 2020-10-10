const axios = require('axios');

//生成随机id
module.exports.generateMixed = function (n) {
  var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

  var res = "";
  for (var i = 0; i < n; i++) {
    var id = Math.ceil(Math.random() * 35);
    res += chars[id];
  }
  return res;
}

//生成头像
// getTouXiang(urlencode("易成龙"));
module.exports.getTouXiang = function (nickname, callback) {
  axios
    .get(
      `http://hd215.api.yesapi.cn/?s=Ext.Avatar.Show&app_key=BA6BBB3D9C90B515C6CAF6310D2BFFB4&nickname=${nickname}`
    )
    .then((response) => {
      let touXiangURL = response.config.url;
      //   console.log(response);
      //   console.log(response.config.url);
      callback(touXiangURL);
    })
    .catch((error) => {
      //   console.log(error);
      callback(error);
    });
}

//日期转换
module.exports.dateFormat = function() {
  Date.prototype.Format = function (fmt) { // author: meizz
    var o = {
      "M+": this.getMonth() + 1, // 月份
      "d+": this.getDate(), // 日
      "h+": this.getHours(), // 小时
      "m+": this.getMinutes(), // 分
      "s+": this.getSeconds(), // 秒
      "q+": Math.floor((this.getMonth() + 3) / 3), // 季度
      "S": this.getMilliseconds() // 毫秒
    };
    if (/(y+)/.test(fmt))
      fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
  }
}