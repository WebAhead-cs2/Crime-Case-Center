const db = require("./database/connection");
const express = require("express"); //quick server creation
const server = express();// activate express function that setups the srever
const router = require("./router"); //import the router file
const cookieParser = require("cookie-parser") // import cookies parser

server.use(cookieParser()); // allows us to use cookies

server.use(express.static("public")); //import the CSS files

server.use(express.urlencoded()); //collect all chuncks of the html body from the post request (sent by the user to the server) and put it in the request object (request.body)

server.use(router); // actual use the router file ,  **should be after the coockie parser so it can use it **



server.listen(3000, () =>
  console.log("Server listening on http://localhost:3000")
);
