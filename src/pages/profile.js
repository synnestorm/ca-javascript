import {
  fetchProfile,
  fetchProfilePosts,
  followProfile,
  unfollowProfile,
} from "../api/profiles.js";

const container = document.getElementById("container");
const postContainer = document.getElementById("post-container");

function showProfile(profile) {
  const loggedInUser = localStorage.getItem("username");
  if (!profile) {
    container.innerHTML = "Could not show all profiles.";
    return;
  }
  container.innerHTML = "";

  const profileCard = document.createElement("div");
  profileCard.className = "profile-card";

  const profileContainer = document.createElement("div");
  profileContainer.className = "profile-container";

  const profileAvatar = document.createElement("img");
  profileAvatar.className = "profile-avatar";
  profileAvatar.src = profile.avatar.url;
  profileAvatar.alt = profile.avatar.alt;

  const profileInfoDiv = document.createElement("div");
  profileInfoDiv.className = "profile-info";

  const profileName = document.createElement("h2");
  profileName.className = "profile-name";
  profileName.textContent = profile.name;

  const profileEmail = document.createElement("p");
  profileEmail.className = "profile-email";
  profileEmail.textContent = profile.email;

  const followBtn = document.createElement("button");
  followBtn.type = "button";
  followBtn.className = "follow-btn";
  followBtn.innerHTML = `<i class="fa-solid fa-user-plus"></i>`;
  if (profile.name === loggedInUser) {
    followBtn.style.display = "none";
  }
  let isFollowing = false;
  followBtn.addEventListener("click", async () => {
    followBtn.disabled = true;
    if (isFollowing) {
      const success = await unfollowProfile(profile.name);
      if (success) {
        isFollowing = false;
        followBtn.innerHTML = `<i class="fa-solid fa-user-plus"></i>`;
      }
    } else {
      const success = await followProfile(profile.name);
      if (success) {
        isFollowing = true;
        followBtn.innerHTML = `<i class="fa-solid fa-user-minus"></i>`;
      }
    }
    followBtn.disabled = false;
  });

  const statistics = document.createElement("div");
  statistics.className = "statistics-container";

  const posts = showStatistics("Posts:", profile._count.posts);
  const followers = showStatistics("Followers:", profile._count.followers);
  const following = showStatistics("Following:", profile._count.following);

  profileContainer.appendChild(profileAvatar);
  profileInfoDiv.appendChild(profileName);
  profileInfoDiv.appendChild(profileEmail);
  profileContainer.appendChild(profileInfoDiv);
  profileContainer.appendChild(followBtn);

  statistics.appendChild(posts);
  statistics.appendChild(followers);
  statistics.appendChild(following);

  container.appendChild(profileContainer);
  container.appendChild(statistics);
  container.appendChild(profileCard);
}

const params = new URLSearchParams(window.location.search);
const name = params.get("name");

try {
  const username = localStorage.getItem("username");
  const profileName = name || username;

  if (!profileName) {
    container.innerHTML = "Could not load profile.";
  } else {
    const profile = await fetchProfile(profileName);
    showProfile(profile);
    const posts = await fetchProfilePosts(profileName);
    showProfilePosts(posts, profileName);
  }
} catch (error) {
  console.error("Error loading profile:", error);
  container.innerHTML = "Something went wrong.";
}

function showStatistics(label, number) {
  const statistic = document.createElement("div");
  statistic.className = "statistic";

  const header = document.createElement("h3");
  header.textContent = label;

  const value = document.createElement("p");
  value.textContent = number;

  statistic.appendChild(header);
  statistic.appendChild(value);

  return statistic;
}

function showProfilePosts(posts, profileName) {
  const loggedInUser = localStorage.getItem("username");
  if (posts === false) {
    postContainer.textContent = "Could not load posts.";
    return;
  }
  if (!posts || posts.length === 0) {
    postContainer.innerHTML = "This user has no posts yet.";
    return;
  }
  postContainer.innerHTML = "";
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

    if (post.media && post.media.url) {
      const postMedia = document.createElement("img");
      postMedia.className = "post-media";
      postMedia.alt = post.title;
      postMedia.onerror = () => {
        postMedia.style.display = "none";
      };

      postMedia.src = post.media.url;

      postCard.appendChild(postMedia);
    }
    const btnContainer = document.createElement("div");
    btnContainer.className = "btn-container";

    if (profileName === loggedInUser) {
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
    postContainer.appendChild(postCard);
  });
}
