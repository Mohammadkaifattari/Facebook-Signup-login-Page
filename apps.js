var currentUser = JSON.parse(localStorage.getItem("currentUser"));
var users = JSON.parse(localStorage.getItem("users")) || [];

window.addEventListener("DOMContentLoaded", () => {
  if (window.location.pathname.includes("dashboard.html")) {
    if (!currentUser) {
      window.location.href = "index.html";
      return;
    }

    renderDashboard(currentUser);
  }
});

class User {
  constructor(FirstName, SecondName, fullName, email, password ) {
    this.FirstName = FirstName;
    this.SecondName = SecondName;
    this.fullName = fullName;
    this.email = email;
    this.password = password;
    this.sentRequests = [];
    this.receivedRequests = [];
    this.friends = [];
  }
}

function SignUp(event) {
  event.preventDefault();

  var FirstName = document.getElementById("FirstName").value;
  var SecondName = document.getElementById("SecondName").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var fullName = FirstName + " " + SecondName;

  var user = new User(FirstName, SecondName, fullName, email, password);
  if (users.some((u) => u.email === user.email)) {
    alert("Email already registered!");
    return;
  }

  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
  console.log("Saving user:", user);
  localStorage.setItem("pendingUserEmail", email);

  document.getElementById("signup").style.display = "none";
  document.getElementById("signin").style.display = "block";

  event.target.reset();
}

function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "index.html";
}

function SignIn(event) {
  event.preventDefault();

  var InputEmail = document.getElementById("given-email").value;
  var InputPassword = document.getElementById("given-password").value;

  var found = false;

  for (var i = 0; i < users.length; i++) {
    if (users[i].email === InputEmail && users[i].password === InputPassword) {
      localStorage.setItem("currentUser", JSON.stringify(users[i]));
      window.location.href = "dashboard.html";
      console.log("Login successful:", users[i]);

      found = true;

      break;
    }
  }

  if (!found) {
    alert("Invalid email or password");
    console.log("Login failed");
  }
}
function dash() {
  window.location.href = "dashboard.html";
}

function renderDashboard(currentUser) {
  // if (!window.location.href.includes("dashboard.html")) return;
  // if (!currentUser) {
  //   return;
  // }

  document.getElementById("currentUserName").innerText = currentUser.fullName;

  var userLogo = document.getElementById("user-logo");
  if (userLogo) {
    userLogo.innerHTML = `${currentUser.FirstName[0]}${currentUser.SecondName[0]}`;
  }

  console.log("Dashboard loaded for:", currentUser.fullName);
}

function showSignUp() {
  document.getElementById("signup").style.display = "block";
  document.getElementById("signin").style.display = "none";
}

function showSignIn() {
  document.getElementById("signin").style.display = "block";
  document.getElementById("signup").style.display = "none";
}

function friendsshow() {
  if (!currentUser) {
    alert("Please log in first.");
    window.location.href = "index.html";
    return;
  } else {
    window.location.href = "friends.html";
  }
}

//  // Days
//   const daySelect = document.getElementById('day');
//   for (let i = 1; i <= 31; i++) {
//     const option = document.createElement('option');
//     option.value = i;
//     option.textContent = i;
//     daySelect.appendChild(option);
//   }

//   // Months
//   const monthSelect = document.getElementById('month');
//   const months = [
//     'January', 'February', 'March', 'April', 'May', 'June',
//     'July', 'August', 'September', 'October', 'November', 'December'
//   ];
//   months.forEach((month, index) => {
//     const option = document.createElement('option');
//     option.value = index + 1;
//     option.textContent = month;
//     monthSelect.appendChild(option);
//   });

//   // Years (e.g. 1900–2025)
//   const yearSelect = document.getElementById('year');
//   const currentYear = new Date().getFullYear();
//   for (let i = currentYear; i >= 1900; i--) {
//     const option = document.createElement('option');
//     option.value = i;
//     option.textContent = i;
//     yearSelect.appendChild(option);
//   }