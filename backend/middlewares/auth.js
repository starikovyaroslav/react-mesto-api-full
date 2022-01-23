const jwt = require('jsonwebtoken');
const AuthError = require('../errors/AuthError');

module.exports = (req, res, next) => {
  let payload;
  try {
    payload = jwt.verify(req.cookies.token, 'some-secret-key');
  } catch (err) {
    next(new AuthError('Необходимо авторизоваться'));
  }
  req.user = payload;
  next();
};
