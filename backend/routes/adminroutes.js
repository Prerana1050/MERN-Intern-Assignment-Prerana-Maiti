
const express = require("express");
const router = express.Router();

const protect = require("../middleware/authmiddleware");
const adminOnly = require("../middleware/adminmiddleware");

const {
    getAdminOverview
} = require("../controller/admincontroller");

router.get("/overview", protect, adminOnly, getAdminOverview);

module.exports = router;
