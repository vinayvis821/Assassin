<?php
    session_start();

    header("Content-Type: application/json"); 
 
    $json_str = file_get_contents('php://input');
    $json_obj = json_decode($json_str, true);

    require "./database.php";

    $stmt = $mysqli->prepare("SELECT * FROM game");
    if(!$stmt){
        printf("Query Prep Failed: %s\n", $mysqli->error);
        exit;
    }

    $stmt->execute();
    $result = $stmt->get_result();
    $games = array();
    $counter = 0;
    while( $row = $result->fetch_assoc() ) {
        $games[$counter] = $row;
        $counter++;
    }
 
    echo json_encode(array(
        "success" => true,
        "games" => $games,
    ));
    exit;
    
?>