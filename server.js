require("dotenv").config();
const http = require("http");
const express = require("express");
const routes = require("./routes");
const cors = require("cors");
const app = express();
const db = require("./database/models");

db.sequelize.sync({ alter: true }).then(() => {
  console.log("db connection success");
});

app.use(cors());
app.use(express.json());
app.use(routes);

app.get("/ping", (req, res) => {
  res.json({ message: "pong!" });
});

const server = http.createServer(app);
const PORT = process.env.PORT || 10001;

const start = async () => {
  try {
    server.listen(PORT, () => console.log(`Server is listening on ${PORT}`));
  } catch (err) {
    console.error(err);
  }
};

start();
