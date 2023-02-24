const express = require("express");
const router = express.Router();

var index = require("../controller/controller");

router.get("/", index);

module.exports = router;

