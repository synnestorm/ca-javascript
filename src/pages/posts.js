import { fetchPosts } from "../api/posts.js";

const container = document.getElementById("container");

function showPosts(posts) {
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
    postAuthor.textContent = post.author.name;

    if (post.media && post.media.url) {
      const postMedia = document.createElement("img");
      postMedia.className = "post-media";
      postMedia.src = post.media.url;
      postMedia.alt = post.title;
      postCard.appendChild(postMedia);
    }

    postCard.appendChild(postAuthor);
    postLink.appendChild(postTitle);
    postCard.appendChild(postLink);
    postCard.appendChild(postBody);
    container.appendChild(postCard);
  });
}

const posts = await fetchPosts();

if (posts) {
  showPosts(posts);
}
