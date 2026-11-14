/**
 * Displays status message.
 *
 * @function showStatus
 * @param {HTMLElement} element - The HTML element where the status message is displayed.
 * @param {string} message - The status message to display.
 * @param {string} type - The CSS class to apply to the status message.
 */
export function showStatus(element, message, type) {
  element.textContent = message;
  element.className = type;
  element.style.textAlign = "center";
}

/**
 * Clears the status message.
 *
 * @function clearStatus
 * @param {HTMLElement} element - The HTML element whose status message and CSS class should be cleared.
 */
export function clearStatus(element) {
  element.textContent = "";
  element.className = "";
}
