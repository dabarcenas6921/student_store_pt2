const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");

function generateToken(data) {
  const token = jwt.sign(data, SECRET_KEY, { expiresIn: "24h" });
  return token;
}

function createUserJwt(user) {
  const payload = {
    email: user.email,
    isAdmin: user.isAdmin || false,
  };
  return generateToken(payload);
}

function validateToken(token) {
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    return decoded;
  } catch (e) {
    return {};
  }
}

module.exports = {
  generateToken,
  createUserJwt,
  validateToken,
};
