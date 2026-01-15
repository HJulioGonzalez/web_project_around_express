const router = require("express").Router();
const {
  getUsers,
  getUserById,
  createUser,
  deleteUserById,
  updateUser,
  updateAvatarUser,
} = require("../controllers/users");

router.patch("/me/avatar", updateAvatarUser);
router.patch("/me", updateUser);
router.get("/", getUsers);
router.post("/", createUser);
router.get("/:id", getUserById);
router.delete("/:id", deleteUserById);

module.exports = router;
