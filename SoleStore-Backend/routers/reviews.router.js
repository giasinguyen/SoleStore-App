const express = require("express");
const router = express.Router();
const reviewController = require("../controller/reviews.controller");

router.get("/", reviewController.index);

module.exports = router;
