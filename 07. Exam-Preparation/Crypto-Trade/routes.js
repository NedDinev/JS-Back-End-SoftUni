const router = require("express").Router();


//add controllers
const homeController = require("./controllers/homeController");
const authController = require("./controllers/authController");
const cryptoController = require("./controllers/cryptoController");

//add routes
router.use(homeController);
router.use(authController);
router.use("/crypto", cryptoController);

module.exports = router;
