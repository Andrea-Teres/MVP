var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");
const models = require("../models");
require("dotenv").config();
var bcrypt = require("bcrypt");
const saltRounds = 10;

const userEmailShouldNotExist = require("../guards/userEmailShouldNotExist");
const userEmailShouldBeValid = require("../guards/userEmailShouldBeValid");
const passwordShouldBeValid = require("../guards/passwordShouldBeValid");
const usernameShouldBeValid = require("../guards/usernameShouldBeValid");
const userShouldBeLoggedIn = require("../guards/userShouldBeLoggedIn");
const { v4: uuidv4 } = require("uuid");

const supersecret = process.env.SUPER_SECRET;

//REGISTER NEW USER

router.post(
  "/register",
  userEmailShouldNotExist,
  userEmailShouldBeValid,
  passwordShouldBeValid,
  usernameShouldBeValid,

  async (req, res) => {
    const { username, email, password } = req.body;

    try {
      const hash = await bcrypt.hash(password, saltRounds);
      const privateId = uuidv4();
      // Make it URL friendly
      const encodedToken = encodeURIComponent(privateId);

      const user = await models.User.create({
        privateId: encodedToken,
        username,
        email,
        password: hash,
      });
      const token = jwt.sign({ user_id: user.id }, supersecret);
      res.send({ message: "New user created!", token, email, username });
    } catch (err) {
      res.status(400).send({ message: err.message });
      console.log(err);
    }
  }
);

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

      if (!correctPassword) throw new Error("* Incorrect password.");

      const token = jwt.sign({ userId: user_id }, supersecret);
      console.log("Login token:", token);
      res.send({ message: "Login successful!", token, user_id, email });
    } else {
      throw new Error("* Please enter a valid email.");
    }
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

router.get("/profile", userShouldBeLoggedIn, (req, res) => {
  res.send(req.user);
});

// DELETE all users

// router.delete("/", async (req, res) => {
//   try {
//     // Delete all events
//     await models.User.destroy({
//       where: {},
//       truncate: true, // This ensures that the table is truncated, removing all rows
//     });

//     res.send("All users deleted successfully");
//   } catch (error) {
//     console.error(error); // Log the error for debugging purposes
//     res.status(500).send("Internal server error");
//   }
// });

module.exports = router;
