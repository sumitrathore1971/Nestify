const User = require("../models/user");
const Review = require("../models/reviews");
const Listing = require("../models/listing");

module.exports.signupUserPost = async (req, res) => {
  try {
    let { username, email, password } = req.body;
    let newUser = new User({ email, username });
    const registerUser = await User.register(newUser, password);
    console.log(registerUser);
    req.login(registerUser, (err) => {
      if (err) return next(err);
      req.flash("success", "Welcome to wanderlust!");
      res.redirect("/listings");
    });
  } catch (error) {
    req.flash("error", error.message);
    res.redirect("/signup");
  }
};

module.exports.userLoginPost = async (req, res) => {
  req.flash("success", "Welcome back to wanderlust! :)");
  let redirectUrl = res.locals.redirectUrl || "/listings";
  res.redirect(redirectUrl);
};
