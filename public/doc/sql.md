```sql
DROP TABLE IF EXISTS `imweb_login`;
# 用户登录表
create table imweb_login(
    onlyId VARCHAR(20) NOT NULL PRIMARY KEY COMMENT '用户唯一id',
    code VARCHAR(20) NOT NULL COMMENT '融云返回的code',
    meetingId Varchar(30) NOT NULL COMMENT '用户输入的加入会议id',
    portrait VARCHAR(100) NOT NULL COMMENT '服务端生成的头像地址',
    token VARBINARY(100) NOT NULL COMMENT '用户token',
    userId VARCHAR(20) NOT NULL COMMENT '融云返回的用户id',
    username VARCHAR(50) NOT NULL COMMENT '用户自己输入的用户id'
) CHARACTER SET utf8;

INSERT INTO imweb_login(onlyId,code, meetingId, portrait, token, userId, username) VALUES('3CK98Y','200','520','http://7xogjk.com1.z0.glb.clouddn.com/IuDkFprSQ1493563384017406982','RhvrTiy9PfV7twh2vVlwcxFdzKqojC/W/xXDzCr1V/8=@phmy.cn.rongnav.com;phmy.cn.rongcfg.com','HWVMP4','200');



```

