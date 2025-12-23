const cards = require("express").Router();
const cardInfo = require("../data/cards.json");

cards.get("/", (req, res) => {
  res.json(cardInfo);
});

module.exports = cards;
