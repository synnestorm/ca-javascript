const API_BASE_URL = "https://v2.api.noroff.dev";

export async function fetchProfile(name) {
  const profilesUrl = `${API_BASE_URL}/social/profiles/${name}?_followers=true`;
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

export async function fetchProfilePosts(name) {
  const profilePostsUrl = `${API_BASE_URL}/social/profiles/${name}/posts`;
  try {
    const response = await fetch(profilePostsUrl, {
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
    console.error("Failed to fetch profile posts!", error);
    return false;
  }
}

export async function followProfile(name) {
  const followProfileUrl = `${API_BASE_URL}/social/profiles/${name}/follow`;
  try {
    const response = await fetch(followProfileUrl, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        "X-Noroff-API-Key": localStorage.getItem("apiKey"),
      },
    });
    if (!response.ok) {
      throw new Error(`Error! Status: ${response.status}`);
    }
    return true;
  } catch (error) {
    console.error("Failed to follow!", error);
    return false;
  }
}

export async function unfollowProfile(name) {
  const unfollowProfileUrl = `${API_BASE_URL}/social/profiles/${name}/unfollow`;
  try {
    const response = await fetch(unfollowProfileUrl, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        "X-Noroff-API-Key": localStorage.getItem("apiKey"),
      },
    });
    if (!response.ok) {
      throw new Error(`Error! Status: ${response.status}`);
    }
    return true;
  } catch (error) {
    console.error("Failed to unfollow!", error);
    return false;
  }
}
