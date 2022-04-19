function logOut(e) {
  fetch("./backend/logout.php")
    .then((response) => response.json())
    .then((data) => {
      data = JSON.stringify(data);
      data = JSON.parse(data);
      if (data.success) {
        document.getElementById("log-in").style.display = "block";
        document.getElementById("logged-in").style.display = "none";
        document.getElementById("list-of-games-container").style.display =
          "none";
        document.getElementById("create-user-container").style.display =
          "block";
        document.getElementById("logged-in-admin").style.display = "none";
        document.getElementById("logged-in-username").removeAttribute("class");
        document.getElementById("logged-in-game_id").removeAttribute("class");
        document.getElementById("logged-in-game").removeAttribute("class");
        while (document.getElementById("list-of-games-list").firstChild) {
          document
            .getElementById("list-of-games-list")
            .removeChild(
              document.getElementById("list-of-games-list").firstChild
            );
        }
      }
    })
    .catch((err) => console.error(err));
}
