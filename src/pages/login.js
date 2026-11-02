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

const loginBtn = document.createElement("button");
loginBtn.className = "login-btn";
loginBtn.textContent = "Sign In";
loginBtn.type = "submit";

const register = document.createElement("a");
register.textContent = "Create account here!";
register.href = "pages/register.html";

loginForm.appendChild(username);
loginForm.appendChild(usernameInput);
loginForm.appendChild(password);
loginForm.appendChild(passwordInput);
loginForm.appendChild(loginBtn);
container.appendChild(loginForm);
container.appendChild(register);
