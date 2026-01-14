const path = require("path");
const User = require(path.join(__dirname, "..", "models", "user.js"));
module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((error) => res.status(500).send({ message: error }));
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        const err = new Error("User is not in the database");
        err.statusCode = 404;
        err.name = "Inexistent user";
        throw err;
      }
      return res.send({ data: user });
    })
    .catch((error) =>
      {const status = error.statusCode || 500;
        if (error.name === "CastError") {
    errorMessage = "Invalid user ID format";
  };
      res.status(status).send({
        message: errorMessage,
      })}
    );
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  const newUser = new User({ name, about, avatar });
  const error = newUser.validateSync();
  if (error) {
    return res.status(400).json({
      message: "Submmited data failed, check fields",
      errors: error.message,
    });
  }
  newUser
    .save()
    .then((users) => res.send({ data: users }))
    .catch((error) => res.status(500).send({ errors: error.message }));
};

module.exports.deleteUserById = (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then((user) => {
      if (!user) {
        throw new Error(`No existe la tarjeta`);
      }
      return res.send({ data: `${user.name} user has been delete` });
    })
    .catch((error) =>
      res.status(500).send({
        message: error.message,
      })
    );
};

module.exports.getCurrentUser = (req, res) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        const err = new Error("User is not in the database");
        err.statusCode = 404;
        err.name = "Inexistent user";
        throw err;
      }
      return res.send({ data: user });
    })
    .catch((error) =>
      {const status = error.statusCode || 500;
        if (error.name === "CastError") {
    errorMessage = "Invalid user ID format";
  };
      res.status(status).send({
        message: errorMessage,
      })}
    );
};