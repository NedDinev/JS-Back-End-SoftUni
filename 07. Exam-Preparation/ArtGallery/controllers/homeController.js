const router = require("express").Router();
const publicationsService = require("../services/publicationService");

router.get("/", async (req, res) => {
  const publication = await publicationsService.getAll();

  res.render("home/home", { publication });
});

module.exports = router;
