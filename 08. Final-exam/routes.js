const router = require("express").Router();

const homeController = require("./controllers/homeController");
const authController = require("./controllers/authController");
const photoController = require("./controllers/photoController");
const profileController = require("./controllers/profileController");

//TODO: add routes
router.use(homeController);
router.use(authController);
router.use(profileController);
router.use("/photo", photoController);
router.all("*", (req, res) => {
  res.render("home/404");
});

module.exports = router;
