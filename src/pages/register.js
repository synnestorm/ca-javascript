import { registerUser } from "../api/auth.js";

// Validation variables:
const emailError = document.getElementById("emailError");
const nameError = document.getElementById("nameError");
const passwordError = document.getElementById("passwordError");

// DOM manipulation
const container = document.getElementById("container");
const status = document.createElement("p");
const registerForm = document.getElementById("register-form");
const email = document.getElementById("email");
const username = document.getElementById("username");
const password = document.getElementById("password");

registerForm.appendChild(status);
container.appendChild(login);

// Validation functions:

function showError(el, message) {
  el.textContent = message;
}

function clearError(el) {
  el.textContent = "";
}

function validateName() {
  const value = username.value.trim();
  if (value.length < 5) {
    showError(nameError, "Username must be at least 5 characters.");
    return false;
  }
  clearError(nameError);
  return true;
}

function validateEmail() {
  const value = email.value.trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    showError(emailError, "Please enter a valid email address.");
    return false;
  }
  clearError(emailError);
  return true;
}

function validatePassword() {
  const value = password.value;
  if (value.length < 8) {
    showError(passwordError, "Password must be at least 8 characters.");
    return false;
  }
  clearError(passwordError);
  return true;
}

function validateForm() {
  let okUsername = validateName();
  let okEmail = validateEmail();
  let okPassword = validatePassword();
  return okUsername && okEmail && okPassword;
}

// Event Listener:

registerForm.addEventListener("submit", async function (event) {
  event.preventDefault();
  status.textContent = "";

  if (validateForm()) {
    const success = await registerUser(
      username.value,
      email.value,
      password.value,
    );

    if (success) {
      status.textContent = "Account created successfully! Redirecting...";
      status.className = "success";

      setTimeout(function () {
        window.location.href = "../../index.html";
      }, 1000);
    } else {
      status.textContent = "Registration failed. Please try again.";
      status.className = "error";
    }
  }
});
