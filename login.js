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
  const password = document.getElementById("login-password").value;
  document.getElementById("login-password").value = "";
  logInUser(username, password);
}

function logInUser(username, password) {
  const data = { username: username, password: password };

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
        alert("Username does not exist or password is incorrect");
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
    if (user.eliminated == "no") {
      const data = { name: user.target };

      fetch("./backend/get_name.php", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "content-type": "application/json" },
      })
        .then((response) => response.json())
        .then((data) => {
          data = JSON.stringify(data);
          data = JSON.parse(data);
          displayUserInfo(user, data.target_name);
        })
        .catch((err) => console.error(err));
    } else {
      document.getElementById("logged-in-username").innerHTML =
        "Hi, " + user.name;
      document.getElementById("logged-in-game").innerHTML =
        "Current game: " + user.current;
      document.getElementById("logged-in-target").innerHTML =
        "You have been eliminated";
      document.getElementById("logged-in-round").innerHTML =
        "You are not allowed to eliminated anyone";
      displayActiveUsers(user.current);
    }
  } else {
    document.getElementById("acive-users").innerHTML =
      "Join a game to see active players";
    while (document.getElementById("active-users-list").firstChild) {
      document
        .getElementById("active-users-list")
        .removeChild(document.getElementById("active-users-list").firstChild);
    }
    document.getElementById("logged-in-username").innerHTML = "No current game";
    document.getElementById("logged-in-game").innerHTML = "";
    document.getElementById("logged-in-target").innerHTML =
      "Join a game to be assigned a target. You are only allowed to be on one game at a time.";
    document.getElementById("logged-in-round").innerHTML = "";
  }
}

function displayActiveUsers(gameName) {
  // check if game has started
  let hasStarted = false;

  const start = { name: gameName };
  fetch("./backend/has_started.php", {
    method: "POST",
    body: JSON.stringify(start),
    headers: { "content-type": "application/json" },
  })
    .then((response) => response.json())
    .then((start) => {
      start = JSON.stringify(start);
      start = JSON.parse(start);

      let p = document.createElement("p");
      if (start.started == "yes") {
        hasStarted = true;
        p.innerHTML = "The game has started";
      } else {
        p.innerHTML = "The game has not yet started";
      }
      document
        .getElementById("active-users-list")
        .insertBefore(
          p,
          document.getElementById("active-users-list").firstChild
        );
    })
    .catch((err) => console.error(err));

  document.getElementById("acive-users").innerHTML =
    "Active players in: " + gameName;

  const data = { name: gameName };

  fetch("./backend/get_players.php", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "content-type": "application/json" },
  })
    .then((response) => response.json())
    .then((data) => {
      data = JSON.stringify(data);
      data = JSON.parse(data);
      while (document.getElementById("active-users-list").firstChild) {
        document
          .getElementById("active-users-list")
          .removeChild(document.getElementById("active-users-list").firstChild);
      }

      let count = 0;
      for (let i = 0; i < data.users.length; i++) {
        if (data.users[i].eliminated !== "yes") {
          count++;
          let p = document.createElement("p");
          p.innerHTML = data.users[i].username + ": " + data.users[i].name;
          document.getElementById("active-users-list").appendChild(p);
        }
      }

      if (count == 1) {
        let p = document.createElement("p");
        if (hasStarted) {
          p.innerHTML = "The game is over, a player has won";
        } else {
          p.innerHTML = "The game has not currently started yet";
        }
        document
          .getElementById("active-users-list")
          .removeChild(document.getElementById("active-users-list").firstChild);
        document
          .getElementById("active-users-list")
          .insertBefore(
            p,
            document.getElementById("active-users-list").firstChild
          );
      }
    });
}

function displayUserInfo(user, targetName) {
  document.getElementById("logged-in-username").innerHTML = "Hi, " + user.name;
  document.getElementById("logged-in-game").innerHTML =
    "Current game: " + user.current;
  // if (user.target_eliminated == "yes") {
  //   document.getElementById("logged-in-target").innerHTML =
  //     "Your target has been eliminated, good job";
  // } else {
  document.getElementById("logged-in-target").innerHTML =
    "Your target is: " + targetName;
  // }
  document.getElementById("logged-in-round").innerHTML =
    "You have 3 days from the start of the round to eliminate your target, or you will be eliminated";
  displayActiveUsers(user.current);
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
