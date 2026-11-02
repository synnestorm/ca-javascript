// DOM manipulation
const container = document.getElementById("container");

const loginForm = document.createElement("form");
loginForm.className = "login-form";

const username = document.createElement("label");
username.textContent = "Username:";
username.setAttribute("for", "username");

const usernameInput = document.createElement("input");
usernameInput.placeholder = "koble2026";
usernameInput.type = "text";
usernameInput.name = "username";
usernameInput.id = "username";
usernameInput.maxLength = "25";
usernameInput.required = true;

const password = document.createElement("label");
password.textContent = "Password:";
password.setAttribute("for", "password");

const passwordInput = document.createElement("input");
passwordInput.type = "password";
passwordInput.name = "password";
passwordInput.id = "password";
passwordInput.maxLength = "25";
passwordInput.required = true;

loginForm.appendChild(username);
loginForm.appendChild(usernameInput);
loginForm.appendChild(password);
loginForm.appendChild(passwordInput);
container.appendChild(loginForm);
