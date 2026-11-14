import { API_BASE_URL } from "../config.js";

/**
 * Logs in a user by sending their data to Noroff API.
 * Stores authentication token and username in localStorage.
 *
 * @async
 * @function loginUser
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 * @returns {Promise<boolean>} - Returns true if login attempt succeeds or false if it fails.
 */
export async function loginUser(email, password) {
  const loginUrl = `${API_BASE_URL}/auth/login`;
  try {
    const response = await fetch(loginUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    if (!response.ok) {
      return false;
    }
    const data = await response.json();
    localStorage.setItem("authToken", data.data.accessToken);
    localStorage.setItem("username", data.data.name);
    return true;
  } catch (error) {
    console.error("Failed to fetch authentication.", error);
    return false;
  }
}

/**
 * Registers a user by sending their data to Noroff API.
 *
 * @async
 * @function registerUser
 * @param {string} username - The user's username.
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 * @returns {Promise<boolean>} - Returns true if registration succeeds or false if it fails.
 */
export async function registerUser(username, email, password) {
  const registerUrl = `${API_BASE_URL}/auth/register`;
  try {
    const response = await fetch(registerUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: username,
        email: email,
        password: password,
      }),
    });
    if (!response.ok) {
      return false;
    }
    return true;
  } catch (error) {
    console.error("Failed to fetch authentication.", error);
    return false;
  }
}

/**
 * Creates an API Key for the Noroff API and stores it in localStorage.
 *
 * @async
 * @function apiKey
 * @returns {Promise<string|boolean>} - Returns an API key if it succeeds, and false if it fails.
 */
export async function apiKey() {
  const apiKeyUrl = `${API_BASE_URL}/auth/create-api-key`;
  try {
    const response = await fetch(apiKeyUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });
    if (!response.ok) {
      throw new Error(`Error! Status: ${response.status}`);
    }
    const data = await response.json();
    localStorage.setItem("apiKey", data.data.key);
    return data.data.key;
  } catch (error) {
    console.error("Failed to fetch authentication.", error);
    return false;
  }
}
