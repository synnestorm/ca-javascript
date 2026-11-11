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

  const profileAvatar = document.createElement("img");
  profileAvatar.className = "profile-avatar";
  profileAvatar.src = profile.avatar.url;
  profileAvatar.alt = profile.avatar.alt;

  const profileName = document.createElement("h2");
  profileName.className = "profile-name";
  profileName.textContent = profile.name;

  const profileEmail = document.createElement("p");
  profileEmail.className = "profile-email";
  profileEmail.textContent = profile.email;

  profileCard.appendChild(profileAvatar);
  profileCard.appendChild(profileName);

  profileCard.appendChild(profileEmail);
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
