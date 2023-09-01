const express = require("express");
const router = express.Router();
const models = require("../models");
const { Sequelize } = require("sequelize");

//GET all items from wishlist

router.get("/", async function (req, res, next) {
  try {
    const parks = await models.Park.findAll();
    res.send(parks);
  } catch (error) {
    res.status(500).send(error);
  }
});

//POST park into wishlist DB
//the park mustn't exist

router.post("/", async function (req, res, next) {
  const { google_id, name, rating, address, image_url, latitude, longitude } =
    req.body;
  try {
    const park = await models.Park.create({
      google_id,
      name,
      rating,
      address,
      image_url,
      latitude,
      longitude,
    });
    res.send("Park added to wishlist!");
  } catch (error) {
    res.status(500).send(error);
  }
});

// REMOVE one park from wishlist
router.delete("/", async (req, res) => {
  const { id } = req.body;
  try {
    await models.Park.destroy({
      where: { id },
    });

    res.send("Item removed from wishlist.");
  } catch (error) {
    console.error(error); // Log the error for debugging purposes

    res.status(500).send(error);
  }
});

//DELETE ALL PARKS
// router.delete("/", async (req, res) => {
//   try {
//     // Delete all events
//     await models.Park.destroy({
//       where: {},
//       truncate: true, // This ensures that the table is truncated, removing all rows
//     });

//     res.send("All parks deleted successfully!");
//   } catch (error) {
//     console.error(error); // Log the error for debugging purposes
//     res.status(500).send(error);
//   }
// });

module.exports = router;
