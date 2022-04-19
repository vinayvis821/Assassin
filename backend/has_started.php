<?php
    session_start();

    header("Content-Type: application/json"); 
 
    $json_str = file_get_contents('php://input');
    $json_obj = json_decode($json_str, true);

    $game_name = $json_obj["name"];
    $game_name = htmlentities($game_name);

    require "./database.php";

    $stmt = $mysqli->prepare("SELECT started from game WHERE game_name = '$game_name'");
    if(!$stmt){
        printf("Query Prep Failed: %s\n", $mysqli->error);
        exit;
    }
    $stmt->execute();
    $stmt->bind_result($started);
    $stmt->fetch();
    $stmt->close();

    echo json_encode(array(
        "success" => true,
        "started" => $started,
    ));
    exit;
    
?>