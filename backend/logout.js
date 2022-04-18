function logOut(e) {
  console.log("logged out");
  fetch("logout.php")
    .then((response) => response.json())
    .then((data) => {
      data = JSON.stringify(data);
      data = JSON.parse(data);
      if (data.success) {
        document.getElementById("log-in").style.display = "block";
        document.getElementById("logged-in").style.display = "none";
      }
    })
    .catch((err) => console.error(err));
}
