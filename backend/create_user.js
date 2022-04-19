function createUser() {
  const name = document.getElementById("create-name").value;
  const username = document.getElementById("create-username").value;
  document.getElementById("create-username").value = "";
  document.getElementById("create-name").value = "";

  const data = { name: name, username: username };

  fetch("./backend/create_user.php", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "content-type": "application/json" },
  })
    .then((response) => response.json())
    .then((data) => {
      data = JSON.stringify(data);
      data = JSON.parse(data);
      if (data.success) {
        alert("User created, you can now log in");
        document
          .getElementById("logged-in-username")
          .setAttribute("class", username);
      } else {
        alert("Username is already taken");
      }
    })
    .catch((err) => console.error(err));
}
