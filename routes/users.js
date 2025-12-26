const users = require("express").Router();
const fs = require("fs");
const path = require("path");
const userInfoPath = path.join(__dirname, "..", "data", "users.json");

users.get("/", (req, res) => {
  fs.readFile(userInfoPath, { encoding: "utf8" }, (err, data) => {
    if (err) {
      return res.status(500).json({ message: "issues in user file" });
    }
    res.json(JSON.parse(data));
  });
});

const doesUserExist = (req, res, next) => {
  const { id } = req.params;
  fs.readFile(userInfoPath, { encoding: "utf8" }, (err, data) => {
    if (err) {
      return res.status(500).json({ message: "issues in user file" });
    }
    const userById = JSON.parse(data).find((x) => x["_id"] === id);
    if (!userById) {
      res.status(404).json({ message: "ID de usuario no encontrado" });
    }
    next();
  });
};

users.get("/:id", doesUserExist, (req, res) => {
  const { id } = req.params;
  fs.readFile(userInfoPath, { encoding: "utf8" }, (err, data) => {
    if (err) {
      return res.status(500).json({ message: "issues in user file" });
    }
    res.json(JSON.parse(data).find((x) => x["_id"] === id));
  });
});

module.exports = users;
