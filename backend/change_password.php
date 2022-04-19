<?php
    session_start();

    header("Content-Type: application/json"); 
 
    $json_str = file_get_contents('php://input');
    $json_obj = json_decode($json_str, true);

    $new_password = $json_obj["new_password"];
    $new_password = htmlentities($new_password);
    $game_name = $json_obj["game_name"];
    $game_name = htmlentities($game_name);

    require "./database.php";

    $stmt = $mysqli->prepare("UPDATE game SET password = '$new_password' WHERE game_name = '$game_name'");
    if(!$stmt){
        printf("Query Prep Failed: %s\n", $mysqli->error);
        exit;
    }
    $stmt->execute();
    $stmt->close();
 
    echo json_encode(array(
        "success" => true,
    ));
    exit;
    
?>