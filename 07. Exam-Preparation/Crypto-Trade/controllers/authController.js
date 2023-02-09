const router = require("express").Router();

const authService = require("../services/authService");

router.get("/login", (req, res) => {
  res.render("auth/login");
});
router.post("/login", (req, res) => {
  const { email, password } = req.body; // change if needed
});
router.get("/register", (req, res) => {
  res.render("auth/register");
});
router.post("/register", async (req, res) => {
  const { username, email, password, repeatPassword } = req.body; // change if needed

  await authService.register(username, email, password, repeatPassword);
});

module.exports = router;
