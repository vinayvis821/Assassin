<?php 
    $mysqli = new mysqli('localhost', 'sql_user', 'sql_pass', 'Assassin');

    if($mysqli->connect_errno) {
        printf("Connection Failed: %s\n", $mysqli->connect_error);
        exit;
    }
?>