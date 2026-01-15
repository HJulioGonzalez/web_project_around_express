const path = require("path");
const Card = require(path.join(__dirname, "..", "models", "card.js"));
module.exports.getAllCards = (req, res) => {
  Card.find({})
    .populate("owner")
    .then((users) => res.json({ data: users }))
    .catch((error) => res.status(500).send({ message: error }));
};

module.exports.getCardbyId = (req, res) => {
  Card.findById(req.params.cardId)
    .populate("owner")
    .then((card) => {
      if (!card) {
        const err = new Error("Card is not in the database");
        err.statusCode = 404;
        err.name = "Inexistent user";
        throw err;
      }
      return res.send({ data: card });
    })
    .catch((error) => {
      const status = error.statusCode || 500;
      if (error.name === "CastError") {
        errorMessage = "Invalid card ID format";
      }
      res.status(status).send({
        message: errorMessage,
      });
    });
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const newCard = new Card({ name, link, owner: req.user._id });
  const error = newCard.validateSync();
  if (error) {
    return res.status(400).json({
      message: "Submmited data failed, check fields",
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

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .then((cardLiked) => {
      res.send({
        data: `${cardLiked.name} place has been liked by user ${req.user._id}`,
      });
    })
    .catch((error) => {
      res.status(500).send({ message: error });
    });
};
module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .then((cardLiked) => {
      res.send({
        data: `${cardLiked.name} place has been unliked by user ${req.user._id}`,
      });
    })
    .catch((error) => {
      res.status(500).send({ message: error });
    });
};
