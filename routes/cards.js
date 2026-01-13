const router = require("express").Router();
const path = require("path");
const {getAllCards, createCard} = require("../controllers/cards")
const fs = require("fs");
const cardInfoPath = path.join(__dirname, "..", "data", "cards.json");

router.get("/", getAllCards);
router.post("/", createCard)

module.exports = router;
