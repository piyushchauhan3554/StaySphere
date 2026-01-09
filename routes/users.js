const express = require("express");
const router = express.Router();
const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const { storeRedirUrl } = require("../middlewares/isLoggedIn");
const passport = require("passport");
const { validateSignup, validateLogin } = require("../middlewares/validation");
router.get("/signup", (req, res) => {
  res.render("./users/signup.ejs");
});

router.post(
  "/signup",
  storeRedirUrl,
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
      req.login(registeredUser, (err) => {
        if (err) return next(err);
        req.flash("success", "User Registered Successfully");
        const url = res.locals.redirectUrl || "/listings";
        res.redirect(url);
      });
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
  storeRedirUrl,
  validateLogin,
  passport.authenticate("local", {
    failureFlash: true,
    failureRedirect: "/login",
  }),
  (req, res) => {
    // console.log("auth successfull");

    req.flash("success", "Welcome back to StaySphere");
    const url = res.locals.redirectUrl || "/listings";
    // console.log(url);

    res.redirect(url);
  }
);

// logout route

router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "you have been logged out");
    res.redirect("/listings");
  });
});

module.exports = router;
