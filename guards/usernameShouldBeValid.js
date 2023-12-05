const validator = require("validator");

function usernameShouldBeValid(req, res, next) {
  const { username } = req.body;

  if (validator.isLength(username, { min: 2 })) {
    next();
  } else {
    res.status(400).send({
      message: "* Username must be at least 2 characters long.",
    });
  }
}

module.exports = usernameShouldBeValid;
