// API URLs:

const API_BASE_URL = "https://v2.api.noroff.dev";
const loginUrl = `${API_BASE_URL}/auth/login`;
const registerUrl = `${API_BASE_URL}/auth/register`;

// API async function, login:
export async function loginUser(email, password) {
  try {
    console.log("Login request:", {
      email: email,
      passwordType: typeof password,
    });
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

// API async function, register:

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
      // testing if successfull
      const errorData = await response.json();
      console.log("Server error details:", errorData);
      return false;
    }
    // testing if successful:
    console.log("Registration successful! Status:", response.status);
    const data = await response.json();
    return true;
  } catch (error) {
    console.error("Failed to fetch authentication.", error);
    return false;
  }
}
