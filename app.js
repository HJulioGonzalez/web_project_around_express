const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const { PORT = 3000 } = process.env;
const usersRoutes = require(path.join(__dirname, "routes", "users.js"));
const cardsRoutes = require(path.join(__dirname, "routes", "cards.js"));
const app = express();

mongoose.connect("mongodb://localhost:27017/aroundb");
app.use(express.json());
app.use((req, res, next) => {
  req.user = {
    _id: "6964570226293463c36955ad",
  };

  next();
});
app.use("/users", usersRoutes);
app.use("/cards", cardsRoutes);

app.use((req, res) => {
  res.status(404).json({
    message: "Recurso solicitado no encontrado",
  });
});

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
