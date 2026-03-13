const bcrypt = require("bcryptjs");

async function comparePassword(plainText, passwordHash) {
  if (!passwordHash) return false;

  // Bootstrap compatibility for legacy/plaintext seeds.
  if (!passwordHash.startsWith("$2")) {
    return plainText === passwordHash;
  }

  return bcrypt.compare(plainText, passwordHash);
}

module.exports = comparePassword;
