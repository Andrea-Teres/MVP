const validator = require("validator");

function passwordShouldBeValid(req, res, next) {
  const { password } = req.body;

  if (validator.isLength(password, { min: 8 })) {
    next();
  } else {
    res.status(400).send({
      message: "Password is not valid. It must be at least 8 characters long.",
    });
  }
}

module.exports = passwordShouldBeValid;
