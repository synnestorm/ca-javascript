const API_BASE_URL = "https://v2.api.noroff.dev";
// API function, fetch posts:

export async function fetchProfile(name) {
  const profilesUrl = `${API_BASE_URL}/social/profiles/${name}`;
  try {
    const response = await fetch(profilesUrl, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        "X-Noroff-API-Key": localStorage.getItem("apiKey"),
      },
    });
    if (!response.ok) {
      throw new Error(`Error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Failed to fetch profiles!", error);
    return false;
  }
}
