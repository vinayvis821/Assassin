<?php
    session_start();

    header("Content-Type: application/json"); 
 
    $json_str = file_get_contents('php://input');
    $json_obj = json_decode($json_str, true);

    $assignments = $json_obj["assignments"];

    require "./database.php";

    foreach ($assignments as $key => $value) {
        $player = $key;
        $target = $value;
        $player = htmlentities($player);
        $target = htmlentities($target);
        $stmt = $mysqli->prepare("UPDATE players SET target = '$target' WHERE username = '$player'");
        if(!$stmt){
            printf("Query Prep Failed: %s\n", $mysqli->error);
            exit;
        }
        $stmt->execute();
        $stmt->close();

        $stmt = $mysqli->prepare("UPDATE players SET target_eliminated = 'no' WHERE username = '$player'");
        if(!$stmt){
            printf("Query Prep Failed: %s\n", $mysqli->error);
            exit;
        }
        $stmt->execute();
        $stmt->close();
    }
 
    echo json_encode(array(
        "success" => true,
        "assignments" => $assignments,
    ));
    exit;
    
?>