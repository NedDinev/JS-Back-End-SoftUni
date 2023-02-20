const Photo = require("../models/Photo");

exports.getOne = (photoId) => Photo.findById(photoId).lean();

exports.getAll = () => Photo.find().lean();

exports.findUserPics = (userId) => Photo.find({ owner: userId }).lean();

exports.create = (photoData) => Photo.create(photoData);

exports.addComment = (photoId, userId, comment) => {
  const userAndComment = { userId: userId.valueOf(), comment };
  return Photo.findOneAndUpdate(
    { _id: photoId },
    { $push: { commentList: userAndComment } }
  );
};

exports.delete = (photoId) => Photo.findByIdAndDelete(photoId);

exports.edit = (photoId, photoData) =>
  Photo.findByIdAndUpdate(photoId, photoData);
