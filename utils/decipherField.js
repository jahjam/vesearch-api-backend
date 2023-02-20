const crypto = require('crypto');

// deciphers the hash stored in encrypted email string
exports.decipheredEmail = email =>
  new RegExp(crypto.createHash('sha256').update(email).digest('hex'), 'i');
