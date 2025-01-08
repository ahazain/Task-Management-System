const jwt = require("jsonwebtoken");
const config = require("../configs/config");
const secret = config.secret_key;

function auth(req, res, next) {
  const authorization = req.headers["authorization"];
  if (!authorization) {
    const error = new Error("Authorization tidak ditemukan");
    error.statusCode = 401;
    error.status = "Failed";
    return next(error);
  }

  const token = authorization.split(" ")[1];

  if (!token) {
    const error = new Error("Token tidak ditemukan");
    error.statusCode = 401;
    error.status = "Failed";
    return next(error);
  }

  jwt.verify(token, secret, (err, user) => {
    if (err) {
      const error = new Error("Token tidak valid");
      error.statusCode = 401;
      error.status = "Failed";
      return next(error);
    }
    req.user = user; //menyimpan data user ke dalam req.user
    next();
  });
}

module.exports = auth;
