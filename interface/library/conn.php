<?php
    header('content-type:text/html;charset=utf-8');
    $mysql_config = array(
        'host'=>'localhost:3306',//host 主机名 mysql默认运行在3306端口
        'db_user'=>'root',//登入数据库的用户名
        'db_pass'=>'root',//登入数据库的密码
        'db'=>'mi.com'//需要连接的数据库
    );
    //登入数据库
    $mysqli = @new mysqli($mysql_config['host'],$mysql_config['db_user'],$mysql_config['db_pass']);
    // var_dump($mysqli);
    //判断连接是否有错误
    if($mysqli->connect_errno){
        die('连接错误'.$mysqli->connect_errno);
    }
    //设置查询字符串
    $mysqli->query('set names utf-8');
    //选择数据库
    $select_db = $mysqli->select_db($mysql_config['db']);
    // var_dump($select_db); // bool(true)
    if(!$select_db){
        die('数据库选择错误'.$mysqli->error);//数据库选择错误Unknown database 'day011'
    }
?>