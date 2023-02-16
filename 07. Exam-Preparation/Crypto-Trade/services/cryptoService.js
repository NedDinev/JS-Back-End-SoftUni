const Crypto = require("../models/Crypto");

exports.getOne = (cryptoId) => Crypto.findById(cryptoId).lean();

exports.getAll = () => Crypto.find({}).lean();

exports.search = async (name, paymentMethod) => {
  let crypto = await this.getAll();

  if (name) {
    crypto = crypto.filter((x) => x.name.toLowerCase() == name);
  }

  if (paymentMethod) {
    crypto = crypto.filter(
      (x) => x.paymentMethod.toLowerCase() == paymentMethod
    );
  }
  return crypto;
};

exports.buy = async (userId, cryptoId) => {
  const crypto = await Crypto.findById(cryptoId);
  crypto.buyers.push(userId);
  return crypto.save();
};
exports.create = (cryptoData) => Crypto.create(cryptoData);

exports.edit = (cryptoId, cryptoData) =>
  Crypto.findByIdAndUpdate(cryptoId, cryptoData);

exports.delete = (cryptoId) => Crypto.findByIdAndDelete(cryptoId);
