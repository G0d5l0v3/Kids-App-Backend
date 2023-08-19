{/*const jwt = require("jsonwebtoken");

const createToken = (user) => {
  return jwt.sign({ _id: user._id }, "YOUR_SECRET_KEY", {
    expiresIn: "1d",
  });
};*
exports.createToken = createToken;*/}

const jwt = require('jsonwebtoken');

const createToken = (userId) => {
  return jwt.sign({ _id: userId }, process.env.SECRET_KEY, { expiresIn: '1h' });
};

module.exports = createToken;