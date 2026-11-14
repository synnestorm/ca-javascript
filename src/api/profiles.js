const API_BASE_URL = "https://v2.api.noroff.dev";

/**
 * Fetches a single profile, including the user's followers from the Noroff API
 *
 * @async
 * @function fetchProfile
 * @param {string} name - The username of the profile to fetch
 * @returns {Promise<Object|boolean>} - Returns a users profile if it succeeds, or false if it fails
 */
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

/**
 * Fetches a user's posts from the Noroff API
 *
 * @async
 * @function fetchProfilePosts
 * @param {string} name - The username of the profile whose posts to fetch
 * @returns {Promise<Array|boolean>} - Returns an array of the users posts if it succeeds, and false if it fails
 */
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
