<?php
    session_start();

    header("Content-Type: application/json"); 
 
    $json_str = file_get_contents('php://input');
    $json_obj = json_decode($json_str, true);

    $target_name = $json_obj["name"];
    $target_name = htmlentities($target_name);

    require "./database.php";

    $stmt = $mysqli->prepare("SELECT name FROM players WHERE username = '$target_name'");
    if(!$stmt){
        printf("Query Prep Failed: %s\n", $mysqli->error);
        exit;
    }

    $stmt->execute();
    $stmt->bind_result($target_name);
    $stmt->fetch();
    $stmt->close();
 
    echo json_encode(array(
        "success" => true,
        "target_name" => $target_name,
    ));
    exit;
    
?>