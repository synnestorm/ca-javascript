import { API_BASE_URL } from "../config.js";

/**
 * Fetches all posts from the Noroff API.
 *
 * @async
 * @function fetchPosts
 * @returns {Promise<Array|boolean>} - Returns an array of posts if it succeeds, or false if it fails.
 */
export async function fetchPosts() {
  const postsUrl = `${API_BASE_URL}/social/posts?_author=true&_comments=true`;
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
    return data.data;
  } catch (error) {
    console.error("Failed to fetch posts!", error);
    return false;
  }
}

/**
 * Fetches a single post from the Noroff API.
 *
 * @async
 * @function fetchSinglePost
 * @param {string} id - The spesific ID of the post.
 * @returns {Promise<Object|boolean>} - Returns the post object, or false if it fails.
 */
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

/**
 * Creates a post to the Noroff API.
 *
 * @async
 * @function createPost
 * @param {string} title - The title of the post.
 * @param {string} body - The optional body of the post.
 * @param {string} media - The optional URL of the media for the post.
 * @returns {Promise<boolean>} - Returns true if post is created and succeeds, or false if it fails.
 */
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

/**
 * Deletes a post through the Noroff API.
 *
 * @async
 * @function deletePost
 * @param {string} id - The ID of the post to delete.
 * @returns {Promise<boolean>} - Returns true if post is deleted successfully, or false if it fails.
 */
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

/**
 * Updates a post through the Noroff API.
 *
 * @async
 * @function updatePost
 * @param {string} id - The ID of the post to update.
 * @param {string} title - The title of the post to update.
 * @param {string} body - The body of the post to update.
 * @param {string} media - The media URL of the post to update.
 * @returns {Promise<boolean>} - Returns true if post is updated successfully, or false if it fails.
 */
export async function updatePost(id, title, body, media) {
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
    return data.data;
  } catch (error) {
    console.error("Failed to search posts!", error);
    return false;
  }
}
