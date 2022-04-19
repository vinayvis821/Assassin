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
        game.setAttribute("class", "manage-game-item");
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
        user.innerHTML = data.users[i].username + ": " + data.users[i].name;
        user.setAttribute("id", data.users[i].username);
        user.addEventListener("click", clickAdminManageUser);
        user.setAttribute(
          "class",
          data.users[i].eliminated == "yes" ? "strikethrough" : ""
        );
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
        user.innerHTML = data.users[i].username + ": " + data.users[i].name;
        console.log(user);
        user.setAttribute("id", data.users[i].username);
        user.addEventListener("click", clickAdminManageUser);
        user.setAttribute(
          "class",
          data.users[i].eliminated == "yes" ? "strikethrough" : ""
        );

        document
          .getElementById("manage-game-list-of-players")
          .appendChild(user);
      }
    })
    .catch((err) => console.error(err));
}

function clickAdminManageUser(event) {
  let user = String(event.target.innerHTML);
  let index = user.indexOf(":");
  user = user.substring(0, index);
  document.getElementById("manage-user-container").style.display = "block";
  document.getElementById("manage-game-container").style.display = "none";

  document.getElementById("manage-user-name").innerHTML =
    "Manage " + user + ":";
  document.getElementById("manage-user-name").setAttribute("class", user);

  let eliminatedStatus = document.getElementById(user).getAttribute("class");
  eliminatedStatus = eliminatedStatus == "strikethrough" ? "yes" : "no";
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
  eliminatedStatus = eliminatedStatus == "strikethrough" ? "yes" : "no";

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
        eliminatedStatus = data.eliminated == "yes" ? "strikethrough" : "";
      }
      document.getElementById(user).setAttribute("class", eliminatedStatus);
    })
    .catch((err) => console.error(err));
}

function assignTargets() {
  let game_name = document.getElementById("game_name").getAttribute("class");

  const data = { name: game_name };

  fetch("./backend/get_players.php", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "content-type": "application/json" },
  })
    .then((response) => response.json())
    .then((data) => {
      data = JSON.stringify(data);
      data = JSON.parse(data);

      if (data.success) {
        updatePlayerTargets(data.users);
      }
      alert("Players have been randomnly assigned targets");
    })
    .catch((err) => console.error(err));
}

function updatePlayerTargets(users) {
  let playerList = [];
  for (let i = 0; i < users.length; i++) {
    if (users[i].eliminated == "no") {
      playerList.push(users[i].username);
    }
  }
  let player_targets = {};
  let len = playerList.length;
  if (len < 2) {
    alert("Not enough players to assign targets. Minimum amount needed: 2");
  } else {
    shuffle(playerList);
    for (let i = 0; i < len; i++) {
      let key = String(playerList[i]);
      if (i == len - 1) {
        player_targets[key] = playerList[0];
      } else {
        player_targets[key] = playerList[i + 1];
      }
    }

    const data = { assignments: player_targets };

    fetch("./backend/assign_targets.php", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "content-type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        data = JSON.stringify(data);
        data = JSON.parse(data);
      })
      .catch((err) => console.error(err));
  }
}

function shuffle(arr) {
  arr.sort(() => Math.random() - 0.5);
}

function eliminateUsers() {
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

function addGame() {
  let name = prompt("Enter a name for a game");
  let password = prompt("Enter a password for: " + name);

  const data = { name: name, password: password };

  fetch("./backend/add_game.php", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "content-type": "application/json" },
  })
    .then((response) => response.json())
    .then((data) => {
      data = JSON.stringify(data);
      data = JSON.parse(data);

      if (data.success) {
        displayAdminActiveGames();
      } else {
        alert("Game name already exists");
      }
    })
    .catch((err) => console.error(err));
}

function changePassword() {
  let game_name = document.getElementById("game_name").getAttribute("class");

  let new_password = prompt("Enter a new password for game: " + game_name);
  const data = { new_password, new_password, game_name: game_name };

  fetch("./backend/change_password.php", {
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
