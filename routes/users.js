const users = require("express").Router();
const usersInfo = require("../data/users.json");

users.get("/", (req, res) => {
  res.json(usersInfo);
});

const doesUserExist = (req, res, next) => {
  const { id } = req.params;
  const userById = usersInfo.find((x) => x["_id"] === id);
  if (!userById) {
    res.status(404).json({ message: "ID de usuario no encontrado" });
    return;
  }
  next();
};

users.get("/:id", doesUserExist, (req, res) => {
  const { id } = req.params;
  const userById = usersInfo.find((x) => x["_id"] === id);
  res.json(userById);
});

module.exports = users;
