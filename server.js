const db = require("./database/connection");
const express = require("express");
const server = express();

server.listen(3000, () =>
  console.log("Server listening on http://localhost:3000")
);
server.get("/", (req, res) => {
  res.send(`<h1>Hi</h1>`);
});