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

  const commentHeader = document.createElement("h3");
  commentHeader.textContent = "Comments:";

  const commentSection = document.createElement("div");
  commentSection.className = "comment-section";

  if (post.comments.length === 0) {
    const noComments = document.createElement("p");
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

  postCard.appendChild(postAuthor);
  postCard.appendChild(postTitle);
  postCard.appendChild(postBody);
  postCard.appendChild(commentHeader);
  postCard.appendChild(commentSection);
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
