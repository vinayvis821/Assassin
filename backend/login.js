document.addEventListener("DOMContentLoaded", refresh, false);

function refresh() {
  while (document.getElementById("list-of-games-list").firstChild) {
    document
      .getElementById("list-of-games-list")
      .removeChild(document.getElementById("list-of-games-list").firstChild);
  }
  const data = {};

  fetch("./backend/is_logged_in.php", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "content-type": "application/json" },
  })
    .then((response) => response.json())
    .then((data) => {
      data = JSON.stringify(data);
      data = JSON.parse(data);
      if (data.success) {
        displayUser(data.user);
      }
    })
    .catch((err) => console.error(err));
}

function logIn() {
  const username = document.getElementById("login-username").value;
  document.getElementById("login-username").value = "";
  if (username === "admin") {
    logInAdmin();
  } else {
    logInUser(username);
  }
}

function logInUser(username) {
  const data = { username: username };

  fetch("./backend/login.php", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "content-type": "application/json" },
  })
    .then((response) => response.json())
    .then((data) => {
      data = JSON.stringify(data);
      data = JSON.parse(data);
      if (data.success) {
        displayUser(data.user);
      } else {
        alert("Username does not exist");
      }
    })
    .catch((err) => console.error(err));
}

function displayUser(user) {
  document.getElementById("log-in").style.display = "none";
  document.getElementById("logged-in").style.display = "block";
  document.getElementById("create-user-container").style.display = "none";
  document.getElementById("list-of-games-container").style.display = "block";

  displayCurrentGame(user);
  displayActiveGames();
}

function displayCurrentGame(user) {
  document
    .getElementById("logged-in-game_id")
    .setAttribute("class", user.game_id);
  document
    .getElementById("logged-in-username")
    .setAttribute("class", user.username);
  if (user.game_id !== null) {
    document.getElementById("logged-in-username").innerHTML =
      "Hi, " + user.name;
    document.getElementById("logged-in-game").innerHTML =
      "Current game: " + user.current;
    document.getElementById("logged-in-target").innerHTML =
      "Your target is: " + user.target;
    document.getElementById("logged-in-round").innerHTML =
      "You have 3 days from the start of the round to eliminate your target, or you will be eliminated";
  } else {
    document.getElementById("logged-in-username").innerHTML = "No current game";
    document.getElementById("logged-in-game").innerHTML = "";
    document.getElementById("logged-in-target").innerHTML =
      "Join a game to be assigned a target. You are only allowed to be on one game at a time.";
    document.getElementById("logged-in-round").innerHTML = "";
  }
}

function displayActiveGames() {
  const data = {};
  fetch("./backend/get_games.php", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "content-type": "application/json" },
  })
    .then((response) => response.json())
    .then((data) => {
      data = JSON.stringify(data);
      data = JSON.parse(data);
      let currentGame = document
        .getElementById("logged-in-game_id")
        .getAttribute("class");
      while (document.getElementById("list-of-games-list").firstChild) {
        document
          .getElementById("list-of-games-list")
          .removeChild(
            document.getElementById("list-of-games-list").firstChild
          );
      }
      for (let i = 0; i < data.games.length; i++) {
        if (data.games[i].game_id != currentGame) {
          let game = document.createElement("p");
          game.innerHTML = data.games[i].game_name;
          game.setAttribute("id", data.games[i].game_id);
          game.addEventListener("click", clickGame);
          game.setAttribute("class", "game-list-item");
          document.getElementById("list-of-games-list").appendChild(game);
        }
      }
    })
    .catch((err) => console.error(err));
}

function clickGame(event) {
  let gameName = event.target.innerHTML;
  document.getElementById("join-game-container").style.display = "block";
  document.getElementById("join-game-name").innerHTML = gameName;
  document
    .getElementById("join-game-name")
    .setAttribute("class", event.target.getAttribute("id"));
  document.getElementById("logged-in").style.display = "none";
  document.getElementById("create-user-container").style.display = "none";
  document.getElementById("list-of-games-container").style.display = "none";
}

function logInAdmin() {
  let password = prompt("Please enter the admin password");
  const data = { password: password };

  fetch("./backend/get_admin.php", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "content-type": "application/json" },
  })
    .then((response) => response.json())
    .then((data) => {
      data = JSON.stringify(data);
      data = JSON.parse(data);
      console.log(data);
      if (data.success) {
        displayAdmin();
      } else {
        alert("Admin password is inccorect");
      }
    })
    .catch((err) => console.error(err));
}

function displayAdmin() {
  document.getElementById("log-in").style.display = "none";
  document.getElementById("logged-in-admin").style.display = "block";
  document.getElementById("create-user-container").style.display = "none";
}
