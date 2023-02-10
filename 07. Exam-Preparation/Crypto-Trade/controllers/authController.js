const router = require("express").Router();

const authService = require("../services/authService");

router.get("/login", (req, res) => {
  res.render("auth/login");
});
router.post("/login", async (req, res) => {
  const { email, password } = req.body; // change if needed

  try {
    const token = await authService.login(email, password);
    res.cookie("auth", token); // creates a cookie called "auth" for logged in users
    res.redirect("/");
  } catch (error) {
    throw new Error(error.message);
  }
});
router.get("/register", (req, res) => {
  res.render("auth/register");
});
router.post("/register", async (req, res) => {
  const { username, email, password, repeatPassword } = req.body; // change if needed

  await authService.register(username, email, password, repeatPassword);

  //TODO:login automatically
  res.redirect("/");
});

module.exports = router;
