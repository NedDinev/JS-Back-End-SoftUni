const router = require("express").Router();
const photosService = require("../services/photoService");
const { isAuth } = require("../middlewares/authMiddleware");
const authService = require("../services/authService");
const { getErrorMessage } = require("../utils/errorUtils");

router.get("/profile", isAuth, async (req, res) => {
  const userId = req.user._id;
  const user = await authService.findUserById(userId);

  const userPics = await photosService.findUserPics(userId);

  res.render("profile/profile", { user, userPics });
});

module.exports = router;
