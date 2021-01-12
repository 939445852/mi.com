<?php
    include('./library/conn.php');

    $sql = "select * from product";
    $red = $mysqli->query($sql);
    $mysqli->close();

    $arr = array();
    while($row = $res->fetch_assoc()){
        
    }
?>