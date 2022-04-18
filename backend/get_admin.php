<?php
    header("Content-Type: application/json"); 
 
    $json_str = file_get_contents('php://input');
    $json_obj = json_decode($json_str, true);

    $password_guess = $json_obj['password'];
    $password_guess = htmlentities($password_guess);
    require "./database.php";

    $stmt = $mysqli->prepare("SELECT password FROM admin");
    if(!$stmt){
        printf("Query Prep Failed: %s\n", $mysqli->error);
        exit;
    }

    $stmt->execute();
    $stmt->bind_result($password);
    $stmt->fetch();

    if( $password == $password_guess ) {
        ini_set("session.cookie_httponly", 1);
        session_start();
        $_SESSION['username'] = "admin";
        $_SESSION['token'] = bin2hex(openssl_random_pseudo_bytes(32)); 
        echo json_encode(array(
            "success" => true,
            "token" => $_SESSION["token"],
        ));
        exit;
    } else {
        echo json_encode(array(
            "success" => false,
            "message" => "Incorrect admin password"
        ));
    }

?>