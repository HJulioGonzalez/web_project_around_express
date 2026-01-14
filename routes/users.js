const router = require("express").Router();
const { getUsers, getUserbyId, createUser } = require("../controllers/users");

router.get("/", getUsers);
router.get("/:id", getUserbyId);
router.post("/", createUser);

module.exports = router;
