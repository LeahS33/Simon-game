


let user = []
user = JSON.parse(localStorage.getItem("user")) || [];

let size = document.querySelectorAll("h1");
for (let i = 0; i < size.length; i++)
    size[i].style.fontSize = "60px";

let toLowerCase = document.getElementById("signUpLink").innerHTML.toLowerCase();
document.getElementById("signUpLink").innerHTML = toLowerCase;

//פונקציה להרשמה
function signUp() {
    let name = document.getElementById("name1").value;
    let password = document.getElementById("password1").value;
    let email = document.getElementById("email").value;
    if (name && password) {
        if (!checkInput(name, email, password)) {
            return;
        }
        user.push({ "name": name, "password": password, "email": email, "highScore": 0 });
       localStorage.setItem("user", JSON.stringify(user))
        sessionStorage.setItem("currentUser", name);
        window.location.href = '../html/game.html';
    }
    else alert('please enter your information.');
}


document.getElementById("_logIn").addEventListener("click", logIn);

//פונקציה לכניסה
function logIn() {
    let name = document.getElementById("name2").value;
    let password = document.getElementById("password2").value;
            let users = JSON.parse(localStorage.getItem("user")) || [];
if (name && password) {
        let userExists = users.some(user => user.name === name && user.password === password);
        if (userExists) {
            sessionStorage.setItem("currentUser", name);
            window.location.href = '../html/game.html';
        } else {
            alert('please sign up.');
            window.location.href = './signUp.html';
        }
    }
    else alert('please enter your name and password.');;
}

//פונקציה לבדיקות קלט
function checkInput(name, email, password) {
    let isValid = true;
    let errorMessages = [];

    if (name.length < 2) {
        errorMessages.push("Invalid name - name to short.");
        isValid = false;
        document.getElementById("name1").focus();
    }
    let a = /^[a-zA-z]+$/
    if (!a.test(name)) {
        errorMessages.push("Invalid name - characters that are not letters.");
        isValid = false;
        document.getElementById("name1").focus();
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errorMessages.push("Invalid email address.");
        isValid = false;
        document.getElementById("email").focus();
    }

    if (password.length < 4) {
        errorMessages.push("Password must be at least 4 characters.");
        isValid = false;
        document.getElementById("password1").focus();
    }

    if (!isValid) {
        alert(errorMessages.join("\n"));
    }

    return isValid;
}