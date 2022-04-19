<?php
    session_start();

    header("Content-Type: application/json"); 
 
    $json_str = file_get_contents('php://input');
    $json_obj = json_decode($json_str, true);

    $game_id = $json_obj['game_id'];
    $game_id = htmlentities($game_id);
    $password_guess = $json_obj['password_guess'];
    $password_guess = htmlentities($password_guess);
    require "./database.php";

    $stmt = $mysqli->prepare("SELECT password FROM game WHERE game_id = $game_id");
    if(!$stmt){
        printf("Query Prep Failed: %s\n", $mysqli->error);
        exit;
    }

    $stmt->execute();
    $result = $stmt->get_result();
    $result = $result->fetch_assoc();
    if( $result["password"] == $password_guess ) {
        echo json_encode(array(
            "success" => true,
        ));
        exit;
    }else {
        echo json_encode(array(
            "success" => false,
        ));
        exit;
    }

?>