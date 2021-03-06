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
            <div class="col-md-12 login-container">
                <h2>Log In</h2>
                <input type="text" id="login-username" placeholder="Username" required>
                <br>
                <input type="text" id="login-password" placeholder="Password" required>
                <br>
                <button type="submit" id="login-button" class="btn btn-primary">Log In</button>
                <br>
                <button type="submit" id="login-button-admin" class="btn btn-primary">Admin</button>
            </div>
        </div>
    </div>

    <div class="container" id="create-user-container">
        <div class="row">
            <div class="col-md-12 create-user">
                <h2>Create User</h2>
                <input type="text" id="create-name" placeholder="Name" required>
                <br>
                <input type="text" id="create-username" placeholder="Username" required>
                <br>
                <input type="text" id="create-password" placeholder="Password" required>
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
            <div class="col-sm-6 logged-in-container">
                <h2 id="logged-in-username">Hi, </h2>
                <p id="logged-in-game">Current game:</p>
                <span id="logged-in-game_id"></span>
                <p id="logged-in-target">Your target is: <p>
                <p id="logged-in-round">You have until: </p>
                <button type="submit" id="logout-button" class="btn btn-primary">Log out</button>
            </div>
            <div class="col-sm-6 active-user-container">
                <h2 id="acive-users">Join a game to see active players</h2>
                <div id="active-users-list"></div>
            </div>
        </div>
    </div>

    <div class="container" id="logged-in-admin">
        <div class="row">
            <div class="col-sm logged-in-container-admin">
                <h2>Admin console <h2>
                <div class="col-sm list-of-games-admin">
                    <h4 id="list-of-games-title-admin">Click any game to manage it:</h4>
                    <div id="list-of-games-list-admin"></div>
                </div>
                <button type="submit" id="add-game-button-admin" class="btn btn-primary">Add Game</button>
                <button type="submit" id="logout-button-admin" class="btn btn-primary">Log out</button>
            </div>
        </div>
    </div>

    <div class="container" id="manage-game-container">
        <div class="row">
            <div class="col-sm logged-in">
                <h2 id="manage-game-name">Game: <h2>
                <div id="manage-game-list-of-players"></div>
                <p id="game_name"></p>
                <button type="submit" id="change-room-password" class="btn btn-danger">Change Password</button>
                <br>
                <button type="submit" id="assign-targets-admin" class="btn btn-danger">Assign Targets</button>
                <button type="submit" id="eliminate-targets-admin" class="btn btn-danger">End of Round</button>
                <button type="submit" id="back-button-admin" class="btn btn-secondary">Back</button>
                <br>
                <button type="submit" id="end-game-admin" class="btn btn-danger">End Game</button>
            </div>
        </div>
    </div>

    <div class="container" id="manage-user-container">
        <div class="row">
            <div class="col-sm logged-in">
                <h2 id="manage-user-name">User: <h2>
                <p id="eliminated">Eliminated: </p>
                <button type="submit" id="eliminate-user-admin" class="btn btn-primary">Eliminate User</button>
                <button type="submit" id="delete-user-admin" class="btn btn-danger">Delete User</button>
                <button type="submit" id="back-button-user-admin" class="btn btn-secondary">Back</button>
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

    <!-- Javascript imports -->

    <script src="./login.js"></script>
    <script src="./logout.js"></script>
    <script src="./create_user.js"></script>
    <script src="./join.js"></script>
    <script src="./admin.js"></script>

    <!-- Event Listeners -->
    <script>   
        document.getElementById("login-button").addEventListener("click" , logIn );
        document.getElementById("logout-button").addEventListener("click" , logOut );
        document.getElementById("login-button-admin").addEventListener("click", logInAdmin);
        document.getElementById("logout-button-admin").addEventListener("click" , logOut );
        document.getElementById("create-button").addEventListener("click" , createUser );
        document.getElementById("join-game-button").addEventListener("click", joinGame);
        document.getElementById("cancel-join-game-button").addEventListener("click", cancelJoinGame);
        document.getElementById("back-button-admin").addEventListener("click", backButtonAdmin);
        document.getElementById("back-button-user-admin").addEventListener("click", backButtonUserAdmin);
        document.getElementById("delete-user-admin").addEventListener("click", deleteUser);
        document.getElementById("eliminate-user-admin").addEventListener("click", eliminateUser);
        document.getElementById("assign-targets-admin").addEventListener("click", assignTargets );
        document.getElementById("eliminate-targets-admin").addEventListener("click", eliminateUsers);
        document.getElementById("change-room-password").addEventListener("click", changePassword);
        document.getElementById("add-game-button-admin").addEventListener("click", addGame);
        document.getElementById("end-game-admin").addEventListener("click", endGame );
    </script>
</body>
</html>