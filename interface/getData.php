<?php
    include('./library/conn.php');

    $sql = "select * from product";
    $red = $mysqli->query($sql);
    $mysqli->close();

    $arr = array();
?>