const path = require("path");
const Card = require(path.join(__dirname, "..", "models", "card.js"));
module.exports.getAllCards = (req, res) => {
  Card.find({})
    .populate("owner")
    .then((users) => res.json({ data: users }))
    .catch((error) => res.status(500).send({ message: error }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const newCard = new Card({ name, link, owner: req.user._id });
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

module.exports.deleteCardById = (req, res) => {
  Card.findByIdAndDelete(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new Error(`No existe la tarjeta`);
      }
      return res.send({ data: `${card.name} place has been delete` });
    })
    .catch((error) =>
      res.status(500).send({
        message: error.message,
      })
    );
};
