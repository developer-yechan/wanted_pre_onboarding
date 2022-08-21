const express = require("express");
const { apply } = require("../services/apply");
const router = express.Router();

router.post("/apply", apply);

module.exports = router;
