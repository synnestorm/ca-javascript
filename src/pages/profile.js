import { fetchProfiles } from "../api/profiles.js";

const container = document.getElementById("container");

function showProfiles(profiles) {
  if (!profiles || profiles.length === 0) {
    container.innerHTML = "Could not show all profiles.";
    return;
  }
  container.innerHTML = "";
  profiles.forEach((profile) => {
    const profileCard = document.createElement("div");
    profileCard.className = "profile-card";

    const profileName = document.createElement("h2");
    profileName.className = "profile-name";
    profileName.textContent = profile.name;

    const profileEmail = document.createElement("p");
    profileEmail.className = "profile-email";
    profileEmail.textContent = profile.email;

    profileCard.appendChild(profileName);

    profileCard.appendChild(profileEmail);
    container.appendChild(profileCard);
  });
}

try {
  const profiles = await fetchProfiles();

  if (profiles) {
    showProfiles(profiles);
  } else {
    container.textContent = "Could not load profiles.";
  }
} catch (error) {
  console.error("Error loading profiles:", error);
  container.innerHTML = "Something went wrong.";
}
