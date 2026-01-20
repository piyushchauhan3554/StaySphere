const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const { storeRedirUrl } = require("../middlewares/isLoggedIn");
const passport = require("passport");
const { validateSignup, validateLogin } = require("../middlewares/validation");
const userController = require("../controllers/users");

router
  .route("/signup")
  .get((req, res) => {
    res.render("./users/signup.ejs");
  })
  .post(storeRedirUrl, validateSignup, wrapAsync(userController.signup));

router
  .route("/login")
  .get((req, res) => {
    res.render("./users/login.ejs");
  })
  .post(
    storeRedirUrl,
    validateLogin,
    passport.authenticate("local", {
      failureFlash: true,
      failureRedirect: "/login",
    }),
    userController.login,
  );

// logout route

router.get("/logout", userController.logout);

module.exports = router;
