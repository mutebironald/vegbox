/**
 * @param {string} email to validate
 * @returns {boolean} True if the email is valid, otherwise false
 */
exports.isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/***
 * validates if given password matches certain criteria
 * @param{string} password to validate
 * @returns{boolean}true if password is valid, otherwise false
 */

exports.isValidPassword = (password) => {
  // Check if password is at least 8 characters long
  if (password.length < 8) {
    return false;
  }

  // Check if password contains at least one lowercase letter
  if (!/[a-z]/.test(password)) {
    return false;
  }

  // Check if password contains at least one uppercase letter
  if (!/[A-Z]/.test(password)) {
    return false;
  }

  // Check if password contains at least one digit
  if (!/\d/.test(password)) {
    return false;
  }

  // Check if password contains at least one special character
  if (!/[!@#$%^&*()\-_=+{};:,<.>]/.test(password)) {
    return false;
  }

  // All criteria passed, password is valid
  return true;
};
