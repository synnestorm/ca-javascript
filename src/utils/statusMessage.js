export function showStatus(element, message, type) {
  element.textContent = message;
  element.className = type;
}

export function clearStatus(element) {
  element.textContent = "";
  element.className = "";
}
