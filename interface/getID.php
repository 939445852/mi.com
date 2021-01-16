<?php
    include('./library/conn.php');
    $id = $_REQUEST['id'];

    $sql = "select * from product where id=$id";
    $result = $mysqli->query($sql);
    $mysqli->close();
    $row = $result->fetch_assoc();
    $json = json_encode($row);
    echo $json;
?>