const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/login", userController.loginPage);
router.post("/login", userController.loginOnPage);

router.get("/register", userController.registerPage);
router.post("/register", userController.registerOnPage);

router.get("/logout", userController.logoutPage);

module.exports = router;
