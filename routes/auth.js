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

      const user = await models.User.create({
        username,
        email,
        password: hash,
      });

      const token = jwt.sign({ userId: user.id }, supersecret);

      // Fetch the user again to ensure you have the latest data
      const updatedUser = await models.User.findByPk(user.id);

      res.send({
        message: "New user created!",
        token,
        email,
        username,
        user: updatedUser,
      });
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
      res.send({ message: "Login successful!", token, user_id, email });
    } else {
      throw new Error("* Please enter a valid email.");
    }
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

router.get("/profile", userShouldBeLoggedIn, (req, res) => {
  if (!req.user) {
    return res.status(404).send({ message: "User not found" });
  }

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
