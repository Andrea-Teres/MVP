var jwt = require("jsonwebtoken");
require("dotenv").config();
const supersecret = process.env.SUPER_SECRET;
const models = require("../models");

function userShouldBeLoggedIn(req, res, next) {
  const authorization = req.headers["authorization"] || "";
  console.log("Authorization Header:", authorization);

  const token = authorization.replace(/^Bearer\s/, "");
  console.log("Extracted Token:", token);

  if (!token) {
    res.status(401).send({ message: "please provide a token" });
  } else {
    jwt.verify(token, supersecret, async function (err, decoded) {
      console.log("Decoded Token:", decoded);
      console.log("Error:", err);
      if (err) res.status(401).send({ message: "Error verifying token" });
      else {
        //everything is awesome
        const user = await models.User.findByPk(decoded.user_id);
        req.userId = decoded.user_id;

        req.user = user;
        next();
      }
    });
  }
}

module.exports = userShouldBeLoggedIn;
