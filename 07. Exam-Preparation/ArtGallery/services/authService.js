const User = require("../models/User");
const bcrypt = require("bcrypt");

const jwt = require("../lib/jsonwebtoken");
const constants = require("../constants");

exports.findByUsername = (username) => User.findOne({ username });
exports.findUserById = (userId) => User.findById(userId).lean();

exports.register = async (username, address, password, repeatPassword) => {
  if (password !== repeatPassword) {
    throw new Error("Passwords do not match");
  }
  //TODO: check if user exists already
  const existingUser = await this.findByUsername(username);

  if (existingUser) {
    throw new Error("User already exists");
  }

  //TODO: validate password

  const hashedPassword = await bcrypt.hash(password, 10);

  await User.create({ username, address, password: hashedPassword });
  return this.login(username, password); // automatically logs in user after registration
};

exports.login = async (username, password) => {
  //User exists
  const user = await this.findByUsername(username);

  if (!user) {
    throw new Error("Incorrect username or password");
  }

  //Password is valid
  const comparePassword = await bcrypt.compare(password, user.password);

  if (!comparePassword) {
    throw new Error("Incorrect username or password");
  }

  //Generate token
  const payload = { _id: user._id, address: user.address, user: user.username };
  const secret = constants.SECRET;

  const token = await jwt.sign(payload, secret);

  return token;
};
