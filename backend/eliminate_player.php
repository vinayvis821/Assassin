<?php
    session_start();

    header("Content-Type: application/json"); 
 
    $json_str = file_get_contents('php://input');
    $json_obj = json_decode($json_str, true);

    $username = $json_obj["username"];
    $username = htmlentities($username);
    $eliminated = $json_obj["eliminated"];
    $eliminated = htmlentities($eliminated);

    require "./database.php";

    if( $eliminated == "no" ) {
        $stmt = $mysqli->prepare("UPDATE players SET eliminated = 'yes' WHERE username = '$username'");
        if(!$stmt){
            printf("Query Prep Failed: %s\n", $mysqli->error);
            exit;
        }
        $eliminated = 'yes';
        $stmt->execute();
        $stmt->close();

        $stmt = $mysqli->prepare("UPDATE players SET target_eliminated = 'yes' WHERE target = '$username'");
        if(!$stmt){
            printf("Query Prep Failed: %s\n", $mysqli->error);
            exit;
        }
        $stmt->execute();
        $stmt->close();
    } else {
        $stmt = $mysqli->prepare("UPDATE players SET eliminated = 'no' WHERE username = '$username'");
        if(!$stmt){
            printf("Query Prep Failed: %s\n", $mysqli->error);
            exit;
        }
        $eliminated = 'no';
        $stmt->execute();
        $stmt->close();

        $stmt = $mysqli->prepare("UPDATE players SET target_eliminated = 'no' WHERE target = '$username'");
        if(!$stmt){
            printf("Query Prep Failed: %s\n", $mysqli->error);
            exit;
        }
        $stmt->execute();
        $stmt->close();
    }

    $stmt = $mysqli->prepare("UPDATE players SET target = 'None' WHERE username = '$username'");
    if(!$stmt){
        printf("Query Prep Failed: %s\n", $mysqli->error);
        exit;
    }
    $stmt->execute();
    $stmt->close();
 
    echo json_encode(array(
        "success" => true,
        "eliminated" => $eliminated,
    ));
    exit;
    
?>