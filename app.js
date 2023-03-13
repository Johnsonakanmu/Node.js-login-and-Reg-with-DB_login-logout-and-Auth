const express = require("express");
const app = express();
const indexRoute = require("./routes/index");
const userRoute = require("./routes/user");
const PORT = process.env.PORT || 1000;
const expressLayout = require("express-ejs-layouts");
const mongoose = require("mongoose");

// For flash messages and session
const flash = require("connect-flash");
const session = require("express-session");

//Passport Config
const passport = require("passport");
require("./config/passport")(passport);

//Db Config
const db = require("./config/keys").MongoURI;
// Bodyparser
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

// Ejs
app.use(expressLayout);
app.set("view engine", "ejs");
app.set("layout", "./layouts/main");

//Express Session
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
// Password Middleware
app.use(passport.initialize());
app.use(passport.session());
// Flash Message
app.use(flash());

//Global variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");

  next();
});

// Routes
app.use("", indexRoute);
app.use("/user", userRoute);

// Connect to mongo
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

app.listen(PORT, console.log(`app is listening on port ${PORT}`));
