const express = require("express");
const handlebars = require("express-handlebars");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

const constants = require("./constants");
const { authentication } = require("./middlewares/authMiddleware");

const routes = require("./routes");
const app = express();

app.engine("hbs", handlebars.engine({ extname: "hbs" }));
app.set("view engine", "hbs");

app.use("/static", express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(authentication);
app.use(routes);

mongoose.set("strictQuery", false);
mongoose.connect("mongodb://127.0.0.1/crypto"); // change url

app.listen(constants.PORT, () =>
  console.log(`Server is listening on port ${constants.PORT}`)
);
