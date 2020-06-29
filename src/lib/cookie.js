/**
 * Gets all the cookies as a Map
 *
 * @returns Map of cookie values
 */
function getAllCookies() {
  return new Map(document.cookie.split(';').map(cookie => cookie.trim().split('=')));
}

/**
 * Checks if cookie exists
 *
 * @param {String} name name of cookie
 * @return {Boolean} true of cookie is present
 */
function hasCookie(name) {
  return getAllCookies().has(name);
}

/**
 * Gets the cookie value
 *
 * @param {String} name name of cookie
 * @return {String} the value of the cookie
 */
function getCookie(name) {
  return getAllCookies().get(name);
}

module.exports = {
  getAllCookies,
  hasCookie,
  getCookie,
};
