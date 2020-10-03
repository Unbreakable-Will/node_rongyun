//替换成您自己的 Appkey
const appkey = 'bmdehs6pbadts';
// 替换成您自己的 Secret
const secret = 'Ly4MH0OcTQw';


module.exports.getUserToken = (user, callback) => { 

    //调用SDK文档
    var RongSDK = require('rongcloud-sdk')({
        appkey: appkey,
        secret: secret
    });

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