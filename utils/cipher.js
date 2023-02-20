const crypto = require('crypto');
const { Buffer } = require('buffer');
const AppError = require('./appError');

exports.encrypt = e => {
  if (!e) return;

  const hash = crypto.createHash('sha256').update(e).digest('hex');
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(
    'aes-192-cbc',
    Buffer.from(process.env.ENCRYPT_KEY, 'hex'),
    iv
  );
  let crypted = cipher.update(e, 'utf8', 'hex');
  crypted += cipher.final('hex');
  crypted = [crypted.toString('hex'), hash, iv.toString('hex')].join(':');
  return crypted;
};

exports.decipher = e => {
  let decrypted = null;
  const iv = Buffer.from(e.split(':')[2], 'hex');
  const decipher = crypto.createDecipheriv(
    'aes-192-cbc',
    Buffer.from(process.env.ENCRYPT_KEY, 'hex'),
    iv
  );
  decrypted = decipher.update(Buffer.from(e.split(':')[0], 'hex'));
  decrypted += decipher.final('utf8');
  if (!decrypted) throw new AppError('Something went terribly wrong!', 500);
  return decrypted;
};
