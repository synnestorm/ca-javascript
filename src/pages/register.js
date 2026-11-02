// DOM manipulation
const container = document.getElementById("container");

const registerForm = document.createElement("form");
registerForm.className = "register-form";

const email = document.createElement("label");
email.textContent = "E-mail:";
email.setAttribute("for", "email");

const emailInput = document.createElement("input");
emailInput.placeholder = "koble@koble.com";
emailInput.type = "email";
emailInput.name = "email";
emailInput.id = "email";
emailInput.required = true;

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

const registerBtn = document.createElement("button");
registerBtn.className = "register-btn";
registerBtn.textContent = "Create Account";
registerBtn.type = "submit";

const login = document.createElement("a");
login.textContent = "Already have an account? Sign in here!";
login.href = "../index.html";

registerForm.appendChild(email);
registerForm.appendChild(emailInput);
registerForm.appendChild(username);
registerForm.appendChild(usernameInput);
registerForm.appendChild(password);
registerForm.appendChild(passwordInput);
registerForm.appendChild(registerBtn);
container.appendChild(registerForm);
container.appendChild(login);
