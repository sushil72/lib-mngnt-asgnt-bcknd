const crypto = require('crypto');

module.exports = (name, email, phone) => {
  const base = name + email + phone;
  return crypto
    .createHash('sha256')
    .update(base + Date.now().toString())
    .digest('hex')
    .slice(0, 12); // 12-char strong password
};
