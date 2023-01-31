const router = require("express").Router();

const Accessory = require("../models/Accessory");
//URL: /accessories/create
router.get("/create", (req, res) => {
  res.render("accessory/create");
});

router.post("/create", async (req, res) => {
  const { name, description, imageUrl } = req.body; //get form data
  let accessory = new Accessory({ name, description, imageUrl }); //use form data in accessory schema

  try {
    await accessory.save(); //save new accessory document to database
  } catch (error) {
    console.log(error.message);
    return res.redirect("/404");
  }

  //redirect
  res.redirect("/");
});

module.exports = router;
