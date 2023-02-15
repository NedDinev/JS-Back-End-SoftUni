const router = require("express").Router();

const { isAuth } = require("../middlewares/authMiddleware");
const cryptoService = require("../services/cryptoService");
const { getErrorMessage } = require("../utils/errorUtils");

router.get("/catalog", (req, res) => {
  res.render("crypto/catalog");
});

router.get("/create", isAuth, (req, res) => {
  res.render("crypto/create");
});

router.post("/create", isAuth, async (req, res) => {
  const { name, image, price, description, paymentMethod } = req.body;

  try {
    await cryptoService.create(
      name,
      image,
      price,
      description,
      paymentMethod,
      req.user._id
    );
    res.redirect("/crypto/catalog");
  } catch (error) {
    return res
      .status(400)
      .render("crypto/create", { error: getErrorMessage(error) });
  }
});

module.exports = router;
