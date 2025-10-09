var users = JSON.parse(localStorage.getItem("users")) || [];

function SignUp(event) {
    event.preventDefault();

    var FirstName = document.getElementById("FirstName");
    var SecondName = document.getElementById("SecondName");
    var email = document.getElementById("email");
    var password = document.getElementById("password");

    var user = new User(
        FirstName.value,
        SecondName.value,
        email.value,
        password.value
    );

    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
    console.log("Saving user:", user);

    event.target.reset();

    document.getElementById("signup").style.display = "none";
    document.getElementById("signin").style.display = "block";
}

class User {
    constructor(FirstName, SecondName, email, password) {
        this.FirstName = FirstName;
        this.SecondName = SecondName;
        this.email = email;
        this.password = password;
    }
}

function SignIn(event) {
    event.preventDefault();

    var InputEmail = document.getElementById("given-email").value;
    var InputPassword = document.getElementById("given-password").value;
    event.target.reset();

    var found = false;

    for (var i = 0; i < users.length; i++) {
        if (users[i].email === InputEmail && users[i].password === InputPassword) {
            alert("Logged in successfully!");
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

function showSignUp() {
    document.getElementById("signup").style.display = "block";
    document.getElementById("signin").style.display = "none";
}

function showSignIn() {
    document.getElementById("signin").style.display = "block";
    document.getElementById("signup").style.display = "none";
}
