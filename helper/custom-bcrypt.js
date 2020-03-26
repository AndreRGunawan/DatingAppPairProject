
function decryptPassword(password) {
  return passwordHash.generate(password)
}

module.exports = decryptPassword;