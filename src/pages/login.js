import { loginUser, apiKey } from "../api/auth.js";

// DOM manipulation
const container = document.getElementById("container");
const loginForm = document.getElementById("login-form");
const email = document.getElementById("email");
const password = document.getElementById("password");

const status = document.createElement("p");
status.id = "status";

const register = document.createElement("a");
register.textContent = "Create account here!";
register.href = "pages/register.html";

loginForm.appendChild(status);
container.appendChild(register);

// Event Listener:

loginForm.addEventListener("submit", async function (event) {
  event.preventDefault();
  status.innerHTML = "";
  const enteredEmail = email.value.trim();
  const enteredPassword = password.value.trim();
  const success = await loginUser(enteredEmail, enteredPassword);

  if (success) {
    await apiKey();
    status.textContent = "Login successful! Redirecting...";
    status.className = "success";

    setTimeout(function () {
      window.location.href = "pages/posts.html";
    }, 1000);
  } else {
    status.textContent = "Invalid email or password.";
    status.className = "error";
  }
});
