const express = require("express");
const fs = require("fs");
const path = require("path");
const { PORT = 3000 } = process.env;
const users = require(path.join(__dirname, "routes", "users.js"));
const cards = require(path.join(__dirname, "routes", "cards.js"));
const app = express();

app.use("/users", users);
app.use("/cards", cards);

app.use((req, res) => {
  res.status(404).json({
    message: "Recurso solicitado no encontrado",
  });
});

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
