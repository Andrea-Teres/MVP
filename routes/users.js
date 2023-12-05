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

//GET username by privateId

router.get("/private/:privateId", async function (req, res, next) {
  const { privateId } = req.params;

  try {
    // Decode the URL-encoded token
    const decodedToken = decodeURIComponent(privateId);

    // Find the event using the decoded hash
    const user = await models.User.findOne({
      where: { privateId: decodedToken },
    });

    if (user) {
      // Check if event is not null
      res.send(user.username);
    } else {
      res.status(404).send("Username not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

//Get user by ID (public)
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

// router.get(
//   "/profile/:id",
//   userShouldBeLoggedIn,
//   userMustExist,
//   function (req, res, next) {
//     res.send({
//       message: "You are logged in. Here is your private data.",
//       user: req.user,
//     });
//   }
// );
module.exports = router;
