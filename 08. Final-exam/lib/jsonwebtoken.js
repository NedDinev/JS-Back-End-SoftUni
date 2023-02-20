const jwt = require("jsonwebtoken");
const util = require("util");

exports.sign = util.promisify(jwt.sign); //transform sign method  from callback to promise
exports.verify = util.promisify(jwt.verify); //transform verify method  from callback to promise
