const path = require("path");
const User = require(path.join(__dirname, "..", "models", "user.js"));
module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((error) => res.status(500).send({ message: error }));
};

module.exports.getUserbyId = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        throw new Error("No existe el usuario");
      }
      return res.send({ data: user });
    })
    .catch((error) =>
      res.status(500).send({
        message: error.message,
      })
    );
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
