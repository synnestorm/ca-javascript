export function showStatus(element, message, type) {
  element.textContent = message;
  element.className = type;
}
