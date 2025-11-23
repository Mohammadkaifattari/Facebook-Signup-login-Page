// ===== GLOBAL DATA =====
var currentUser = JSON.parse(localStorage.getItem("currentUser"));

// If user already logged in → redirect from login/signup page
if (window.location.pathname.includes("index.html") && currentUser) {
  window.location.href = "dashboard.html";
}

var users = JSON.parse(localStorage.getItem("users")) || [];

// ===== USER CLASS =====
class User {
  constructor(FirstName, SecondName, fullName, email, password) {
    this.FirstName = FirstName;
    this.SecondName = SecondName;
    this.fullName = fullName;
    this.email = email;
    this.password = password;
    this.sentRequests = [];
    this.receivedRequests = [];
    this.friends = [];
    this.post = [];
  }
}

// ===== SIGN UP =====
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
  localStorage.setItem("currentUser", JSON.stringify(user));

  window.location.href = "dashboard.html";
  event.target.reset();
}

// ===== SIGN IN =====
function SignIn(event) {
  event.preventDefault();

  var InputEmail = document.getElementById("given-email").value;
  var InputPassword = document.getElementById("given-password").value;

  var foundUser = users.find(
    (u) => u.email === InputEmail && u.password === InputPassword
  );

  if (foundUser) {
    localStorage.setItem("currentUser", JSON.stringify(foundUser));
    window.location.href = "dashboard.html";
  } else {
    alert("Invalid email or password");
  }
}

// ===== LOGOUT =====
function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "index.html";
}

// ===== NAVIGATION =====
function dash() {
  window.location.href = "dashboard.html";
}

function friendsshow() {
  if (!currentUser) {
    alert("Please log in first.");
    window.location.href = "index.html";
  } else {
    window.location.href = "friends.html";
  }
}

// ===== SWITCH FORMS =====
function showSignUp() {
  document.getElementById("signup").style.display = "block";
  document.getElementById("signin").style.display = "none";
}

function showSignIn() {
  document.getElementById("signin").style.display = "block";
  document.getElementById("signup").style.display = "none";
}

 // Days
  const daySelect = document.getElementById('day');
  for (let i = 1; i <= 31; i++) {
    const option = document.createElement('option');
    option.value = i;
    option.textContent = i;
    daySelect.appendChild(option);
  }

  // Months
  const monthSelect = document.getElementById('month');
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  months.forEach((month, index) => {
    const option = document.createElement('option');
    option.value = index + 1;
    option.textContent = month;
    monthSelect.appendChild(option);
  });

  // Years (e.g. 1900–2025)
  const yearSelect = document.getElementById('year');
  const currentYear = new Date().getFullYear();
  for (let i = currentYear; i >= 1900; i--) {
    const option = document.createElement('option');
    option.value = i;
    option.textContent = i;
    yearSelect.appendChild(option);
  }
