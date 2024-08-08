function postIsValid(title, content) {
    return title && content && title.trim() !== '' && content.trim() !== '';
}

function userCredentialsAreValid(enteredEmail, enteredConfirmEmail, enteredPassword) {
    return enteredEmail &&
      enteredConfirmEmail &&
      enteredPassword &&
      enteredPassword.trim().length >= 6 &&
      enteredEmail === enteredConfirmEmail &&
      enteredEmail.includes('@')
}

module.exports = {
    postIsValid: postIsValid,
    userCredentialsAreValid: userCredentialsAreValid,
}