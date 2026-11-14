/**
 * Displays a loading indicator using flex as its syle.
 *
 * @function showLoader
 * @param {HTMLElement} loader - The HTML element representing the loader.
 */
export function showLoader(loader) {
  loader.style.display = "flex";
}

/**
 * Hides the loading indicator by setting the style to none.
 *
 * @function hideLoader
 * @param {HTMLElement} loader - The HTML element representing the loader.
 */
export function hideLoader(loader) {
  loader.style.display = "none";
}
