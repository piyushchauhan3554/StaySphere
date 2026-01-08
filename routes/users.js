const express = require("express");
const router = express.Router();
const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { validateSignup, validateLogin } = require("../middlewares/validation");
router.get("/signup", (req, res) => {
  res.render("./users/signup.ejs");
});

router.post(
  "/signup",
  validateSignup,
  wrapAsync(async (req, res) => {
    try {
      const { email, username, password } = req.body;
      const newUser = new User({
        email: email,
        username: username,
      });
      const registeredUser = await User.register(newUser, password);
      // console.log(registeredUser);
      req.flash("success", "User Registered Successfully");
      res.redirect("/listings");
    } catch (error) {
      req.flash("error", error.message);
      res.redirect("/signup");
    }
  })
);

router.get("/login", (req, res) => {
  res.render("./users/login.ejs");
});

router.post(
  "/login",
  validateLogin,
  passport.authenticate("local", {
    failureFlash: true,
    failureRedirect: "/login",
  }),
  (req, res) => {
    console.log("auth successfull");

    req.flash("success", "Welcome back to StaySphere");
    res.redirect("/listings");
  }
);

module.exports = router;
