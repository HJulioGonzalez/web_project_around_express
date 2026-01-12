const path = require("path");
const User = require(path.join(__dirname, "..", "models", "user.js"));
module.exports.getAllUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((error) => res.status(500).send({ message: error }));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  const newUser = new User({ name, about, avatar });
  const error = newUser.validateSync();
  if (error) {
    return res.status(400).json({
      message: "Validation failed",
      errors: error.message,
    });
  }
  newUser
    .save()
    .then((users) => res.send({ data: users }))
    .catch((error) => res.status(500).send({ errors: error.message }));
};
