const models = require("../models");

async function authenticateUser(req, res, next) {
  const id = req.params;
  const userId = await models.User.findOne({
    where: {
      id: id,
    },
  });
  next();
}

module.exports = authenticateUser;
