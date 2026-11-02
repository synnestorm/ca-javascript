// API URLs:

const API_BASE_URL = "https://v2.api.noroff.dev";
const loginUrl = `${API_BASE_URL}/auth/login`;
const registerUrl = `${API_BASE_URL}/auth/register`;

// API calls
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
