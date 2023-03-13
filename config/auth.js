module.exports = {
  ensureAuthenticated: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash("error_msg", "Please log in to view this resource");
    res.redirect("/user/login");
  },
};

// module.exports = {
//   checkNotAuthentienticated: function (req, res, next) {
//     if (req.isAuthenticated()) {
//       res.redirect("/user/login");
//     }
//     next();
//   },
// };
