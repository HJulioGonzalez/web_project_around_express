const cards = require("express").Router();
const path = require("path");
const fs = require("fs");
const cardInfoPath = path.join(__dirname, "..", "data", "cards.json");

cards.get("/", (req, res) => {
  fs.readFile(cardInfoPath, { encoding: "utf8" }, (err, data) => {
    if (err) {
      return res.status(404).json({ message: "card file missing" });
    }
    res.json(JSON.parse(data));
  });
});

module.exports = cards;
