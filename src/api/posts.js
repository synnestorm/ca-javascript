const API_BASE_URL = "https://v2.api.noroff.dev";
const postsUrl = `${API_BASE_URL}/social/posts?_author=true&_comments=true`;
let posts = [];
// API function, fetch posts:

export async function fetchPosts() {
  try {
    const response = await fetch(postsUrl, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        "X-Noroff-API-Key": localStorage.getItem("apiKey"),
      },
    });
    if (!response.ok) {
      throw new Error(`Error! Status: ${response.status}`);
    }
    const data = await response.json();
    posts = data.data;
    return posts;
  } catch (error) {
    console.error("Failed to fetch posts!", error);
    return false;
  }
}

export async function fetchSinglePost(id) {
  const singlePostUrl = `${API_BASE_URL}/social/posts/${id}?_author=true&_comments=true&_reactions=true`;
  try {
    const response = await fetch(singlePostUrl, {
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
    console.error("Failed to fetch individual post!", error);
    return false;
  }
}

export async function createPost(title, body, media) {
  const createPostUrl = `${API_BASE_URL}/social/posts`;
  try {
    const response = await fetch(createPostUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        "X-Noroff-API-Key": localStorage.getItem("apiKey"),
      },
      body: JSON.stringify({
        title: title,
        ...(body && { body: body }),
        ...(media && { media: media }),
      }),
    });
    if (!response.ok) {
      throw new Error(`Error! Status: ${response.status}`);
    }
    return true;
  } catch (error) {
    console.error("Failed to create post!", error);
    return false;
  }
}

export async function deletePost(id) {
  const createDeleteUrl = `${API_BASE_URL}/social/posts/${id}`;
  try {
    const response = await fetch(createDeleteUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        "X-Noroff-API-Key": localStorage.getItem("apiKey"),
      },
    });
    if (!response.ok) {
      throw new Error(`Error! Status: ${response.status}`);
    }
    return true;
  } catch (error) {
    console.error("Failed to delete post!", error);
    return false;
  }
}

export async function updatePost(id) {
  const updateUrl = `${API_BASE_URL}/social/posts/${id}`;
  try {
    const response = await fetch(updateUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        "X-Noroff-API-Key": localStorage.getItem("apiKey"),
      },
      body: JSON.stringify({
        title: title,
        body: body,
        media: media,
      }),
    });
    if (!response.ok) {
      throw new Error(`Error! Status: ${response.status}`);
    }
    return true;
  } catch (error) {
    console.error("Failed to update post!", error);
    return false;
  }
}

export async function searchPost(query) {
  const searchUrl = `${API_BASE_URL}/social/posts/search?q=${query}`;
  try {
    const response = await fetch(searchUrl, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        "X-Noroff-API-Key": localStorage.getItem("apiKey"),
      },
    });
    if (!response.ok) {
      throw new Error(`Error! Status: ${response.status}`);
    }
    const data = await response.json();
    posts = data.data;
    return posts;
  } catch (error) {
    console.error("Failed to search posts!", error);
    return false;
  }
}
