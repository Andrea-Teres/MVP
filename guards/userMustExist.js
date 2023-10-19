const models = require("../models");

async function userMustExist(req, res, next) {
  const { id } = req.params;
  try {
    const user = await models.User.findOne({
      where: { id },
    });
    if (user) {
      res.send(user);
    } else res.status(404).send({ message: "User doesn't exist." });
  } catch (err) {
    res.status(500).send(err);
  }
}

module.exports = userMustExist;
