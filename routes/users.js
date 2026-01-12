const router = require("express").Router();
const { getAllUsers, createUser } = require("../controllers/users");
const fs = require("fs");
const path = require("path");
const userInfoPath = path.join(__dirname, "..", "data", "users.json");

router.get("/", getAllUsers);
router.post("/", createUser);

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

module.exports = router;
