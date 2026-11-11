export function showStatus(element, message, type) {
  element.textContent = message;
  element.className = type;
  element.style.textAlign = "center";
}

export function clearStatus(element) {
  element.textContent = "";
  element.className = "";
}
