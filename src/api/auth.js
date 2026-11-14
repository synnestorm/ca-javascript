// API URLs:

const API_BASE_URL = "https://v2.api.noroff.dev";
const loginUrl = `${API_BASE_URL}/auth/login`;
const registerUrl = `${API_BASE_URL}/auth/register`;
const apiKeyUrl = `${API_BASE_URL}/auth/create-api-key`;

/**
 * Logs in a user by sending their data to Noroff API
 * Stores authentication token and username in localStorage
 *
 * @async
 * @function loginUser
 * @param {string} email - The user's email address
 * @param {string} password - The user's password
 * @returns {Promise<boolean>} Returns true if login attempt succeeds or false if it fails
 */
export async function loginUser(email, password) {
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
 * Registers a user by sending their data to Noroff API
 *
 * @async
 * @function registerUser
 * @param {string} username - The user's username
 * @param {string} email - The user's email address
 * @param {string} password - The user's password
 * @returns {Promise<boolean>} Returns true if registration succeeds or false if it fails
 */
export async function registerUser(username, email, password) {
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

// create API key

export async function apiKey() {
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
