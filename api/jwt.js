const express = require('express');
const cookieParser = require("cookie-parser");
const { sign, verify } = require('jsonwebtoken');
const User = require('./models/UserModel.js');
const app = express();
app.use(express.json());
app.use(cookieParser());

const createToken = (user) => { return sign({ email: user.email, id: user._id }, process.env.SECRET_KEY); }

const clearCookie = (req, res, next) => {
  res.clearCookie("token");
  // res.cookie("token", "", { maxAge: 0 });
  res.json("success");
  res.end();
  return next();
}
const bakeCookie = (user, age, res) => {
  return res.cookie("token",
    createToken(user),
    { httpOnly: true, maxAge: age })
    .status(200)
    .json({ result: "Cookie baked!", user })
}

const validateToken = (req, res, next) => {
  const { token } = req.cookies;
  if (token) {
    verify(token, process.env.SECRET_KEY,
      async (err, validToken) => {
        if (validToken) {
          req.tokenData = await User.findById(validToken.id);
          req.validTokenStatus = 200;
          req.validToken = true;
          return next();
        }
      })
  }
  else {
    req.validTokenStatus = 500;
    req.validToken = false;
    return next();
  }
}

module.exports = { bakeCookie, createToken, validateToken, clearCookie };