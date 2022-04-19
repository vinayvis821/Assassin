<?php
    session_start();

    header("Content-Type: application/json"); 
 
    $json_str = file_get_contents('php://input');
    $json_obj = json_decode($json_str, true);

    $game_name = $json_obj["name"];
    $game_name = htmlentities($game_name);

    require "./database.php";

    $stmt = $mysqli->prepare("SELECT * FROM players WHERE current = '$game_name'");
    if(!$stmt){
        printf("Query Prep Failed: %s\n", $mysqli->error);
        exit;
    }

    $stmt->execute();
    $result = $stmt->get_result();
    $users = array();
    $counter = 0;
    while( $row = $result->fetch_assoc() ) {
        $users[$counter] = $row;
        $counter++;
    }
 
    echo json_encode(array(
        "success" => true,
        "users" => $users,
    ));
    exit;
    
?>