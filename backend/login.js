function logIn() {
  const username = document.getElementById("login-username").value;
  document.getElementById("login-username").value = "";
  if (username === "admin") {
    logInAdmin();
  } else {
    logInUser(username);
  }
  console.log(username);
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
      console.log(data);
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
  document.getElementById("logged-in-username").innerHTML = "Hi, " + user.name;
  document.getElementById("logged-in-target").innerHTML =
    "Your target is: " + user.target;
  document.getElementById("logged-in-round").innerHTML =
    "You have 3 days from the start of the round to eliminate your target, or you will be eliminated";
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
        document.getElementById("log-in").style.display = "none";
        document.getElementById("logged-in-admin").style.display = "block";
      } else {
        alert("Admin password is inccorect");
      }
    })
    .catch((err) => console.error(err));
}
