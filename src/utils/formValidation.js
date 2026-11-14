/**
 * Displays a validation error message.
 *
 * @function showError
 * @param {HTMLElement} el - The HTML element where the message is displayed.
 * @param {string} message - The error message to display.
 */
export function showError(el, message) {
  el.textContent = message;
}

/**
 * Clears the validation error message.
 *
 * @function clearError
 * @param {HTMLElement} el - The HTML element whose error message should be cleared.
 */
export function clearError(el) {
  el.textContent = "";
}
