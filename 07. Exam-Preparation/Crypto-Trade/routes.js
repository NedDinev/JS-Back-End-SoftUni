const router = require("express").Router();

//add controllers
const homeController = require("./controllers/homeController");
const authController = require("./controllers/authController");
const cryptoController = require("./controllers/cryptoController");

//add routes
router.use(homeController);
router.use(authController);
router.use("/crypto", cryptoController);
router.all("*", (req, res) => {
  // for every invalid route
  res.render("home/404");
});

module.exports = router;
