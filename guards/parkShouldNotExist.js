const models = require("../models");

async function parkShouldNotExist(req, res, next) {
  const { name } = req.body;
  try {
    const park = await models.Park.findOne({
      where: {
        name: name, // Use the `name` from the request body
      },
    });
    if (!park) {
      next(); // Continue to the next middleware if the park doesn't exist
    } else {
      // If the park with the same name already exists, send an error response
      const errorMessage = "This park is already in your wishlist!";
      console.error(errorMessage);
      res.status(400).json({ error: errorMessage });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = parkShouldNotExist;
