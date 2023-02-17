const router = require("express").Router();
const publicationsService = require("../services/publicationService");
const { isAuth } = require("../middlewares/authMiddleware");
const authService = require("../services/authService");
const { getErrorMessage } = require("../utils/errorUtils");

router.get("/create", isAuth, (req, res) => {
  res.render("publication/create");
});
router.post("/create", isAuth, async (req, res) => {
  const { title, paintingTech, picture, certificate } = req.body;

  try {
    console.log(title, paintingTech, picture, certificate, req.user._id);
    await publicationsService.create({
      title: title,
      paintingTech: paintingTech,
      picture: picture,
      certificate: certificate,
      owner: req.user._id,
    });
    res.redirect("/publication/gallery");
  } catch (error) {
    return res
      .status(400)
      .render("publication/create", { error: getErrorMessage(error) });
  }
});

router.get("/gallery", async (req, res) => {
  const publications = await publicationsService.getAll();

  res.render("publication/gallery", { publications });
});

router.get("/:publicationId/details", async (req, res) => {
  const publicationId = req.params.publicationId;
  const publication = await publicationsService.getOne(publicationId);

  const isOwner = req.user?._id == publication.owner;
  const user = await authService.findUserById(publication.owner);
  const isShared = publication.usersShared.some(
    (person) => person == req.user?._id
  );

  res.render("publication/details", {
    publication,
    isOwner,
    user,
    isShared,
  });
});

router.get("/:publicationId/edit", isAuth, async (req, res) => {
  const publicationId = req.params.publicationId;
  const publication = await publicationsService.getOne(publicationId);

  res.render("publication/edit", { publication });
});

router.post("/:publicationId/edit", isAuth, async (req, res) => {
  const publicationData = req.body;
  const publicationId = req.params.publicationId;
  await publicationsService.edit(publicationId, publicationData);

  res.redirect(`/publication/${publicationId}/details`);
});

router.get("/:publicationId/share", isAuth, async (req, res) => {
  const publicationId = req.params.publicationId;
  await publicationsService.share(publicationId, req.user._id);

  res.redirect("/");
});
router.get("/:publicationId/delete", isAuth, async (req, res) => {
  const publicationId = req.params.publicationId;
  await publicationsService.delete(publicationId);

  res.redirect("/");
});

module.exports = router;
