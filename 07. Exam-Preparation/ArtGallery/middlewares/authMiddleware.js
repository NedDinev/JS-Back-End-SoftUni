const jwt = require("../lib/jsonwebtoken");

const constants = require("../constants");

exports.authentication = async (req, res, next) => {
  const token = req.cookies["auth"];

  if (token) {
    try {
      const decodedToken = await jwt.verify(token, constants.SECRET);

      req.user = decodedToken; // attach token payload data to req.user and use it

      res.locals.isAuthenticated = true; // to check if user is authenticated in handlebars template
      res.locals.user = decodedToken; // to use user data in handlebars template
    } catch (error) {
      res.clearCookie("auth");
      return res.status(401).render("home/404");
    }
  }
  next();
};

exports.isAuth = (req, res, next) => {
  //use it to check if user is authenticated for current route
  if (!req.user) {
    return res.redirect("/login");
  }
  next();
};
