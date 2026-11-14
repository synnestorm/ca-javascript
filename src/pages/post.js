import { fetchSinglePost, deletePost, updatePost } from "../api/posts.js";
import { showLoader, hideLoader } from "../utils/loader.js";
import { showError, clearError } from "../utils/formValidation.js";
import { showStatus, clearStatus } from "../utils/statusMessage.js";

// Variables:
const container = document.getElementById("container");
const editDialog = document.getElementById("edit-post");
const confirmDelete = document.getElementById("confirm-delete");
const deleteDialog = document.getElementById("del-post");
const deleteStatus = deleteDialog.querySelector(".status");
const updateForm = document.getElementById("update-form");
const editStatus = updateForm.querySelector(".status");
const loader = document.getElementById("loader");

const status = document.querySelectorAll(".status");
const titleInput = document.getElementById("title");
const bodyInput = document.getElementById("body");
const mediaInput = document.getElementById("media");

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

let currentPost = null;

function showPost(post) {
  const loggedInUser = localStorage.getItem("username");
  if (!post) {
    container.innerHTML = "Could not get individual post.";
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
  postAuthor.textContent = `${post.author.name}:`;
  postCard.appendChild(postAuthor);

  if (post.media && post.media.url) {
    const postMedia = document.createElement("img");
    postMedia.className = "post-media";
    postMedia.src = post.media.url;
    postMedia.alt = post.title;
    postCard.appendChild(postMedia);
  }

  // Edit and Delete buttons on post card
  const btnContainer = document.createElement("div");
  btnContainer.className = "btn-container";

  if (post.author.name === loggedInUser) {
    const editBtn = document.createElement("button");
    editBtn.className = "edit-btn";
    editBtn.type = "button";
    editBtn.innerHTML = `<i class="fa-regular fa-pen-to-square"></i>`;
    editBtn.addEventListener("click", () => {
      currentPost = post;
      editDialog.showModal();
      titleInput.value = post.title;
      bodyInput.value = post.body;
      mediaInput.value = post.media?.url || "";
    });

    btnContainer.appendChild(editBtn);
    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.className = "delete-btn";
    deleteBtn.innerHTML = `<i class="fa-regular fa-trash-can"></i>`;
    deleteBtn.addEventListener("click", () => {
      deleteDialog.showModal();
    });

    confirmDelete.addEventListener("click", async () => {
      const success = await deletePost(post.id);
      if (success) {
        showStatus(deleteStatus, "Post deleted! Refreshing...", "success");

        setTimeout(function () {
          window.location.href = "posts.html";
        }, 2000);
      } else {
        showStatus(deleteStatus, "Delete failed. Please try again.", "error");

        setTimeout(function () {
          clearStatus(deleteStatus);
        }, 2000);
      }
    });
    btnContainer.appendChild(deleteBtn);
  }

  postCard.appendChild(postTitle);
  postCard.appendChild(postBody);
  postCard.appendChild(btnContainer);
  container.appendChild(postCard);
}

function showComments(post) {
  const commentHeader = document.createElement("h3");
  commentHeader.textContent = "Comments:";

  const commentSection = document.createElement("div");
  commentSection.className = "comment-section";

  commentSection.appendChild(commentHeader);

  if (!post.comments || post.comments.length === 0) {
    const noComments = document.createElement("p");
    noComments.className = "no-comments";
    noComments.textContent = "No comments yet!";
    commentSection.appendChild(noComments);
  } else {
    post.comments.forEach((comment) => {
      const commentCard = document.createElement("div");
      commentCard.className = "comment-card";

      const commentBody = document.createElement("p");
      commentBody.className = "comment-body";
      commentBody.textContent = comment.body;

      const commentOwner = document.createElement("p");
      commentOwner.className = "comment-owner";
      commentOwner.textContent = `${comment.owner}: `;

      commentCard.appendChild(commentOwner);
      commentCard.appendChild(commentBody);

      commentSection.appendChild(commentCard);
    });
  }
  container.appendChild(commentSection);
}

showLoader(loader);

try {
  if (!id) {
    container.textContent = "No ID provided!";
  } else {
    const post = await fetchSinglePost(id);
    if (post) {
      showPost(post);
      showComments(post);
    } else {
      container.textContent = "Could not load post.";
    }
  }
} catch (error) {
  console.error("Error loading posts:", error);
  container.textContent = "Something went wrong.";
} finally {
  hideLoader(loader);
}

function validateTitle() {
  const value = titleInput.value.trim();
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

updateForm.addEventListener("submit", async function (event) {
  event.preventDefault();
  clearStatus(status);

  if (validateForm()) {
    const updatedTitle = titleInput.value.trim();
    const updatedBody = bodyInput.value.trim();
    const mediaUrl = mediaInput.value.trim();

    const updatedMedia = mediaUrl
      ? {
          url: mediaUrl,
          alt: updatedTitle,
        }
      : null;
    const success = await updatePost(
      currentPost.id,
      updatedTitle,
      updatedBody,
      updatedMedia,
    );

    if (success) {
      showStatus(editStatus, "Post updated! Please wait...", "success");

      setTimeout(function () {
        window.location.href = `post.html?id=${currentPost.id}`;
      }, 2000);
    } else {
      showStatus(
        editStatus,
        "Failed to update post. Please try again.",
        "error",
      );
    }
  }
});
