const router = require("express").Router();

const { isAuth } = require("../middlewares/authMiddleware");
const cryptoService = require("../services/cryptoService");
const { getErrorMessage } = require("../utils/errorUtils");
const constants = require("../constants");

router.get("/catalog", async (req, res) => {
  const crypto = await cryptoService.getAll();

  res.render("crypto/catalog", { crypto });
});

router.get("/search", async (req, res) => {
  const { name, paymentMethod } = req.query;

  const crypto = await cryptoService.search(name, paymentMethod);

  res.render("crypto/search", { crypto });
});

router.get("/:cryptoId/details", async (req, res) => {
  const crypto = await cryptoService.getOne(req.params.cryptoId);

  const isOwner = crypto.owner == req.user?._id; // ? sign for optional chaining (to check if req.user is defined, and if it is compare crypto.owner === req.user._id)
  const isBuyer = crypto.buyers?.some((id) => id == req.user?._id); // checks if user id exists in crypto buyers collection

  res.render("crypto/details", { crypto, isOwner, isBuyer });
});

router.get("/:cryptoId/buy", isAuth, async (req, res) => {
  try {
    await cryptoService.buy(req.user._id, req.params.cryptoId);
  } catch (error) {
    return res.status(404).render("404", { error: getErrorMessage(error) });
  }

  res.redirect(`/crypto/${req.params.cryptoId}/details`);
});

router.get("/:cryptoId/edit", isAuth, async (req, res) => {
  const crypto = await cryptoService.getOne(req.params.cryptoId);

  const paymentMethods = Object.keys(constants.paymentMethodsMap).map(
    (key) => ({
      value: key,
      label: constants.paymentMethodsMap[key],
      isSelected: crypto.paymentMethod == key,
    })
  );

  res.render("crypto/edit", { crypto, paymentMethods });
});

router.post("/:cryptoId/edit", isAuth, async (req, res) => {
  const cryptoData = req.body;
  await cryptoService.edit(req.params.cryptoId, cryptoData);

  res.redirect(`/crypto/${req.params.cryptoId}/details`);
});

router.get("/:cryptoId/delete", isAuth, async (req, res) => {
  await cryptoService.delete(req.params.cryptoId);

  res.redirect("/crypto/catalog");
});

router.get("/create", isAuth, (req, res) => {
  res.render("crypto/create");
});

router.post("/create", isAuth, async (req, res) => {
  const { name, image, price, description, paymentMethod } = req.body;

  try {
    await cryptoService.create({
      name,
      image,
      price,
      description,
      paymentMethod,
      owner: req.user._id,
    });
    res.redirect("/crypto/catalog");
  } catch (error) {
    return res
      .status(400)
      .render("crypto/create", { error: getErrorMessage(error) });
  }
});

module.exports = router;
