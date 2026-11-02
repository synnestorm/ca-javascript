import { registerUser } from "../api/auth.js";

// Validation variables:
const emailError = document.createElement("p");
emailError.id = "emailError";
const nameError = document.createElement("p");
nameError.id = "nameError";
const passwordError = document.createElement("p");
passwordError.id = "passwordError";

// DOM manipulation
const container = document.getElementById("container");
const status = document.createElement("p");

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

registerForm.appendChild(status);
registerForm.appendChild(email);
registerForm.appendChild(emailInput);
registerForm.appendChild(emailError);
registerForm.appendChild(username);
registerForm.appendChild(usernameInput);
registerForm.appendChild(nameError);
registerForm.appendChild(password);
registerForm.appendChild(passwordInput);
registerForm.appendChild(passwordError);
registerForm.appendChild(registerBtn);
container.appendChild(registerForm);
container.appendChild(login);

// Validation functions:

function showError(el, message) {
  el.innerHTML = message;
}

function clearError(el) {
  el.innerHTML = "";
}

function validateName() {
  let value = usernameInput.value.trim();
  if (value.length < 5) {
    showError(nameError, "Username must be at least 5 characters.");
    return false;
  }
  clearError(nameError);
  return true;
}

function validateEmail() {
  let value = emailInput.value.trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    showError(emailError, "Please enter a valid email address.");
    return false;
  }
  clearError(emailError);
  return true;
}

function validatePassword() {
  let value = passwordInput.value;
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
  status.innerHTML = "";

  if (validateForm()) {
    const success = await registerUser(
      usernameInput.value,
      emailInput.value,
      passwordInput.value,
    );

    if (success) {
      status.innerHTML = "Account created successfully! Redirecting...";
      status.className = "success";

      //  setTimeout(function () {
      //   window.location.href = "../index.html";
      //  }, 1000);
    } else {
      status.innerHTML = "Registration failed. Please try again.";
      status.className = "error";
    }
  } else {
    status.innerHTML = "Please correct the highlighted errors.";
    status.className = "error";
  }
});
