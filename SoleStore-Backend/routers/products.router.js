const express = require("express");
const router = express.Router();
const productsController = require("../controller/products.controller");

router.get("/", productsController.index);

module.exports = router;
