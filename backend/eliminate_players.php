<?php
    session_start();

    header("Content-Type: application/json"); 
 
    $json_str = file_get_contents('php://input');
    $json_obj = json_decode($json_str, true);

    $game_name = $json_obj["name"];
    $game_name = htmlentities($game_name);

    require "./database.php";

    $stmt = $mysqli->prepare("UPDATE players SET eliminated = 'yes' WHERE current = '$game_name' AND target_eliminated = 'no'");
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