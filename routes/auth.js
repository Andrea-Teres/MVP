var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");
const models = require("../models");
require("dotenv").config();
var bcrypt = require("bcrypt");
const saltRounds = 10;

const userEmailShouldNotExist = require("../guards/userEmailShouldNotExist");
const userShouldBeLoggedIn = require("../guards/userShouldBeLoggedIn");

const supersecret = process.env.SUPER_SECRET;

//REGISTER NEW USER

router.post("/register", userEmailShouldNotExist, async (req, res) => {
  const { email, password } = req.body;

  try {
    const hash = await bcrypt.hash(password, saltRounds);

    const user = await models.User.create({
      email,
      password: hash,
    });
    var token = jwt.sign({ user_id: user.id }, supersecret);
    res.send({ message: "New user created!", token, email });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

//LOG IN WITH PRIVATE PASSWORD

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await models.User.findOne({
      where: {
        email,
      },
    });
    if (user) {
      const user_id = user.id;

      const correctPassword = await bcrypt.compare(password, user.password);

      if (!correctPassword) throw new Error("Incorrect password");

      var token = jwt.sign({ user_id }, supersecret);
      res.send({ message: "Login successful!", token, user_id, email });
    } else {
      throw new Error("User does not exist");
    }
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

//ACCESS PRIVATE DATA

router.get("/profile", userShouldBeLoggedIn, function (req, res, next) {
  res.send({
    message: "You are logged in. Here is your private data.",
    user_id: req.user_id,
  });
});

module.exports = router;
