const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const route = require("./routes/route.js");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose
  .connect(
    "mongodb+srv://root:1234@suyashshendre.wfinbwt.mongodb.net/group68Database?retryWrites=true&w=majority"
  )
  .then(() => console.log("MongoDb is conected ..."))
  .catch((err) => console.log(err.message));

app.use("/functionup", route);

app.listen(3000, function () {
  console.log("Server running on port " + 3000);
});
