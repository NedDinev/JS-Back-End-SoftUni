const User = require("../models/User");

exports.register = (username, email, password, repeatPassword) => {
  User.create({ username, email, password, repeatPassword });
};
