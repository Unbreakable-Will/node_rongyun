//添加数据库连接池
const pool = require('../config/dbConfig');

//添加会议
module.exports.addUser = (data , callback) => {
    //创建values
    var values = '';
    //拼接数据
    for(let k in data){
        values += "'"+data[k]+"',";
    };

    //删除末尾,
    values = values.slice(0,-1);
    pool.query(`
    INSERT INTO imweb_login(onlyId,code, meetingId, portrait, token, userId, username) VALUES (${values})
    ` 
    ,function(error,results){
        if(error) throw error;

        callback(results);
    })
}


//查找会议
module.exports.findMeetingId = (meetingId , callback) => {
    //创建数据库语句
    let sql = `select meetingId from imweb_login where meetingId = "${meetingId}"`;

    //查询数据库
    pool.query(sql,function(error,results){
        if(error) throw error;

        callback(results);
    })
}


//查询所有会议中的成员
module.exports.findMeetingUser = (meetingId , callback) => {
    //创建sql语句
    let sql = `select * from imweb_join where meetingId = "${meetingId}"`;

    //查询数据库
    pool.query(sql,function(error,results){
        if(error) throw error;

        callback(results);
    })
}


//查询会议中成员个数
module.exports.findCountUser = (meetingId , callback) => {
    //创建sql语句
    let sql = `select count(*) userCount from imweb_join where meetingId = "${meetingId}"`;

    //查询数据库
    pool.query(sql,function(error,results){
        if(error) throw error;

        callback(results);
    })
}
