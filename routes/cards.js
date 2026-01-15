const router = require("express").Router();
const {
  getAllCards,
  createCard,
  deleteCardById,
  getCardbyId,
  likeCard,
  dislikeCard,
} = require("../controllers/cards");

router.get("/", getAllCards);
router.post("/", createCard);
router.put("/:cardId/likes", likeCard);
router.delete("/:cardId/likes", dislikeCard);
router.get("/:cardId", getCardbyId);
router.delete("/:cardId", deleteCardById);

module.exports = router;
