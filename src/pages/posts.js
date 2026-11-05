import { fetchPosts, createPost, deletePost } from "../api/posts.js";

const container = document.getElementById("container");
const loader = document.getElementById("loader");
const createForm = document.getElementById("create-form");
const status = document.getElementById("status");
const delStatus = document.getElementById("del-status");
const titleError = document.getElementById("titleError");

function showPosts(posts) {
  const loggedInUser = localStorage.getItem("username");
  if (!posts || posts.length === 0) {
    container.innerHTML = "Could not show all posts.";
    return;
  }
  container.innerHTML = "";
  posts.forEach((post) => {
    const postCard = document.createElement("div");
    postCard.className = "post-card";

    const postTitle = document.createElement("h2");
    postTitle.className = "post-title";
    postTitle.textContent = post.title;

    const postLink = document.createElement("a");
    postLink.className = "post-link";
    postLink.href = `post.html?id=${post.id}`;

    const postBody = document.createElement("p");
    postBody.className = "post-body";
    postBody.textContent = post.body;

    const postAuthor = document.createElement("p");
    postAuthor.className = "post-author";
    postAuthor.textContent = `${post.author.name}:`;

    postCard.appendChild(postAuthor);

    if (post.media && post.media.url) {
      const postMedia = document.createElement("img");
      postMedia.className = "post-media";
      postMedia.src = post.media.url;
      postMedia.alt = post.title;
      postCard.appendChild(postMedia);
    }
    const btnContainer = document.createElement("div");
    btnContainer.className = "btn-container";

    if (post.author.name === loggedInUser) {
      const moreBtn = document.createElement("a");
      moreBtn.className = "button more";
      moreBtn.href = `post.html?id=${post.id}`;
      moreBtn.innerHTML = `<i class="fa-solid fa-ellipsis"></i>`;

      btnContainer.appendChild(moreBtn);
    }

    postLink.appendChild(postTitle);
    postCard.appendChild(postLink);
    postCard.appendChild(postBody);
    postCard.appendChild(btnContainer);
    container.appendChild(postCard);
  });
}

loader.style.display = "flex";

try {
  const posts = await fetchPosts();

  if (posts) {
    showPosts(posts);
  } else {
    container.textContent = "Could not load posts. Please try again later!";
  }
} catch (error) {
  console.error("Error loading posts:", error);
  container.textContent = "Something went wrong.";
} finally {
  loader.style.display = "none";
}

// creating post and validation

function showError(el, message) {
  el.textContent = message;
}

function clearError(el) {
  el.textContent = "";
}

function validateTitle() {
  const value = title.value.trim();
  if (value.length === 0) {
    showError(titleError, "Title is required!");
    return false;
  }
  clearError(titleError);
  return true;
}

function validateForm() {
  return validateTitle();
}

createForm.addEventListener("submit", async function (event) {
  event.preventDefault();
  status.textContent = "";

  if (validateForm()) {
    const createBody = body.value.trim();
    const mediaUrl = media.value.trim();

    const createMedia = mediaUrl
      ? {
          url: mediaUrl,
          alt: "This is an image created inside a post.",
        }
      : null;
    const success = await createPost(
      title.value.trim(),
      createBody,
      createMedia,
    );

    if (success) {
      status.textContent = "Post created successfully! Please wait...";
      status.className = "success";

      setTimeout(function () {
        window.location.href = "posts.html";
      }, 2000);
    } else {
      status.textContent = "Creating post failed. Please try again.";
      status.className = "error";
    }
  }
});
