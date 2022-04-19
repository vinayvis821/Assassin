function joinGame() {
  let gameName = document.getElementById("join-game-name").innerHTML;
  let game_id = document.getElementById("join-game-name").getAttribute("class");
  let username = document
    .getElementById("logged-in-username")
    .getAttribute("class");
  let password_guess = prompt("Enter the password for " + gameName);
  const pass = { game_id: game_id, password_guess: password_guess };
  fetch("./backend/verify_game_password.php", {
    method: "POST",
    body: JSON.stringify(pass),
    headers: { "content-type": "application/json" },
  })
    .then((response) => response.json())
    .then((data) => {
      data = JSON.stringify(data);
      data = JSON.parse(data);
      if (data.success) {
        switchToGame(gameName, game_id, username);
      } else {
        alert("Incorrect password for " + gameName);
      }
    })
    .catch((err) => console.error(err));
}

function switchToGame(gameName, game_id, username) {
  const data = { name: gameName, id: game_id, username: username };
  fetch("./backend/join_game.php", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "content-type": "application/json" },
  })
    .then((response) => response.json())
    .then((data) => {
      data = JSON.stringify(data);
      data = JSON.parse(data);
      let user = data.user;
      document.getElementById("logged-in-username").innerHTML =
        "Hi, " + user.name;
      document.getElementById("logged-in-game_id").removeAttribute("class");
      document.getElementById("logged-in-game").innerHTML =
        "Current game: " + user.current;
      document
        .getElementById("logged-in-username")
        .setAttribute("class", user.username);
      document
        .getElementById("logged-in-game_id")
        .setAttribute("class", user.game_id);
      document.getElementById("logged-in-target").innerHTML =
        "Your target is: " + user.target;
      document.getElementById("logged-in-round").innerHTML =
        "You have 3 days from the start of the round to eliminate your target, or you will be eliminated";
      displayActiveGames();
      displayUserInfo(user, user.target);
      alert("You have joined game: " + gameName + ". Good luck!");
    })
    .catch((err) => console.error(err));

  document.getElementById("join-game-container").style.display = "none";
  document.getElementById("logged-in").style.display = "block";
  document.getElementById("create-user-container").style.display = "none";
  document.getElementById("list-of-games-container").style.display = "block";
}

function cancelJoinGame() {
  document.getElementById("join-game-container").style.display = "none";
  document.getElementById("logged-in").style.display = "block";
  document.getElementById("create-user-container").style.display = "none";
  document.getElementById("list-of-games-container").style.display = "block";
}
