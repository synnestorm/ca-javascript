// API URLs:

const API_BASE_URL = "https://v2.api.noroff.dev";
const loginUrl = `${API_BASE_URL}/auth/login`;
const registerUrl = `${API_BASE_URL}/auth/register`;
const apiKeyUrl = `${API_BASE_URL}/auth/create-api-key`;

// API async function, login authentication:
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
    return true;
  } catch (error) {
    console.error("Failed to fetch authentication.", error);
    return false;
  }
}

// API async function, register authentication:

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
    const data = await response.json();
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
