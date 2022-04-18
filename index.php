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
                <h2>Log In!</h2>
                <input type="text" id="login-username" placeholder="Username" required>
                <br>
                <button type="submit" id="login-button" class="btn btn-primary">Submit</button>
            </div>
        </div>
    </div>

    <div class="container" id="logged-in">
        <div class="row">
            <div class="col-sm logged-in-container">
                <h2 id="logged-in-username">Hi, </h2>
                <p id="logged-in-target">Your target is: <p>
                <p id="logged-in-round">You have until: </p>
                <button type="submit" id="logout-button" class="btn btn-primary">Log out</button>
            </div>
        </div>
    </div>

    <div class="container" id="logged-in-admin">
        <div class="row">
            <div class="col-sm logged-in-container">
                <h2>Hi, admin</h2>
                <p>Admin console <p>
                <button type="submit" id="logout-button-admin" class="btn btn-primary">Log out</button>
            </div>
        </div>
    </div>

    <script src="./backend/login.js"></script>
    <script src="./backend/logout.js"></script>

    <!-- Event Listeners -->
    <script>   
        document.getElementById("login-button").addEventListener("click" , logIn );
        document.getElementById("logout-button").addEventListener("click" , logOut );
        document.getElementById("logout-button-admin").addEventListener("click" , logOut );
    </script>
</body>
</html>