import { loginUser } from "../api/auth.js";

// DOM manipulation
const container = document.getElementById("container");

const status = document.createElement("p");
status.id = "status";

const loginForm = document.createElement("form");
loginForm.className = "login-form";

const email = document.createElement("label");
email.textContent = "E-mail:";
email.setAttribute("for", "email");

const emailInput = document.createElement("input");
emailInput.placeholder = "email@koble.com";
emailInput.type = "email";
emailInput.name = "email";
emailInput.id = "email";
emailInput.required = true;

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

loginForm.appendChild(status);
loginForm.appendChild(email);
loginForm.appendChild(emailInput);
loginForm.appendChild(password);
loginForm.appendChild(passwordInput);
loginForm.appendChild(loginBtn);
container.appendChild(loginForm);
container.appendChild(register);

// Event Listener:

loginForm.addEventListener("submit", async function (event) {
  event.preventDefault();
  status.innerHTML = "";
  const enteredEmail = emailInput.value.trim();
  const enteredPassword = passwordInput.value.trim();
  const success = await loginUser(enteredEmail, enteredPassword);

  if (success) {
    status.innerHTML = "Login successful! Redirecting...";
    status.className = "success";

    // setTimeout(function () {
    //   window.location.href = "pages/posts.html";
    //  }, 1000);
  } else {
    status.innerHTML = "Invalid email or password.";
    status.className = "error";
  }
});
