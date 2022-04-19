<?php
    session_start();

    header("Content-Type: application/json"); 
 
    $json_str = file_get_contents('php://input');
    $json_obj = json_decode($json_str, true);

    $game_name = $json_obj['name'];
    $password = $json_obj['password'];
    $game_name = htmlentities($game_name);
    $password = htmlentities($password);

    require "./database.php";

    $stmt = $mysqli->prepare("SELECT * FROM game WHERE game_name = '$game_name'");
    if(!$stmt){
        printf("Query Prep Failed: %s\n", $mysqli->error);
        exit;
    }

    $stmt->execute();
    $result = $stmt->get_result();
    $result = $result->fetch_assoc();

    if ( $result != null ) {
        echo json_encode(array(
            "success" => false,
        ));
        exit;
    }
    $stmt->close();

    $stmt = $mysqli->prepare("INSERT INTO game (game_name, password) values ('$game_name', '$password')");
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