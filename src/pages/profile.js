import { fetchProfiles } from "../api/profiles.js";

const container = document.getElementById("container");

function showProfile(profile) {
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

  const statistics = document.createElement("div");
  statistics.className = "statistics-container";

  const postsHeader = document.createElement("h3");
  postsHeader.className = "posts-header";
  postsHeader.textContent = "Posts:";

  const postsNumber = document.createElement("p");
  postsNumber.className = "posts-number";
  postsNumber.textContent = profile._count.posts;

  const followingHeader = document.createElement("h3");
  followingHeader.className = "following-header";
  followingHeader.textContent = "Following:";

  const followingNumber = document.createElement("p");
  followingNumber.className = "following-number";
  followingNumber.textContent = profile._count.following;

  const followersHeader = document.createElement("h3");
  followersHeader.className = "followers-header";
  followersHeader.textContent = "Followers:";

  const followersNumber = document.createElement("p");
  followersNumber.className = "followers-number";
  followersNumber.textContent = profile._count.followers;

  profileContainer.appendChild(profileAvatar);
  profileInfoDiv.appendChild(profileName);
  profileInfoDiv.appendChild(profileEmail);
  profileContainer.appendChild(profileInfoDiv);

  statistics.appendChild(postsHeader);
  statistics.appendChild(postsNumber);
  statistics.appendChild(followersHeader);
  statistics.appendChild(followersNumber);
  statistics.appendChild(followingHeader);
  statistics.appendChild(followingNumber);

  container.appendChild(profileContainer);
  container.appendChild(statistics);
  container.appendChild(profileCard);
}

try {
  const username = localStorage.getItem("username");

  if (!username) {
    container.innerHTML = "Could not load profile.";
  } else {
    const profile = await fetchProfiles(username);
    showProfile(profile);
  }
} catch (error) {
  console.error("Error loading profile:", error);
  container.innerHTML = "Something went wrong.";
}
