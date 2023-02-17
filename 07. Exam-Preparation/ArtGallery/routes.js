const router = require("express").Router();

const homeController = require("./controllers/homeController");
const authController = require("./controllers/authController");
const publicationController = require("./controllers/publicationController");

//TODO: add routes
router.use(homeController);
router.use(authController);
router.use("/publication/", publicationController);
router.all("*", (req, res) => {
  return res.render("home/404");
});

module.exports = router;
