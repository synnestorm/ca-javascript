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

loginForm.appendChild(username);
loginForm.appendChild(usernameInput);
container.appendChild(loginForm);
