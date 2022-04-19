<?php
    session_start();

    header("Content-Type: application/json"); 
 
    $json_str = file_get_contents('php://input');
    $json_obj = json_decode($json_str, true);

    require "./database.php";

    if( isset($_SESSION["username"])) {
        $username = $_SESSION["username"];
    }else {
        echo json_encode(array(
            "success" => false,
        ));
        exit;
    }
    $stmt = $mysqli->prepare("SELECT * FROM players WHERE username = '$username'");
    if(!$stmt){
        printf("Query Prep Failed: %s\n", $mysqli->error);
        exit;
    }

    $stmt->execute();
    $result = $stmt->get_result();
    $result = $result->fetch_assoc();
    if( $result == null ) {
        echo json_encode(array(
            "success" => false,
            "user" => $result,
        ));
        exit;
    } else {
        echo json_encode(array(
            "success" => true,
            "user" => $result,
        ));
        exit;
    }
    
?>