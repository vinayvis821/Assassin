<?php
    session_start();

    header("Content-Type: application/json"); 
 
    $json_str = file_get_contents('php://input');
    $json_obj = json_decode($json_str, true);

    $username_entry = $json_obj['username'];
    $name_entry = $json_obj['name'];
    $password_entry = $json_obj['password'];
    $username_entry = htmlentities($username_entry);
    $name_entry = htmlentities($name_entry);
    $password_entry = htmlentities($password_entry);

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

    $password_hash = $mysqli->real_escape_string(password_hash(htmlentities($password_entry),PASSWORD_BCRYPT));

    $stmt = $mysqli->prepare("INSERT INTO players (name, username, current, target, eliminated, password_hash) values ('$name_entry', '$username_entry', 'None', 'None', 'no', '$password_hash')");
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