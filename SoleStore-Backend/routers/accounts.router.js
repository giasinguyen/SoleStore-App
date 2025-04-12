const express = require("express");
const router = express.Router();
const accoutController = require("../controller/accounts.controller");

router.get("/", accoutController.index);

module.exports = router;
