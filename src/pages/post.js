import { fetchSinglePost } from "../api/posts.js";

const container = document.getElementById("container");

function showPost(post) {
  if (!post) {
    container.innerHTML = "Could not individual post.";
    return;
  }

  container.textContent = "";

  const postCard = document.createElement("div");
  postCard.className = "post-card";

  const postTitle = document.createElement("h2");
  postTitle.className = "post-title";
  postTitle.textContent = post.title;

  const postBody = document.createElement("p");
  postBody.className = "post-body";
  postBody.textContent = post.body;

  const postAuthor = document.createElement("p");
  postAuthor.className = "post-author";
  postAuthor.textContent = post.author.name;

  if (post.media && post.media.url) {
    const postMedia = document.createElement("img");
    postMedia.className = "post-media";
    postMedia.src = post.media.url;
    postMedia.alt = post.title;
    postCard.appendChild(postMedia);
  }

  postCard.appendChild(postAuthor);
  postCard.appendChild(postTitle);
  postCard.appendChild(postBody);
  container.appendChild(postCard);
}

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

if (!id) {
  container.textContent = "No ID provided!";
} else {
  const post = await fetchSinglePost(id);
  if (post) {
    showPost(post);
  } else {
    container.textContent = "Could not load post.";
  }
}
