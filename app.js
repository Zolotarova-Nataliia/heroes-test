const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();
const heroesRouter = require("./router/heroesRouter");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/heroes", heroesRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, _, res) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
