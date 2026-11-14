import { registerUser } from "../api/auth.js";
import { showError, clearError } from "../utils/formValidation.js";
import { showStatus, clearStatus } from "../utils/statusMessage.js";

// Validation variables:
const emailError = document.getElementById("emailError");
const nameError = document.getElementById("nameError");
const passwordError = document.getElementById("passwordError");

// DOM manipulation
const status = document.getElementById("status");
const registerForm = document.getElementById("register-form");
const email = document.getElementById("email");
const username = document.getElementById("username");
const password = document.getElementById("password");

// Validation functions:

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
  clearStatus(status);

  if (validateForm()) {
    const success = await registerUser(
      username.value,
      email.value,
      password.value,
    );

    if (success) {
      showStatus(
        status,
        "Account created successfully! Redirecting...",
        "success",
      );

      setTimeout(function () {
        // testing the path to see if it works on github pages:
        window.location.href = "/ca-javascript/index.html";
      }, 2000);
    } else {
      showStatus(status, "Registration failed. Please try again.", "error");
    }
  }
});
