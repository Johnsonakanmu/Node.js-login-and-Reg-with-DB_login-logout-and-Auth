const User = require("../models/User");
const bycrpt = require("bcryptjs");
const passport = require("passport");
module.exports = {
  loginPage: async (req, res) => {
    res.render("login");
  },

  registerPage: async (req, res) => {
    res.render("register");
  },

  registerOnPage: async (req, res) => {
    const { name, email, password, password2 } = req.body;

    let errors = [];

    //Check required fields
    if (!name || !email || !password || !password2) {
      errors.push({ msg: "Please fill in the fields" });
    }

    // Check passwords match
    if (password !== password2) {
      errors.push({ msg: "Passwords does not match" });
    }

    //Check pass length
    if (password.length < 5) {
      errors.push({ msg: "Password should be atleast 6 characters" });
    }

    if (errors.length > 0) {
      res.render("register", {
        errors,
        name,
        email,
        password,
        password2,
      });
    } else {
      //Validation Passed
      User.findOne({ email: email }).then((user) => {
        if (user) {
          // User Exists
          errors.push({ msg: "Email already registed" });
          res.render("register", {
            errors,
            name,
            email,
            password,
            password2,
          });
        } else {
          const newUser = new User({
            name,
            email,
            password,
          });
          // Hash Password
          bycrpt.genSalt(10, (err, salt) =>
            bycrpt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              //set password to hash
              newUser.password = hash;
              //Save user
              newUser
                .save()
                .then((user) => {
                  req.flash(
                    "success_msg",
                    "You are now registered and can log in"
                  );
                  res.redirect("/user/login");
                })
                .catch((err) => console.log(err));
            })
          );
        }
      });
    }
  },

  loginOnPage: async (req, res, next) => {
    passport.authenticate("local", {
      successRedirect: "/dashboard",
      failureRedirect: "/user/login",
      failureFlash: true,
    })(req, res, next);
  },

  logoutPage: async (req, res) => {
    req.logout(function (err) {
      // do this
      if (err) {
        return next(err);
      } // do this
      req.flash("success_msg", "You are logged out");
      res.redirect("/user/login");
    });
  },
};
