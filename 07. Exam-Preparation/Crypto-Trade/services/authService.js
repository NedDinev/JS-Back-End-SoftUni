const User = require("../models/User");
const bcrypt = require("bcrypt");

const jwt = require("../lib/jsonwebtoken");
const constants = require("../constants");

exports.findByUsername = (username) => User.findOne({ username });
exports.findByEmail = (email) => User.findOne({ email });

exports.register = async (username, email, password, repeatPassword) => {
  if (password !== repeatPassword) {
    throw new Error("Passwords do not match");
  }
  //check if user exists already
  const existingUser = await this.findByUsername(username);
  const existingEmail = await this.findByEmail(email);
  if (existingUser) {
    throw new Error("User already exists");
  }
  if (existingEmail) {
    throw new Error("Email already exists");
  }

  //validate password
  if (password.length > 4) {
    throw new Error("Password is too short");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await User.create({ username, email, password: hashedPassword });
  return this.login(email, password); // automatically logs in user after registration
};

exports.login = async (email, password) => {
  //User exists
  const user = await this.findByEmail(email);

  if (!user) {
    throw new Error("Incorrect email or password");
  }

  //Password is valid
  const comparePassword = await bcrypt.compare(password, user.password);

  if (!comparePassword) {
    throw new Error("Incorrect email or password");
  }

  //Generate token
  const payload = { _id: user._id, email, user: user.username };
  const secret = constants.SECRET;

  const token = await jwt.sign(payload, secret);

  return token;
};
