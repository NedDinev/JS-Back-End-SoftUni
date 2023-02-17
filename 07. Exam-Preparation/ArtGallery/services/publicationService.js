const Publication = require("../models/Publication");

exports.getOne = (publicationId) => Publication.findById(publicationId).lean();

exports.getAll = () => Publication.find().lean();

exports.create = (publicationData) => Publication.create(publicationData);

exports.share = (publicationId, userId) =>
  Publication.findOneAndUpdate(
    { _id: publicationId },
    { $push: { usersShared: userId } }
  );

exports.delete = (publicationId) =>
  Publication.findByIdAndDelete(publicationId);

exports.edit = (publicationId, publicationData) =>
  Publication.findByIdAndUpdate(publicationId, publicationData);
