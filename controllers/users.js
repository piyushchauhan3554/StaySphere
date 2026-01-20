const User = require("../models/user");
module.exports.signup=async (req, res) => {
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
  }


module.exports.login=(req, res) => {
    // console.log("auth successfull");

    req.flash("success", "Welcome back to StaySphere");
    const url = res.locals.redirectUrl || "/listings";
    // console.log(url);

    res.redirect(url);
  }

module.exports.logout=(req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "you have been logged out");
    res.redirect("/listings");
  });
}