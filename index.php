<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Assassin</title>
    <link rel="stylesheet" href="style.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <link rel="shortcut icon" type="image/png" href="./resources/assassin.png">
</head>
<body>
    <div class="header-container">
        <div class="header">
            <h1>Assassin</h1>
        </div>
    </div>
    <div class="nav-container">
        <div class="nav d-flex justify-content-center">
            <a href="./index.php"><p>Home</p></a>
            <a href="./rules.php"><p>Rules</p></a>
            <a href="./about.php"><p>About</p></a>
        </div>
    </div>

    <div class="container" id="log-in">
        <div class="row">
            <div class="col-sm login-container">
                <h2>Log In</h2>
                <input type="text" id="login-username" placeholder="Username" required>
                <br>
                <button type="submit" id="login-button" class="btn btn-primary">Submit</button>
            </div>
        </div>
    </div>

    <div class="container" id="create-user-container">
        <div class="row">
            <div class="col-sm create-user">
                <h2>Create User</h2>
                <input type="text" id="create-name" placeholder="Name" required>
                <br>
                <input type="text" id="create-username" placeholder="Username" required>
                <br>
                <button type="submit" id="create-button" class="btn btn-primary">Submit</button>
            </div>
        </div>
    </div>

    <div class="container" id="join-game-container">
        <div class="row">
            <div class="col-sm join-game">
                <h2>Join Game</h2>
                <h3 id="join-game-name">Game</h3>
                <p>You are only allowed to join one game, joining this game will forfeit you from your current game<p>
                <button type="submit" id="cancel-join-game-button" class="btn btn-primary">Cancel</button>
                <button type="submit" id="join-game-button" class="btn btn-danger">Join</button>
            </div>
        </div>
    </div>

    <div class="container" id="logged-in">
        <div class="row">
            <div class="col-sm logged-in-container">
                <h2 id="logged-in-username">Hi, </h2>
                <p id="logged-in-game">Current game:</p>
                <span id="logged-in-game_id"></span>
                <p id="logged-in-target">Your target is: <p>
                <p id="logged-in-round">You have until: </p>
                <button type="submit" id="logout-button" class="btn btn-primary">Log out</button>
            </div>
        </div>
    </div>

    <div class="container" id="logged-in-admin">
        <div class="row">
            <div class="col-sm logged-in-container">
                <p>Admin console <p>
                <button type="submit" id="logout-button-admin" class="btn btn-primary">Log out</button>
            </div>
        </div>
    </div>


    <div class="container" id="list-of-games-container">
        <div class="row">
            <div class="col-sm list-of-games">
                <h2 id="list-of-games-title">All Other Active Games:</h2>
                <div id="list-of-games-list"></div>
            </div>
        </div>
    </div>

    <script src="./backend/login.js"></script>
    <script src="./backend/logout.js"></script>
    <script src="./backend/create_user.js"></script>
    <script src="./backend/join.js"></script>

    <!-- Event Listeners -->
    <script>   
        document.getElementById("login-button").addEventListener("click" , logIn );
        document.getElementById("logout-button").addEventListener("click" , logOut );
        document.getElementById("logout-button-admin").addEventListener("click" , logOut );
        document.getElementById("create-button").addEventListener("click" , createUser );
        document.getElementById("join-game-button").addEventListener("click", joinGame);
        document.getElementById("cancel-join-game-button").addEventListener("click", cancelJoinGame);


    </script>
</body>
</html>