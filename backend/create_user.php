<?php
    session_start();

    header("Content-Type: application/json"); 
 
    $json_str = file_get_contents('php://input');
    $json_obj = json_decode($json_str, true);

    $username_entry = $json_obj['username'];
    $name_entry = $json_obj['name'];
    $username_entry = htmlentities($username_entry);
    $name_entry = htmlentities($name_entry);

    require "./database.php";

    $stmt = $mysqli->prepare("SELECT * FROM players WHERE username = '$username_entry'");
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

    $stmt = $mysqli->prepare("INSERT INTO players (name, username, target, eliminated) values ('$name_entry', '$username_entry', 'None', 'no')");
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