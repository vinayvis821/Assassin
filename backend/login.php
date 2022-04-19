<?php
    header("Content-Type: application/json"); 
 
    $json_str = file_get_contents('php://input');
    $json_obj = json_decode($json_str, true);

    $username_guess = $json_obj['username'];
    $username_guess = htmlentities($username_guess);
    $password_guess = $json_obj['password'];
    $password_guess = htmlentities($password_guess);
    require "./database.php";

    $stmt = $mysqli->prepare("SELECT * FROM players WHERE username = '$username_guess'");
    if(!$stmt){
        printf("Query Prep Failed: %s\n", $mysqli->error);
        exit;
    }

    $stmt->execute();
    $result = $stmt->get_result();
    $result = $result->fetch_assoc();

    if( $result["username"] == $username_guess && password_verify($password_guess, $result["password_hash"])) {
        ini_set("session.cookie_httponly", 1);
        session_start();
        $_SESSION['username'] = $username_guess;
        $_SESSION['token'] = bin2hex(openssl_random_pseudo_bytes(32)); 
        echo json_encode(array(
            "success" => true,
            "user" => $result,
            "token" => $_SESSION["token"],
        ));
        exit;
    } else {
        echo json_encode(array(
            "success" => false,
            "message" => "Username does not exist or password is incorrect",
        ));
    }

?>