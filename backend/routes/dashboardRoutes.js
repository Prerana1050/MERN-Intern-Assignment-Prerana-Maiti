
const express = require("express");
const router = express.Router();

const protect = require("../middleware/authmiddleware");
const { getDashboard } = require("../controller/dashboardController");

router.get("/", protect, getDashboard);

module.exports = router;
