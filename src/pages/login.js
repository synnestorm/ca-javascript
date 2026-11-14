import { loginUser, apiKey } from "../api/auth.js";
import { showStatus, clearStatus } from "../utils/statusMessage.js";

// DOM manipulation
const loginForm = document.getElementById("login-form");
const email = document.getElementById("email");
const password = document.getElementById("password");
const status = document.getElementById("status");

// Event Listener:

loginForm.addEventListener("submit", async function (event) {
  event.preventDefault();
  clearStatus(status);
  const enteredEmail = email.value.trim();
  const enteredPassword = password.value;
  const success = await loginUser(enteredEmail, enteredPassword);

  if (success) {
    const keyIsCreated = await apiKey();
    if (!keyIsCreated) {
      showStatus(
        status,
        "Login successful, but failed to create API Key! Please refresh.",
        "success",
      );
      return;
    }
    showStatus(status, "Login successful! Refreshing...", "success");
    setTimeout(function () {
      window.location.href = "pages/posts.html";
    }, 2000);
  } else {
    showStatus(status, "Invalid email or password", "error");
  }
});
