//替换成您自己的 Appkey
const appkey = 'bmdehs6pbadts';
// 替换成您自己的 Secret
const secret = 'Ly4MH0OcTQw';

//调用SDK文档
var RongSDK = require('rongcloud-sdk')({
    appkey: appkey,
    secret: secret
});


module.exports.getUserToken = (user, callback) => { 

    // API 文档: http://www.rongcloud.cn/docs/server/sdk/user/user.html#register
    var User = RongSDK.User;
    var user = {
        id: user.id,
        name: user.name,
        portrait: user.portrait
    };   


    User.register(user).then(result => {
        // console.log(result);
        callback(result);
    }, error => {
        console.log(error);
    });
}



/**
 * 用户注册
 *@param {string} id
 *@param {string} name
 *@param {string} portrait 用户头像
 *@param {function} callback 回调函数
 *
 */
module.exports.registered = async function (id, name, portrait, callback) {
    // API 文档: http://www.rongcloud.cn/docs/server/sdk/user/user.html#register
    var User = RongSDK.User;
    var user = {
      id: id,
      name: name,
      portrait: portrait,
    };
    await User.register(user).then(
      (result) => {
        //   return result;
        // result.portrait;
        // 返回头像URL
        result.portrait = portrait;
        // console.log("registered", result);
        callback(result);
      },
      (error) => {
        //   console.log(error);
        //   return error;
        callback(error);
      }
    );
    //   console.log(fanhui);
  };
  