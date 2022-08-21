const express = require("express");
const router = express.Router();
const employment = require("./employment");
const apply = require("./apply");

router.use(employment);
router.use(apply);

module.exports = router;
