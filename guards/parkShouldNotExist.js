const models = require("../models");

async function parkShouldNotExist(req, res, next) {
  const { name } = req.body;
  try {
    const park = await models.Park.findOne({
      where: {
        name,
      },
    });
    if (!park) {
      next();
    } else
      res.status(400).send({
        message: "This park is already in your wishlist!",
      });
  } catch (err) {
    res.status(500).send(err);
  }
}

module.exports = parkShouldNotExist;
