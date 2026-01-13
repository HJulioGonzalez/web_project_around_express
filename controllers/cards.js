const path = require("path");
const Card = require(path.join(__dirname, "..", "models", "card.js"));
module.exports.getAllCards = (req,res) => {
    Card.find({}).populate("owner")
    .then((users) => res.json({ data: users }))
    .catch((error) => res.status(500).send({ message: error }));
};

module.exports.createCard = (req, res) => {
  const { name, link, ownerID } = req.body;
  const newCard = new Card({ name, link, owner: ownerID });
  const error = newCard.validateSync();
  if (error) {
    return res.status(400).json({
      message: "Validation failed",
      errors: error.message,
    });
  }
  newCard
    .save()
    .then((cards) => res.send({ data: cards }))
    .catch((error) => res.status(500).send({ errors: error.message }));
};