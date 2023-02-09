const router = require("express").Router();

const homeController = require("./controllers/homeController");
const authController = require("./controllers/authController");

//TODO: add routes
router.use(homeController);
router.use(authController);

module.exports = router;
