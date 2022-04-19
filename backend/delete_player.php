<?php
    session_start();

    header("Content-Type: application/json"); 
 
    $json_str = file_get_contents('php://input');
    $json_obj = json_decode($json_str, true);

    $username = $json_obj["username"];
    $username = htmlentities($username);

    require "./database.php";

    $stmt = $mysqli->prepare("SELECT current FROM players WHERE username = '$username'");
    if(!$stmt){
        printf("Query Prep Failed: %s\n", $mysqli->error);
        exit;
    }
    $stmt->execute();
    $stmt->bind_result($game_name);
    $stmt->fetch();
    $stmt->close();

    $stmt = $mysqli->prepare("DELETE FROM players WHERE username = '$username'");
    if(!$stmt){
        printf("Query Prep Failed: %s\n", $mysqli->error);
        exit;
    }
    $stmt->execute();
    $stmt->close();

    $stmt = $mysqli->prepare("UPDATE players SET target = 'None' WHERE target = '$username'");
    if(!$stmt){
        printf("Query Prep Failed: %s\n", $mysqli->error);
        exit;
    }
    $stmt->execute();
    $stmt->close();

    echo json_encode(array(
        "success" => true,
        "game_name" => $game_name,
    ));
    exit;
    
?>