const router = require("express").Router();
const { getUsers, getUserById, createUser, deleteUserById } = require("../controllers/users");

router.get("/", getUsers);
router.get("/:id", getUserById);
router.delete("/:id", deleteUserById);
router.post("/", createUser);

module.exports = router;
