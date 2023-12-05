const models = require("../models");
const validator = require("validator");

async function userEmailShouldBeValid(req, res, next) {
  const { email } = req.body;
  try {
    if (validator.isEmail(email)) {
      const user = await models.User.findOne({
        where: {
          email: email,
        },
      });

      if (!user) {
        next();
      } else {
        res.status(400).send({
          message: "* Email not valid, please enter another one.",
        });
      }
    } else {
      res.status(400).send({
        message: "* Invalid email format.",
      });
    }
  } catch (err) {
    res.status(500).send(err);
  }
}

module.exports = userEmailShouldBeValid;
