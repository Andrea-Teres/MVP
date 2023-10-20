const express = require("express");
const router = express.Router();
const models = require("../models");

//Create new favorite

router.post("/", async function (req, res) {
  const { parkId, userId } = req.body;
  try {
    const favorite = await models.Favorites.create({
      userId,
      parkId,
    });
    res
      .status(200)
      .send({ favorite, message: "New favorite in your wishlist!" });
  } catch (error) {
    console.log(error);
    res.status(500).send(err.message);
  }
});

module.exports = router;
