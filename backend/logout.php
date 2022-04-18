<?php
    header("Content-Type: application/json");
    ini_set("session.cookie_httponly", 1);
    session_start();
    unset($_SESSION["username"]); 
    unset( $_SESSION["token"]);
    session_destroy();
    echo json_encode(array(
        "success" => true
    ));
    exit;
?>