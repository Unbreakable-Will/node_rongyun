//引入
const { getUserToken } = require('../sdkConfig/userConfig');
const { addUser } = require('../model/userModel');

//生成随机id
function generateMixed(n) {
    var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    
    var res = "";
    for (var i = 0; i < n; i++) {
        var id = Math.ceil(Math.random() * 35);
        res += chars[id];
    }
    return res;
}


//导出方法
module.exports.userLogin = (req, res) => {
     //获取随机id
    let userId = generateMixed(9);

    //     id: 'ujadk90ha',
    //     name: 'Maritn',
    //     portrait: 'http://7xogjk.com1.z0.glb.clouddn.com/IuDkFprSQ1493563384017406982'

    console.log(userId);
    //创建对象
    let user = {
        id: 'ujadk90ha',
        name: 'Maritn', 
        portrait: 'http://7xogjk.com1.z0.glb.clouddn.com/IuDkFprSQ1493563384017406982'
    }

    //将值添加到数据库中
    addUser(user,function(results){});

    //调用函数 获取token
    getUserToken(user,function(results){
        console.log(results);
        res.send('请求成功');
    });
}


