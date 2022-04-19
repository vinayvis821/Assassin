<?php
    session_start();

    header("Content-Type: application/json"); 
 
    $json_str = file_get_contents('php://input');
    $json_obj = json_decode($json_str, true);

    $game_name = $json_obj['name'];
    $game_name = htmlentities($game_name);
    $game_id = $json_obj['id'];
    $game_id = htmlentities($game_id);
    $username = $json_obj['username'];
    $username = htmlentities($username);
    require "./database.php";

    $stmt = $mysqli->prepare("UPDATE players SET game_id = $game_id, target = 'None' WHERE username = '$username' ");
    if(!$stmt){
        printf("Query Prep Failed: %s\n", $mysqli->error);
        exit;
    }

    $stmt->execute();
    $stmt->close();

    $stmt = $mysqli->prepare("SELECT game_name FROM game WHERE game_id = '$game_id' ");
    if(!$stmt){
        printf("Query Prep Failed: %s\n", $mysqli->error);
        exit;
    }
    $stmt->execute();
    $stmt->bind_result($new_current);
    $stmt->fetch();
    $stmt->close();

    $stmt = $mysqli->prepare("UPDATE players SET current = '$new_current', eliminated='no', target_eliminated='no' WHERE username = '$username'");
    if(!$stmt){
        printf("Query Prep Failed: %s\n", $mysqli->error);
        exit;
    }
    $stmt->execute();
    $stmt->close();


    $stmt = $mysqli->prepare("SELECT * FROM players WHERE username = '$username' ");
    if(!$stmt){
        printf("Query Prep Failed: %s\n", $mysqli->error);
        exit;
    }

    $stmt->execute();
    $result = $stmt->get_result();
    $result = $result->fetch_assoc();

    echo json_encode(array(
        "success" => true,
        "user"  => $result
    ));
    exit;

?>