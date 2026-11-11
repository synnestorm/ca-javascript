import { fetchProfile } from "../api/profiles.js";

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

  const posts = showStatistics("Posts:", profile._count.posts);
  const followers = showStatistics("Followers:", profile._count.followers);
  const following = showStatistics("Following:", profile._count.following);

  profileContainer.appendChild(profileAvatar);
  profileInfoDiv.appendChild(profileName);
  profileInfoDiv.appendChild(profileEmail);
  profileContainer.appendChild(profileInfoDiv);

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
  const profileNames = name || username;

  if (!profileNames) {
    container.innerHTML = "Could not load profile.";
  } else {
    const profile = await fetchProfile(profileNames);
    showProfile(profile);
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
