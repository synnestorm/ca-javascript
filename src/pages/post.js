import { fetchSinglePost, deletePost, updatePost } from "../api/posts.js";

const container = document.getElementById("container");
const confirmEdit = document.getElementById("confirm-edit");
const editDialog = document.getElementById("edit-post");
const confirmDelete = document.getElementById("confirm-delete");
const deleteDialog = document.getElementById("del-post");

const status = document.getElementById("status");
const titleInput = document.getElementById("title");
const bodyInput = document.getElementById("body");
const mediaInput = document.getElementById("media");

function showPost(post) {
  const loggedInUser = localStorage.getItem("username");
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
    const editBtn = document.createElement("button");
    editBtn.className = "edit-btn";
    editBtn.type = "button";
    editBtn.innerHTML = `<i class="fa-regular fa-pen-to-square"></i>`;
    editBtn.addEventListener("click", () => {
      editDialog.showModal();
    });

    confirmEdit.addEventListener("click", async () => {
      const success = await updatePost(post.id);
      if (success) {
        status.textContent = "Post Updated! Refreshing...";
        status.className = "success";

        setTimeout(function () {
          window.location.href = `post.html?id=${post.id}`;
        }, 2000);
      } else {
        status.textContent = "Editing failed. Please try again.";
        status.className = "error";

        setTimeout(function () {
          status.textContent = "";
        }, 2000);
      }
      // kind of same logic as with confirmDelete. remember to import updatePost()!
      // need to get value from title, body and media
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
        status.textContent = "Post deleted! Refreshing...";
        status.className = "success";

        setTimeout(function () {
          window.location.href = "posts.html";
        }, 2000);
      } else {
        status.textContent = "Delete failed. Please try again.";
        status.className = "error";

        setTimeout(function () {
          status.textContent = "";
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

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

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

/* createForm.addEventListener("submit", async function (event) {
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
}); */
