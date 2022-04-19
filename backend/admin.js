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
  displayAdminActiveGames();
}

function displayAdminActiveGames() {
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
      while (document.getElementById("list-of-games-list-admin").firstChild) {
        document
          .getElementById("list-of-games-list-admin")
          .removeChild(
            document.getElementById("list-of-games-list-admin").firstChild
          );
      }
      for (let i = 0; i < data.games.length; i++) {
        let game = document.createElement("p");
        game.innerHTML = data.games[i].game_name;
        game.setAttribute("id", data.games[i].game_id);
        game.addEventListener("click", clickAdminGame);
        game.setAttribute("class", "game-list-item");
        document.getElementById("list-of-games-list-admin").appendChild(game);
      }
    })
    .catch((err) => console.error(err));
}

function clickAdminGame(event) {
  let gameName = event.target.innerHTML;
  document.getElementById("game_name").setAttribute("class", gameName);
  document
    .getElementById("manage-game-list-of-players")
    .setAttribute("class", "manage-game-player");
  document.getElementById("manage-game-container").style.display = "block";
  document.getElementById("logged-in-admin").style.display = "none";
  document.getElementById("manage-game-name").innerHTML =
    "Manage players in game: " + gameName;
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

      for (let i = 0; i < data.users.length; i++) {
        let user = document.createElement("p");
        user.innerHTML = data.users[i].username;
        user.setAttribute("id", data.users[i].username);
        user.addEventListener("click", clickAdminManageUser);
        user.setAttribute("class", data.users[i].eliminated);
        document
          .getElementById("manage-game-list-of-players")
          .appendChild(user);
      }
    })
    .catch((err) => console.error(err));
}

function updateAdminGame(gameName) {
  document.getElementById("manage-user-container").style.display = "none";
  document
    .getElementById("manage-game-list-of-players")
    .setAttribute("class", "manage-game-player");
  document.getElementById("manage-game-container").style.display = "block";
  document.getElementById("logged-in-admin").style.display = "none";
  document.getElementById("manage-game-name").innerHTML =
    "Manage players in game: " + gameName;
  document.getElementById("game_name").setAttribute("class", gameName);
  const data = { name: gameName };
  while (document.getElementById("manage-game-list-of-players").firstChild) {
    document
      .getElementById("manage-game-list-of-players")
      .removeChild(
        document.getElementById("manage-game-list-of-players").firstChild
      );
  }

  fetch("./backend/get_players.php", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "content-type": "application/json" },
  })
    .then((response) => response.json())
    .then((data) => {
      data = JSON.stringify(data);
      data = JSON.parse(data);

      for (let i = 0; i < data.users.length; i++) {
        let user = document.createElement("p");
        user.innerHTML = data.users[i].username;
        user.setAttribute("id", data.users[i].username);
        user.addEventListener("click", clickAdminManageUser);
        user.setAttribute("class", data.users[i].eliminated);
        document
          .getElementById("manage-game-list-of-players")
          .appendChild(user);
      }
    })
    .catch((err) => console.error(err));
}

function clickAdminManageUser(event) {
  let user = event.target.innerHTML;
  document.getElementById("manage-user-container").style.display = "block";
  document.getElementById("manage-game-container").style.display = "none";

  document.getElementById("manage-user-name").innerHTML =
    "Manage " + user + ":";
  document.getElementById("manage-user-name").setAttribute("class", user);

  let eliminatedStatus = document.getElementById(user).getAttribute("class");
  document.getElementById("eliminated").innerHTML =
    "Eliminated: " + eliminatedStatus;
}

function deleteUser() {
  let user = document.getElementById("manage-user-name").getAttribute("class");
  const data = { username: user };

  fetch("./backend/delete_player.php", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "content-type": "application/json" },
  })
    .then((response) => response.json())
    .then((data) => {
      data = JSON.stringify(data);
      data = JSON.parse(data);

      if (data.success) {
        updateAdminGame(data.game_name);
      }
    })
    .catch((err) => console.error(err));
}

function eliminateUser() {
  let user = document.getElementById("manage-user-name").getAttribute("class");
  let eliminatedStatus = document.getElementById(user).getAttribute("class");

  const data = { username: user, eliminated: eliminatedStatus };

  fetch("./backend/eliminate_player.php", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "content-type": "application/json" },
  })
    .then((response) => response.json())
    .then((data) => {
      data = JSON.stringify(data);
      data = JSON.parse(data);

      if (data.success) {
        document.getElementById("eliminated").innerHTML =
          "Eliminated: " + data.eliminated;
      }
      document.getElementById(user).setAttribute("class", data.eliminated);
    })
    .catch((err) => console.error(err));
}

function assignTargets() {
  console.log("Assigning targets");

  // TODO
}

function eliminateUsers() {
  console.log("Eliminating Users who have not killed their target yet");
  let gameName = document.getElementById("game_name").getAttribute("class");

  const data = { name: gameName };

  fetch("./backend/eliminate_players.php", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "content-type": "application/json" },
  })
    .then((response) => response.json())
    .then((data) => {
      data = JSON.stringify(data);
      data = JSON.parse(data);

      console.log(data.success);
    })
    .catch((err) => console.error(err));
}

function backButtonUserAdmin() {
  document.getElementById("manage-user-container").style.display = "none";
  document.getElementById("manage-game-container").style.display = "block";
}

function backButtonAdmin() {
  while (document.getElementById("manage-game-list-of-players").firstChild) {
    document
      .getElementById("manage-game-list-of-players")
      .removeChild(
        document.getElementById("manage-game-list-of-players").firstChild
      );
  }
  document.getElementById("manage-game-container").style.display = "none";
  document.getElementById("logged-in-admin").style.display = "block";
}
