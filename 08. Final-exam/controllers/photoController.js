const router = require("express").Router();
const photosService = require("../services/photoService");
const { isAuth } = require("../middlewares/authMiddleware");
const authService = require("../services/authService");
const { getErrorMessage } = require("../utils/errorUtils");

router.get("/create", isAuth, (req, res) => {
  res.render("photo/create");
});
router.post("/create", isAuth, async (req, res) => {
  const { name, age, description, location, image } = req.body;

  try {
    await photosService.create({
      name,
      age,
      description,
      location,
      image,
      owner: req.user._id,
    });
    res.redirect("/photo/catalog");
  } catch (error) {
    return res
      .status(400)
      .render("photo/create", { error: getErrorMessage(error) });
  }
});

router.get("/catalog", async (req, res) => {
  const photos = await photosService.getAll();

  res.render("photo/catalog", { photos });
});

router.get("/:photoId/details", async (req, res) => {
  const photoId = req.params.photoId;
  const photo = await photosService.getOne(photoId);

  const owner = await authService.findUserById(photo.owner);

  const isOwner = req.user?._id == photo.owner;

  const commentsArr = photo.commentList;
  let allComments = [];
  for (let commentInfo of commentsArr) {
    let person = await authService.findUserById(commentInfo.userId);
    allComments.push({ name: person.username, comment: commentInfo.comment });
  }

  res.render("photo/details", {
    photo,
    isOwner,
    owner,
    allComments,
  });
});
router.post("/:photoId/details", isAuth, async (req, res) => {
  const photoId = req.params.photoId;
  const { comment } = req.body;

  try {
    await photosService.addComment(photoId, req.user._id, comment);
  } catch (error) {
    return res
      .status(400)
      .render("photo/details", { error: getErrorMessage(error) });
  }

  res.redirect(`/photo/${photoId}/details`);
});

router.get("/:photoId/edit", isAuth, async (req, res) => {
  const photoId = req.params.photoId;
  const photo = await photosService.getOne(photoId);

  res.render("photo/edit", { photo });
});

router.post("/:photoId/edit", isAuth, async (req, res) => {
  const photoData = req.body;
  const photoId = req.params.photoId;

  try {
    await photosService.edit(photoId, photoData);
    res.redirect(`/photo/${photoId}/details`);
  } catch (error) {
    return res
      .status(400)
      .render("photo/edit", { error: getErrorMessage(error) });
  }
});

router.get("/:photoId/delete", isAuth, async (req, res) => {
  const photoId = req.params.photoId;
  await photosService.delete(photoId);

  res.redirect("/photo/catalog");
});

module.exports = router;
