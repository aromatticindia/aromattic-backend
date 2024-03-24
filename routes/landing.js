const express = require("express");
const router = express.Router();

const { getLandingPageData } = require("../controllers/landing");

router.get("/landing", getLandingPageData);

module.exports = router;
