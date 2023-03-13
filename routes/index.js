const express = require("express");
const router = express.Router();
const folderControl = require("../controllers/indexcontroller");
const { ensureAuthenticated } = require("../config/auth");

router.get("", folderControl.homePage);
router.get("/dashboard", ensureAuthenticated, folderControl.dashboardPage);

module.exports = router;
