const express = require("express");
const router = express.Router();
const models = require("../models");

//Get user by email
//NOT WORKING
router.get("/email/:email", async function (req, res, next) {
  console.log(req.params.email);
  try {
    const { email } = req.params;
    const user = await models.User.findOne({
      where: { email },
    });
    console.log(email);

    if (user) {
      res.send(email);
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
