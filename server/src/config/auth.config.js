module.exports = {
  SALT_ROUNDS: Number(process.env.BCRYPT_SALT_ROUNDS) || 10,
  REFRESH_TOKEN_EXPIRY: 7 * 24 * 60 * 60 * 1000
};