const router = require("express").Router();
const {
  getAllCards,
  createCard,
  deleteCardById, getCardbyId
} = require("../controllers/cards");

router.get("/", getAllCards);
router.get("/:cardId", getCardbyId);
router.post("/", createCard);
router.delete("/:cardId", deleteCardById);

module.exports = router;
