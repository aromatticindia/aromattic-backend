const express = require("express");
const router = express.Router();

const { saveOrderInfo } = require("../controllers/order");

router.post("/save-order", saveOrderInfo);

module.exports = router;
