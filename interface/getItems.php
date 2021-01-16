<?php
    include('./library/conn.php');
    $idList = $_REQUEST['idList'];

    $sql = "select * from product where id in ($idList)";
    $result = $mysqli->query($sql);
    $mysqli->close();

    $arr = array();
    while($row = $result->fetch_assoc()){
        array_push($arr,$row);
    }

    $json = json_encode($arr);
    echo $json;
?>