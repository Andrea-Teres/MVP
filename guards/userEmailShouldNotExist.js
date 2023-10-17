const models = require("../models");

async function userEmailShouldNotExist(req, res, next) {
  const { email } = req.body;
  try {
    const user = await models.User.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      next();
    } else
      res.status(400).send({
        message: "This email already exists, please enter another one",
      });
  } catch (err) {
    res.status(500).send(err);
  }
}

module.exports = userEmailShouldNotExist;
