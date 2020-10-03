//添加数据库连接池
const pool = require('../config/dbConfig');

module.exports.addUser = (data , callback) => {
    //创建values
    var values = '';
    //拼接数据
    for(let k in data){
        values = "'"+data[k]+"',";
    };

    //删除末尾,
    values = values.slice(0,-1);

    pool.query(`
    INSERT INTO imweb_login(id, name, portrait, token_id, token) VALUES (${values})
    ` 
    ,function(error,results){
        if(error) throw error;

        callback(results);
    })
}