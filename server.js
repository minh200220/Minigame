var express = require("express");
var app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");

var server = require("http").Server(app);
var io = require("socket.io")(server);
server.listen(3000);

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://minigame:minh789A+@cluster0.fjtflov.mongodb.net/?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true },
  function (err) {
    if (err) {
      console.log("Mongodb connected error! " + err);
    } else {
      console.log("Mongodb connected successfully!");
    }
  }
);

//minigame minh789A+
require("./controllers/game")(app);
