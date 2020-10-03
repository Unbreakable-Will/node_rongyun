const urlencode = require('urlencode');

//引入
const { getUserToken , registered } = require('../sdkConfig/userConfig');
const { addUser } = require('../model/userModel');
//导入方法
const { generateMixed , getTouXiang } = require('../config/func');


//导出方法
//注册功能
module.exports.userRegistered = (req, res) => {
    
    //用户注册
    //用户唯一id
    let id = generateMixed(6);
    //获取随机id
    let joinId = generateMixed(9);

    //得到用户头像
    getTouXiang(urlencode(req.body.username), function (touXiangURL) {
      //调用融云SDK获取Token
      registered(id, req.body.username, touXiangURL, function (result) {
        let user = {
            //状态码
            code : result.code,
            //加入会议ID
            joinId : joinId,
            //用户id
            userId : result.userId,
            //token
            token : result.token,
            //用户头像
            touXiang : touXiangURL
        }
        res.send(user);
      });
    });
    
    
    //     id: 'ujadk90ha',
    //     name: 'Maritn',
    //     portrait: 'http://7xogjk.com1.z0.glb.clouddn.com/IuDkFprSQ1493563384017406982'


    // //创建对象
    // let user = {
    //     id: 'ujadk90ha',
    //     name: 'Maritn', 
    //     portrait: 'http://7xogjk.com1.z0.glb.clouddn.com/IuDkFprSQ1493563384017406982'
    // }

    // //将值添加到数据库中
    // // addUser(user,function(results){});

    // //调用函数 获取token
    // getUserToken(user,function(results){
    //     console.log(results);
        
    //     res.send('请求成功');
    // });
}



