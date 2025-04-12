const express = require("express");
const router = express.Router();
const blogsController = require("../controller/blogs.controller");

router.get("/", blogsController.index);

module.exports = router;
