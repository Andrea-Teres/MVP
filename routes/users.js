const express = require("express");
const router = express.Router();
const models = require("../models");

const userShouldBeLoggedIn = require("../guards/userShouldBeLoggedIn");
const userMustExist = require("../guards/userMustExist");

//Get all users
router.get("/", async function (req, res, next) {
  try {
    const users = await models.User.findAll();
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Get user by ID
router.get("/id/:id", async function (req, res, next) {
  try {
    const { id } = req.params;
    console.log(id);
    const user = await models.User.findOne({
      where: { id },
    });
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ message: "User not found." });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

//Access private profile

router.get(
  "/profile/:id",
  userShouldBeLoggedIn,
  userMustExist,
  function (req, res, next) {
    res.send({
      message: "You are logged in. Here is your private data.",
      user_id: req.user_id,
    });
  }
);
module.exports = router;
